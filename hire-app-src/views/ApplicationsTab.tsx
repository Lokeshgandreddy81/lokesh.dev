
import React, { useState, useEffect, useRef } from 'react';
import { Application, User, UserRole, Profile } from '../types';
import { MOCK_APPLICATIONS, MOCK_PROFILES } from '../services/mockData';
import { IconCamera, IconMic, IconSend, IconPlus, IconImage, IconFile, IconMapPin, IconUsers, IconVideo, IconBriefcase, IconGlobe, IconCheck, IconMessageSquare, IconSparkles, IconAward, IconX, IconPhone, IconSettings } from '../components/Icons';
import { getChatReplySuggestion } from '../services/geminiService';

interface ApplicationsTabProps {
  currentUser: User;
  onChatOpen: (app: Application) => void;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ currentUser, onChatOpen }) => {
  const [peekProfileApp, setPeekProfileApp] = useState<Application | null>(null);

  if (peekProfileApp) {
    return (
      <ContactInfoView 
        application={peekProfileApp} 
        currentUser={currentUser} 
        onBack={() => setPeekProfileApp(null)} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="bg-purple-600 text-white p-4 shadow-sm shrink-0">
        <h1 className="text-xl font-bold">Applications</h1>
        <p className="text-purple-100 text-xs">
          {currentUser.role === UserRole.EMPLOYEE ? 'Active conversations with employers' : 'Recent candidate inquiries'}
        </p>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        {MOCK_APPLICATIONS.map((app) => (
          <div 
            key={app.id} 
            className="flex items-center p-4 bg-white border-b border-slate-100 hover:bg-purple-50/80 cursor-pointer transition-colors relative"
          >
            {/* Logo/Avatar - Clicking this peeks the profile directly */}
            <div 
              className="relative z-10 active:scale-95 transition-transform"
              onClick={() => setPeekProfileApp(app)}
            >
              <img 
                src={currentUser.role === UserRole.EMPLOYEE ? `https://ui-avatars.com/api/?name=${app.companyName}&background=7c3aed&color=fff` : `https://ui-avatars.com/api/?name=${app.candidateName}&background=random`} 
                alt="Avatar" 
                className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-sm hover:ring-2 hover:ring-purple-500 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 border-2 border-white rounded-full"></div>
            </div>
            
            {/* Name and Content Area */}
            <div className="ml-4 flex-1 min-w-0 flex flex-col">
              <div className="flex justify-between items-baseline mb-0.5">
                {/* Name - Clicking this also peeks the profile */}
                <h3 
                  onClick={() => setPeekProfileApp(app)}
                  className="text-sm font-bold truncate text-slate-900 hover:text-purple-600 transition-colors z-10"
                >
                  {currentUser.role === UserRole.EMPLOYEE ? app.companyName : app.candidateName}
                </h3>
                <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">
                    {new Date(app.lastActivity).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>

              {/* Message Preview - Clicking this opens the chat */}
              <div 
                className="flex-1 min-w-0 pt-1"
                onClick={() => onChatOpen(app)}
              >
                <p className="text-xs text-purple-600 font-bold truncate mb-0.5">
                  {app.jobTitle}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{app.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CallOverlay: React.FC<{ name: string; isVideoCall: boolean; onEnd: () => void }> = ({ name, isVideoCall, onEnd }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  // Initialize video state based on call type. If audio call, video starts off.
  const [isVideoOff, setIsVideoOff] = useState(!isVideoCall);
  const [status, setStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [duration, setDuration] = useState(0);
  const [signalStrength, setSignalStrength] = useState(4); // 0-4
  const [latency, setLatency] = useState(45); // ms

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function startCall() {
      try {
        // Request both audio and video to allow toggling, but we'll disable video track immediately if it's an audio call
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        // If it's an audio call, disable the video track immediately
        if (!isVideoCall) {
            s.getVideoTracks().forEach(t => t.enabled = false);
        }

        setStream(s);
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
        // Simulate "answer" after 2 seconds
        setTimeout(() => setStatus('connected'), 2000);
      } catch (err) {
        console.error("Failed to get media", err);
        alert("Please grant camera and microphone permissions to start the call.");
        handleEnd();
      }
    }
    startCall();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: any;
    let qualityInterval: any;

    if (status === 'connected') {
        interval = setInterval(() => setDuration(prev => prev + 1), 1000);
        
        // Simulate network fluctuations
        qualityInterval = setInterval(() => {
            // Randomly drop signal slightly
            if (Math.random() > 0.6) {
                setSignalStrength(prev => {
                    const change = Math.random() > 0.5 ? 1 : -1;
                    return Math.max(1, Math.min(4, prev + change));
                });
            }
            // Randomize latency
            setLatency(prev => {
                 const change = (Math.random() - 0.5) * 60;
                 return Math.max(20, Math.min(450, prev + change));
            });
        }, 2000);
    }
    return () => {
        clearInterval(interval);
        clearInterval(qualityInterval);
    };
  }, [status]);

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(t => (t.enabled = !t.enabled));
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const handleEnd = () => {
      setStatus('ended');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      setTimeout(onEnd, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isPoorConnection = signalStrength < 2 || latency > 200;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center animate-in fade-in duration-300">
      
      {/* Network Quality Indicator */}
      {status === 'connected' && (
        <div className="absolute top-6 left-6 z-30 flex items-center gap-3 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-end gap-0.5 h-3">
                {[1, 2, 3, 4].map(bar => (
                    <div 
                        key={bar} 
                        className={`w-1 rounded-sm transition-all duration-500 ${bar <= signalStrength ? (signalStrength < 3 ? 'bg-amber-400' : 'bg-emerald-400') : 'bg-white/10'}`} 
                        style={{ height: `${bar * 25}%` }} 
                    />
                ))}
            </div>
            <div className="flex items-center gap-1">
                <span className={`text-[10px] font-bold font-mono ${latency > 150 ? (latency > 300 ? 'text-red-400' : 'text-amber-400') : 'text-emerald-400'}`}>
                    {Math.floor(latency)}ms
                </span>
            </div>
        </div>
      )}

      {/* Poor Connection Warning */}
      {status === 'connected' && isPoorConnection && (
         <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-red-500/90 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
             Weak Connection
         </div>
      )}

      {/* Remote View Area */}
      <div className="absolute inset-0 w-full h-full bg-slate-800 flex items-center justify-center overflow-hidden">
        {/* Remote Visuals: Simulated Video if video call, or blurred avatar if audio call */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${status === 'connected' ? 'opacity-100' : 'opacity-30'}`}>
            <img 
                src={`https://ui-avatars.com/api/?name=${name}&background=random&size=512`} 
                className={`w-full h-full object-cover ${isVideoCall ? 'blur-md' : 'blur-3xl'} opacity-50`}
                alt="" 
            />
        </div>
        
        <div className="relative z-10 text-center">
            {status === 'calling' ? (
                 <div className="animate-pulse flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-slate-700 mx-auto mb-6 flex items-center justify-center text-4xl shadow-2xl ring-4 ring-white/10 text-white">
                        {name[0]}
                    </div>
                    <h2 className="text-white text-2xl font-black mb-2">{name}</h2>
                    <p className="text-purple-300 font-bold uppercase tracking-widest text-xs">
                        {isVideoCall ? 'Video Calling...' : 'Calling...'}
                    </p>
                 </div>
            ) : status === 'ended' ? (
                 <div className="flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="w-24 h-24 rounded-full bg-red-600 mx-auto mb-4 flex items-center justify-center text-white shadow-lg">
                        <IconPhone className="w-10 h-10" />
                    </div>
                    <h2 className="text-white text-xl font-bold mb-1">Call Ended</h2>
                    <p className="text-white/60 font-mono text-sm">{formatTime(duration)}</p>
                 </div>
            ) : (
                 <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <div className="w-32 h-32 rounded-full bg-slate-700 mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg border-4 border-white/10 text-white">
                        {name[0]}
                    </div>
                    <h2 className="text-white text-2xl font-bold mb-2">{name}</h2>
                    <p className="text-white/60 font-mono text-lg tracking-wider">{formatTime(duration)}</p>
                 </div>
            )}
        </div>
      </div>

      {/* Local Video Picture-in-Picture (Only visible if video is ON) */}
      {!isVideoOff && (
          <div className="absolute top-6 right-6 w-32 h-48 bg-black rounded-2xl shadow-2xl border-2 border-white/10 overflow-hidden z-20 transition-all animate-in slide-in-from-right">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover mirror" />
          </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-12 flex items-center gap-6 z-30">
        <button 
          onClick={toggleMute}
          className={`p-5 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 ${isMuted ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
        >
          {isMuted ? (
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
          ) : (
             <IconMic className="w-6 h-6" />
          )}
        </button>
        
        <button 
          onClick={handleEnd}
          className="p-6 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/40 hover:bg-red-700 transition-all transform hover:scale-110 active:scale-90"
        >
          <IconPhone className="w-8 h-8 rotate-[135deg]" />
        </button>

        <button 
          onClick={toggleVideo}
          className={`p-5 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 ${isVideoOff ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
        >
          {isVideoOff ? (
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
          ) : (
             <IconVideo className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export const ContactInfoView: React.FC<{ application: Application; currentUser: User; onBack: () => void }> = ({ application, currentUser, onBack }) => {
    const [callType, setCallType] = useState<'video' | 'audio' | null>(null);
    const isEmployeeViewingEmployer = currentUser.role === UserRole.EMPLOYEE;
    const name = isEmployeeViewingEmployer ? application.companyName : application.candidateName;
    const industry = isEmployeeViewingEmployer ? "Logistics & Supply Chain" : "Candidate Profile";
    const tagline = isEmployeeViewingEmployer ? "Moving the world, one delivery at a time." : application.jobTitle;
    const candidateProfile = !isEmployeeViewingEmployer ? MOCK_PROFILES[0] : null;

    if (callType) {
      return <CallOverlay name={name} isVideoCall={callType === 'video'} onEnd={() => setCallType(null)} />;
    }

    const products = [
      { name: 'Express Last-Mile', icon: '🚚', desc: 'Tech-enabled delivery for e-commerce and retail.' },
      { name: 'Cold Chain Pros', icon: '❄️', desc: 'Temperature-sensitive food and vaccine transport.' },
      { name: 'Heavy Hauling', icon: '🏗️', desc: 'Industrial equipment and raw material infrastructure.' },
      { name: 'Warehouse Smart', icon: '🏢', desc: 'AI-driven inventory and storage management.' }
    ];

    const milestones = [
      { year: '2023', event: 'Reached 10M successful deliveries nationwide' },
      { year: '2021', event: 'Expanded cross-border logistics to SEA regions' },
      { year: '2015', event: 'Founded in Hyderabad as a small bike-fleet' }
    ];

    return (
        <div className="h-full bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">
            <header className="bg-purple-600 text-white p-4 shadow-sm flex items-center sticky top-0 z-20 shrink-0">
                <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-purple-700 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h1 className="text-lg font-bold">{isEmployeeViewingEmployer ? 'Enterprise Hub' : 'Candidate Details'}</h1>
            </header>

            <div className="flex-1 overflow-y-auto pb-10">
                <div className="relative h-40 bg-purple-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <img 
                      src={`https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop`} 
                      className="w-full h-full object-cover opacity-40" 
                      alt="Banner" 
                    />
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                            {industry}
                        </span>
                    </div>
                </div>
                
                <div className="flex flex-col items-center -mt-12 px-4 relative z-10">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${name}&background=7c3aed&color=fff&size=128`} 
                        alt="Avatar" 
                        className="w-24 h-24 rounded-3xl mb-3 shadow-2xl border-4 border-white object-cover bg-white"
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                            {name}
                            <IconCheck className="w-5 h-5 text-indigo-500 bg-indigo-50 rounded-full p-0.5" />
                        </h2>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-tight mt-1 px-4">{tagline}</p>
                    </div>

                    <div className="flex gap-4 mt-8 w-full max-sm px-4">
                        <button 
                            onClick={() => setCallType('audio')}
                            className="flex-1 flex flex-col items-center gap-2 p-4 bg-white rounded-3xl shadow-sm border border-slate-100 active:scale-95 transition-all group"
                        >
                             <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <IconPhone className="w-5 h-5"/>
                             </div>
                             <span className="text-[10px] font-black uppercase text-slate-400">Call</span>
                        </button>
                        <button 
                          onClick={() => setCallType('video')}
                          className="flex-1 flex flex-col items-center gap-2 p-4 bg-white rounded-3xl shadow-sm border border-slate-100 active:scale-95 transition-all group"
                        >
                             <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <IconVideo className="w-5 h-5"/>
                             </div>
                             <span className="text-[10px] font-black uppercase text-slate-400">Video</span>
                        </button>
                        <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-white rounded-3xl shadow-sm border border-slate-100 active:scale-95 transition-all group">
                             <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <IconGlobe className="w-5 h-5"/>
                             </div>
                             <span className="text-[10px] font-black uppercase text-slate-400">Site</span>
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-6 mt-6">
                    {isEmployeeViewingEmployer ? (
                      <>
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                              <IconSparkles className="w-4 h-4 text-purple-500" /> MISSION & VISION
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                We are building the backbone of modern commerce in India. By integrating AI with a massive fleet network, we ensure fair pay for partners and lightning-fast logistics for businesses.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-[9px] font-black text-slate-400 block mb-1 uppercase tracking-widest">Industry</span>
                                    <span className="text-xs font-black text-slate-700">{industry}</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-[9px] font-black text-slate-400 block mb-1 uppercase tracking-widest">Global HQ</span>
                                    <span className="text-xs font-black text-slate-700">Hyderabad, IN</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                             <h3 className="font-black text-slate-900 mb-5 flex items-center gap-2">
                               <IconBriefcase className="w-4 h-4 text-purple-500" /> PRODUCTS & SERVICES
                             </h3>
                             <div className="grid grid-cols-1 gap-4">
                                {products.map(p => (
                                  <div key={p.name} className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-purple-50 transition-colors cursor-default">
                                    <div className="text-3xl flex items-center justify-center p-2 bg-white rounded-xl shadow-sm w-12 h-12">{p.icon}</div>
                                    <div className="flex-1">
                                      <h4 className="text-sm font-black text-slate-800">{p.name}</h4>
                                      <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">{p.desc}</p>
                                    </div>
                                  </div>
                                ))}
                             </div>
                        </div>

                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                             <h3 className="font-black text-slate-900 mb-5 flex items-center gap-2">
                               <IconGlobe className="w-4 h-4 text-purple-500" /> TIMELINE
                             </h3>
                             <div className="relative pl-6 space-y-6 border-l-2 border-purple-100">
                                {milestones.map(m => (
                                  <div key={m.year} className="relative">
                                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-50"></div>
                                    <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">{m.year}</span>
                                    <p className="text-sm text-slate-700 font-bold mt-2">{m.event}</p>
                                  </div>
                                ))}
                             </div>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><IconGlobe className="w-24 h-24" /></div>
                           <h3 className="font-black mb-4 relative z-10">CONTACT INFORMATION</h3>
                           <div className="space-y-4 relative z-10">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Partnership</span>
                                <span className="font-black text-purple-400">partners@logitech.in</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Support</span>
                                <span className="font-black text-purple-400">+91 1800 200 1234</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Official Web</span>
                                <span className="font-black text-purple-400">www.logitech.in</span>
                              </div>
                           </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                             <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                  <IconSparkles className="w-4 h-4 text-purple-500" /> Smart Summary
                                </h3>
                                <button className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg hover:bg-purple-100 border border-purple-100 transition-colors">
                                    VIEW RESUME
                                </button>
                             </div>
                             <p className="text-slate-600 text-sm leading-relaxed">{candidateProfile?.summary || "No summary available."}</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                               <IconBriefcase className="w-4 h-4 text-purple-500" /> Experience & Skills
                             </h3>
                             <div className="flex items-center gap-6 mb-6">
                                <div className="text-center px-4 py-2 bg-purple-50 rounded-xl border border-purple-100">
                                  <span className="block text-2xl font-black text-purple-600 leading-none">{candidateProfile?.experienceYears}</span>
                                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-tight">Years Exp</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-wrap gap-2">
                                    {candidateProfile?.skills.map(skill => (
                                      <span key={skill} className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase px-2 py-1 rounded-md border border-slate-100">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                             </div>
                        </div>
                      </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Chat Interface Sub-Component ---

export const ChatInterface: React.FC<{ application: Application; currentUser: User; onBack: () => void }> = ({ application, currentUser, onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 'm1', text: 'Application received. Reviewing your profile.', sender: 'employer', type: 'system', timestamp: new Date(Date.now() - 10000000).toISOString() },
    { id: 'm2', text: application.lastMessage, sender: application.employerId === currentUser.id ? 'candidate' : 'employer', type: 'text', timestamp: application.lastActivity }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showAttachments, setShowAttachments] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio' | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const name = currentUser.role === UserRole.EMPLOYEE ? application.companyName : application.candidateName;

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
     const fetchSuggestion = async () => {
         const myRole = currentUser.role === UserRole.EMPLOYER ? 'employer' : 'candidate';
         
         const history = messages.map(m => {
            let role = 'System';
            if (m.type !== 'system') {
               if (m.sender === 'me') {
                   role = myRole === 'employer' ? 'Employer' : 'Candidate';
               } else if (m.sender === 'employer') {
                   role = 'Employer';
               } else {
                   role = 'Candidate';
               }
            }
            return { role, text: m.text };
         });

         const suggs = await getChatReplySuggestion(history, myRole, {
             jobTitle: application.jobTitle,
             companyName: application.companyName,
             candidateName: application.candidateName
         });
         setSuggestions(suggs);
     }
     
     const lastMsg = messages[messages.length - 1];
     if (lastMsg && lastMsg.sender !== 'me' && lastMsg.type !== 'system') {
        fetchSuggestion();
     } else {
        setSuggestions([]);
     }
  }, [messages, currentUser.role, application.jobTitle, application.companyName, application.candidateName]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
        id: Date.now().toString(),
        text: input,
        sender: 'me',
        type: 'text' as const,
        timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  if (callType) {
    return <CallOverlay name={name} isVideoCall={callType === 'video'} onEnd={() => setCallType(null)} />;
  }

  if (viewingProfile) {
      return <ContactInfoView application={application} currentUser={currentUser} onBack={() => setViewingProfile(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#f3e8ff] relative"> 
        {/* WhatsApp-Style Navbar */}
        <div className="bg-purple-600 px-2 py-2.5 flex items-center text-white shadow-md z-10 shrink-0">
            <div className="flex items-center gap-1 rounded-full p-1 -ml-1 hover:bg-white/10 transition-colors cursor-pointer" onClick={onBack}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h20" /></svg>
                <img 
                    src={`https://ui-avatars.com/api/?name=${name}&background=7c3aed&color=fff`} 
                    className="w-9 h-9 rounded-full border border-white/20" 
                    alt=""
                />
            </div>
            
            <div className="flex-1 ml-2.5 cursor-pointer" onClick={() => setViewingProfile(true)}>
                <h2 className="font-bold text-base leading-tight truncate">{name}</h2>
                <p className="text-xs text-purple-100 truncate opacity-90">
                   {application.status === 'Applied' ? 'last seen today at 10:45 AM' : 'Online'}
                </p>
            </div>
            
            <div className="flex items-center gap-5 pr-2">
                <button onClick={() => setCallType('video')}><IconVideo className="w-6 h-6" /></button>
                <button onClick={() => setCallType('audio')}><IconPhone className="w-5 h-5" /></button>
                <button><IconSettings className="w-5 h-5" /></button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
            {messages.map((msg, idx) => {
                const isMe = msg.sender === 'me';
                const isSystem = msg.type === 'system';
                
                if (isSystem) {
                    return (
                        <div key={idx} className="flex justify-center my-4">
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-amber-200">
                                {msg.text}
                            </span>
                        </div>
                    );
                }

                return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-xl px-3 py-2 shadow-sm text-sm ${
                            isMe ? 'bg-purple-100 text-slate-900 rounded-tr-none border border-purple-200' : 'bg-white text-slate-900 rounded-tl-none'
                        }`}>
                            <p>{msg.text}</p>
                            <span className="text-[10px] text-slate-400 block text-right mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Input Area + Suggestions Container */}
        <div className="bg-transparent pb-1 shrink-0"> 
            {suggestions.length > 0 && (
                <div className="px-3 py-2 flex overflow-x-auto gap-2 no-scrollbar mask-gradient-right">
                    {suggestions.map((suggestion, index) => (
                        <button 
                            key={index}
                            onClick={() => setInput(suggestion)}
                            className="flex-shrink-0 bg-white border border-purple-200 text-purple-700 text-[12px] font-medium px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap active:scale-95 transition-transform"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
            
            {/* Input Bar - WhatsApp Style */}
            <div className="flex items-end gap-2 px-2 pb-2">
                <div className="flex-1 bg-white rounded-[1.5rem] flex items-center min-h-[48px] px-2 shadow-sm border border-slate-100/50">
                     <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                         <IconSparkles className="w-6 h-6"/>
                     </button>
                     <input 
                        className="flex-1 py-3 px-2 text-base outline-none bg-transparent placeholder-slate-400" 
                        placeholder="Message" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                     />
                     <button 
                         onClick={() => setShowAttachments(!showAttachments)}
                         className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                     >
                         <IconPlus className={`w-6 h-6 transition-transform ${showAttachments ? 'rotate-45' : ''}`} />
                     </button>
                     {!input && (
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <IconCamera className="w-5 h-5"/>
                        </button>
                     )}
                </div>
                <button 
                    onClick={input ? handleSend : undefined}
                    className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0 hover:bg-purple-700 transition-colors active:scale-95"
                >
                     {input ? <IconSend className="w-5 h-5" /> : <IconMic className="w-5 h-5" />}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ApplicationsTab;
