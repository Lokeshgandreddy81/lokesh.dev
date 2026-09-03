
import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_PROFILES } from '../services/mockData';
import { 
  IconGlobe, IconUsers, IconMessageSquare, IconPlus, IconCheck, 
  IconSparkles, IconSearch, IconBell, IconAward, IconBookOpen, 
  IconMapPin, IconVideo, IconBriefcase, IconX, IconMic, IconCamera, IconImage, IconSend, IconPhone, IconSettings 
} from '../components/Icons';

interface ConnectTabProps {
  currentUser: User;
}

type SubTab = 'Feed' | 'Pulse' | 'Academy' | 'Circles' | 'Bounties';
type CircleTab = 'DISCUSSION' | 'RATES' | 'MEMBERS';

const ConnectTab: React.FC<ConnectTabProps> = ({ currentUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('Feed');
  const [vouchedIds, setVouchedIds] = useState<Set<number>>(new Set());
  const [joinedCircles, setJoinedCircles] = useState<Set<string>>(new Set(['c1']));
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);
  const [viewingProfile, setViewingProfile] = useState(false);

  const posts = [
    {
      id: 1,
      author: 'Amir Khan',
      role: 'Construction Lead',
      type: 'voice',
      duration: '0:15',
      content: 'Any electricians available for a quick site inspection in Banjara Hills? Emergency fix needed.',
      likes: 12,
      comments: 3,
      time: 'Just now',
      avatar: 'https://i.pravatar.cc/150?u=amir',
      karma: 450
    },
    {
      id: 2,
      author: 'Sunil Driver',
      role: 'Heavy Vehicle Expert',
      type: 'gallery',
      images: ['https://picsum.photos/id/1070/400/300', 'https://picsum.photos/id/1071/400/300'],
      content: 'Completed the 800km run. Truck maintained perfectly. Maintenance is key!',
      likes: 156,
      comments: 24,
      time: '3h ago',
      avatar: 'https://i.pravatar.cc/150?u=sunil',
      karma: 1200
    },
    {
      id: 3,
      author: 'LogiTech Corp',
      role: 'Verified Employer',
      type: 'bounty',
      reward: '₹2,000',
      content: 'Refer a Senior Warehouse Manager. Bonus paid upon successful 30-day onboarding.',
      likes: 89,
      comments: 45,
      time: '5h ago',
      avatar: 'https://ui-avatars.com/api/?name=LogiTech&background=7c3aed&color=fff',
      karma: 0
    }
  ];

  const circles = [
      {
          id: 'c1',
          name: 'Heavy Haulers India',
          category: 'Logistics',
          members: '12.5k',
          online: 142,
          desc: 'Discuss routes, tolls, and vehicle maintenance tips for long-haul drivers.',
          topics: ['Route Advice', 'Toll Updates', 'Mechanic Referrals'],
          rates: [
            { service: '10-Ton Truck (Per KM)', price: '₹35 - ₹40' },
            { service: 'Waiting Charge (Per Hour)', price: '₹200' },
            { service: 'Helper Daily Wage', price: '₹800' }
          ]
      },
      {
          id: 'c2',
          name: 'Hyderabad Electricians',
          category: 'Trades',
          members: '3.2k',
          online: 45,
          desc: 'Union news, rate cards, and helper availability for local electricians.',
          topics: ['Daily Rates', 'Helper Needed', 'License Renewals'],
          rates: [
             { service: 'Fan Installation', price: '₹250' },
             { service: 'Full House Wiring (2BHK)', price: '₹15,000' },
             { service: 'Site Visit / Inspection', price: '₹300' }
          ]
      },
      {
          id: 'c3',
          name: 'Last-Mile Delivery',
          category: 'Logistics',
          members: '45k',
          online: 1200,
          desc: 'Community for Swiggy, Zomato, and Amazon delivery partners.',
          topics: ['Incentive Hacks', 'Bike Repair', 'Traffic Alerts'],
          rates: []
      },
      {
          id: 'c4',
          name: 'Warehouse Warriors',
          category: 'Operations',
          members: '800',
          online: 12,
          desc: 'Inventory management professionals and forklift operators.',
          topics: ['Safety Protocols', 'Shift Swaps', 'Certifications'],
          rates: []
      }
  ];

  const toggleVouch = (id: number) => {
    const next = new Set(vouchedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVouchedIds(next);
  };

  const toggleJoinCircle = (id: string) => {
      const next = new Set(joinedCircles);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setJoinedCircles(next);
  };

  if (viewingProfile) {
      return <MyProfileView currentUser={currentUser} onBack={() => setViewingProfile(false)} />;
  }

  if (selectedCircle) {
      const circleData = circles.find(c => c.id === selectedCircle);
      if (circleData) {
          return <CircleDetailView circle={circleData} onBack={() => setSelectedCircle(null)} />;
      }
  }

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold italic">H</div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">HIRE<span className="text-purple-600">CIRCLE</span></h1>
            </div>
            <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors relative">
                    <IconBell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div 
                  onClick={() => setViewingProfile(true)}
                  className="w-9 h-9 rounded-full border-2 border-purple-500 p-0.5 cursor-pointer hover:scale-105 transition-transform"
                >
                    <img src={currentUser.avatar} className="w-full h-full rounded-full" alt="Profile" />
                </div>
            </div>
        </div>
        
        <div className="flex px-4 gap-6 overflow-x-auto no-scrollbar border-t border-slate-50">
           {(['Feed', 'Pulse', 'Academy', 'Circles', 'Bounties'] as SubTab[]).map(tab => (
             <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex-shrink-0 py-3 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeSubTab === tab ? 'text-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tab}
               {activeSubTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full animate-in fade-in" />}
             </button>
           ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {activeSubTab === 'Feed' && (
          <div className="p-3 space-y-4">
             <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60">
                <div className="flex gap-3 mb-4">
                    <img src={currentUser.avatar} className="w-10 h-10 rounded-2xl" alt="" />
                    <button className="flex-1 text-left px-4 py-2.5 bg-slate-50 text-slate-400 text-sm rounded-2xl border border-slate-100 hover:bg-slate-100/50">
                        Share your work today...
                    </button>
                </div>
                <div className="flex justify-between items-center px-2">
                    <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-purple-600">
                        <IconMic className="w-4 h-4" /> VOICE
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-blue-600">
                        <IconImage className="w-4 h-4" /> PHOTOS
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-amber-600">
                        <IconVideo className="w-4 h-4" /> VIDEO
                    </button>
                    <div className="h-4 w-[1px] bg-slate-200"></div>
                    <button className="text-[10px] font-black text-purple-600 px-3 py-1 bg-purple-50 rounded-lg">POST</button>
                </div>
             </div>

             {posts.map(post => (
               <div key={post.id} className="bg-white rounded-3xl shadow-sm border border-slate-200/50 overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={post.avatar} className="w-11 h-11 rounded-2xl shadow-sm" alt="" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                                {post.author}
                                {post.karma > 1000 && <IconCheck className="w-3.5 h-3.5 text-indigo-500" />}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{post.role} • {post.time}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">+{post.karma} KARMA</div>
                        </div>
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed mb-4 font-medium">{post.content}</p>

                    {post.type === 'voice' && (
                        <div className="mb-4 p-3 bg-purple-50/50 rounded-2xl flex items-center gap-3 border border-purple-100/50">
                            <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                            </button>
                            <div className="flex-1 h-1.5 bg-purple-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-purple-600 w-1/3"></div>
                            </div>
                            <span className="text-[10px] font-black text-purple-700">{post.duration}</span>
                        </div>
                    )}

                    {post.type === 'bounty' && (
                        <div className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20"><IconAward className="w-16 h-16" /></div>
                            <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase tracking-widest text-purple-100 mb-1">Referral Bounty</div>
                                <div className="text-2xl font-black mb-2">{post.reward}</div>
                                <button className="w-full bg-white text-purple-700 font-black py-2 rounded-xl text-xs hover:bg-purple-50 transition-colors shadow-sm">REFER A PEER</button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-5 pt-3 border-t border-slate-50">
                        <button className="flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-purple-600 transition-all">
                            👍 {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-purple-600 transition-all">
                            💬 {post.comments}
                        </button>
                        <button 
                            onClick={() => toggleVouch(post.id)}
                            className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl transition-all ${vouchedIds.has(post.id) ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-purple-600'}`}
                        >
                            <IconCheck className="w-4 h-4" /> VOUCH
                        </button>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {activeSubTab === 'Circles' && (
            <div className="p-4 space-y-6">
                <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <h2 className="text-xl font-black mb-2 relative z-10">Find Your Tribe</h2>
                    <p className="text-purple-100 text-xs font-medium leading-relaxed max-w-[80%] relative z-10">
                        Connect with professionals in your category. Share rates, routes, and advice with people who understand your work.
                    </p>
                </div>

                {/* My Circles */}
                {joinedCircles.size > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                           <IconCheck className="w-4 h-4 text-purple-600" /> My Communities
                        </h3>
                        {circles.filter(c => joinedCircles.has(c.id)).map(circle => (
                            <div key={circle.id} className="bg-white p-4 rounded-2xl shadow-sm border border-purple-200/60 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={`https://ui-avatars.com/api/?name=${circle.name}&background=7c3aed&color=fff&rounded=true`} className="w-12 h-12 rounded-full shadow-sm" alt=""/>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{circle.name}</h4>
                                        <p className="text-[10px] text-purple-600 font-bold uppercase">{circle.members} Members</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedCircle(circle.id)}
                                    className="px-4 py-2 bg-purple-50 text-purple-700 text-xs font-black rounded-xl hover:bg-purple-100 transition-colors"
                                >
                                    OPEN
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Explore */}
                <div className="space-y-4">
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <IconSearch className="w-4 h-4 text-slate-400" /> Explore Categories
                     </h3>
                     {circles.filter(c => !joinedCircles.has(c.id)).map(circle => (
                         <div key={circle.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                 <IconUsers className="w-24 h-24 text-slate-900" />
                             </div>
                             
                             <div className="flex items-start gap-4 mb-3 relative z-10">
                                 <img src={`https://ui-avatars.com/api/?name=${circle.name}&background=random&rounded=true`} className="w-14 h-14 rounded-2xl shadow-sm" alt=""/>
                                 <div className="flex-1">
                                     <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-900">{circle.name}</h4>
                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">{circle.category}</span>
                                        </div>
                                        <button 
                                            onClick={() => toggleJoinCircle(circle.id)}
                                            className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg shadow-lg hover:bg-purple-600 transition-colors"
                                        >
                                            JOIN
                                        </button>
                                     </div>
                                     <p className="text-xs text-slate-500 mt-2 leading-relaxed">{circle.desc}</p>
                                 </div>
                             </div>

                             <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 relative z-10">
                                 <div className="flex -space-x-2">
                                     {[1,2,3].map(i => (
                                         <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400">+{circle.online} Online Now</span>
                                 <div className="flex-1 text-right">
                                    <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-full">
                                        🔥 {circle.topics[0]}
                                    </span>
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
            </div>
        )}

        {activeSubTab === 'Pulse' && (
          <div className="p-4 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#7c3aed_0%,_transparent_70%)] animate-pulse"></div>
                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full mx-auto flex items-center justify-center mb-6 ring-4 ring-purple-500/10">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
                    </div>
                    <h3 className="text-2xl font-black mb-2">Live Radar</h3>
                    <p className="text-slate-400 text-xs mb-6 px-4">Showing 8 professionals and 3 urgent gigs within 2km of your location.</p>
                    <button className="px-8 py-3 bg-purple-600 text-white font-black rounded-2xl shadow-lg shadow-purple-900/40 text-sm">SEARCH LOCAL GIGS</button>
                </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Academy' && (
          <div className="p-4 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm">
                <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                    <IconSparkles className="w-4 h-4 text-purple-600" /> AI MENTOR MATCH
                </h4>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100/50">
                    <img src="https://i.pravatar.cc/150?u=mentor" className="w-12 h-12 rounded-xl shadow-sm" alt="" />
                    <div className="flex-1">
                        <p className="text-[10px] text-purple-800 font-black uppercase">Suggested Mentor</p>
                        <h5 className="text-sm font-black text-slate-900 leading-tight">Suresh V. (20y Exp)</h5>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white text-[10px] font-black rounded-xl shadow-md">CONNECT</button>
                </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Bounties' && (
          <div className="p-4 space-y-4">
             {[
                 { company: 'Zomato', role: 'Operations Lead', bonus: '₹5,000', expiry: '2 days' }
             ].map((b, i) => (
                 <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200/50 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-800">{b.company[0]}</div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900">{b.role}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{b.company} • Expiring in {b.expiry}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-black text-purple-600 mb-1">{b.bonus}</div>
                        <button className="text-[10px] font-black text-purple-700 underline">REFER</button>
                    </div>
                 </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Circle Detail Component ---

const CircleDetailView: React.FC<{ circle: any; onBack: () => void }> = ({ circle, onBack }) => {
    const [activeTab, setActiveTab] = useState<CircleTab>('DISCUSSION');
    const [messages, setMessages] = useState([
        { id: 1, user: 'Ramesh T.', role: 'Driver', text: 'Does anyone know if the NH65 diversions are cleared?', time: '10:05 AM', type: 'text' },
        { id: 2, user: 'Vijay Kumar', role: 'Admin', text: 'Yes, I passed through an hour ago. Traffic is moving smoothly.', time: '10:08 AM', type: 'text', verified: true },
        { id: 3, user: 'Siva', role: 'Mechanic', text: 'Available for breakdown service near Vijayawada bypass.', time: '11:30 AM', type: 'text' }
    ]);
    const [inputText, setInputText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            user: 'You',
            role: 'Member',
            text: inputText,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            type: 'text'
        }]);
        setInputText('');
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 shadow-md shrink-0 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1 rounded-full hover:bg-purple-700 transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <img src={`https://ui-avatars.com/api/?name=${circle.name}&background=7c3aed&color=fff&rounded=true`} className="w-10 h-10 rounded-full border-2 border-purple-400" alt=""/>
                    <div className="flex-1">
                        <h2 className="font-bold text-sm leading-tight">{circle.name}</h2>
                        <p className="text-[10px] text-purple-200">{circle.members} Members • {circle.online} Online</p>
                    </div>
                </div>

                {/* Sub-Navigation */}
                <div className="flex mt-4 bg-purple-700/50 p-1 rounded-xl">
                    {(['DISCUSSION', 'RATES', 'MEMBERS'] as CircleTab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-purple-700 shadow-sm' : 'text-purple-200 hover:text-white'}`}
                        >
                            {tab === 'DISCUSSION' ? 'CHAT ROOM' : tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto relative">
                
                {activeTab === 'DISCUSSION' && (
                    <div className="flex flex-col min-h-full">
                        <div className="flex-1 p-4 space-y-4" ref={scrollRef}>
                             <div className="flex justify-center my-4">
                                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Today</span>
                             </div>
                             {messages.map(msg => (
                                 <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                                     {msg.user !== 'You' && (
                                         <div className="flex items-center gap-1 mb-1 ml-1">
                                             <span className="text-[10px] font-bold text-slate-600">{msg.user}</span>
                                             {msg.verified && <IconCheck className="w-3 h-3 text-blue-500" />}
                                             <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 rounded">{msg.role}</span>
                                         </div>
                                     )}
                                     <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                                         msg.user === 'You' 
                                            ? 'bg-purple-600 text-white rounded-tr-none' 
                                            : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                                     }`}>
                                         {msg.text}
                                     </div>
                                     <span className="text-[9px] text-slate-400 mt-1 mx-1">{msg.time}</span>
                                 </div>
                             ))}
                        </div>
                        
                        {/* Input Area */}
                        <div className="bg-white p-2 border-t border-slate-200 flex items-center gap-2 sticky bottom-0">
                            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                                <IconPlus className="w-6 h-6" />
                            </button>
                            <div className="flex-1 relative">
                                <input 
                                    type="text" 
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ask for help or share updates..."
                                    className="w-full bg-slate-100 border-none rounded-full pl-4 pr-4 py-3 text-sm focus:ring-2 focus:ring-purple-500"
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                />
                            </div>
                            {inputText ? (
                                <button onClick={sendMessage} className="p-3 bg-purple-600 text-white rounded-full shadow-lg">
                                    <IconSend className="w-5 h-5" />
                                </button>
                            ) : (
                                <button className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
                                    <IconMic className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'RATES' && (
                    <div className="p-4 space-y-4">
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-4">
                            <h3 className="text-amber-800 font-bold text-sm flex items-center gap-2 mb-1">
                                <IconSparkles className="w-4 h-4" /> Community Rates
                            </h3>
                            <p className="text-amber-700 text-xs">These are standard market rates sourced from community members. Use these to negotiate fair pay.</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                                    <tr>
                                        <th className="px-4 py-3">Service / Item</th>
                                        <th className="px-4 py-3 text-right">Avg. Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {circle.rates && circle.rates.length > 0 ? (
                                        circle.rates.map((rate: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-purple-50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-slate-900">{rate.service}</td>
                                                <td className="px-4 py-3 text-right font-black text-purple-600">{rate.price}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className="px-4 py-8 text-center text-slate-400 text-xs italic">
                                                No rate data available for this category yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <button className="w-full py-3 bg-white border border-dashed border-purple-300 text-purple-600 text-xs font-bold rounded-xl hover:bg-purple-50">
                            + Suggest a Rate Change
                        </button>
                    </div>
                )}

                {activeTab === 'MEMBERS' && (
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-900 text-sm">Community Leaders</h3>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded">Sorted by Karma</span>
                        </div>
                        <div className="space-y-3">
                            {[1,2,3,4,5].map((i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                                    <div className="relative">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full" alt=""/>
                                        {i < 3 && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center text-[8px]">★</div>}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 text-sm">Member Name {i}</h4>
                                        <p className="text-[10px] text-slate-500">{i === 1 ? 'Admin • ' : ''} Joined 2023</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full">
                                        <IconMessageSquare className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- My Profile View Component ---

const MyProfileView: React.FC<{ currentUser: User; onBack: () => void }> = ({ currentUser, onBack }) => {
    // If employee, find their detailed profile. If employer, use generic mock data or currentUser fields.
    const isEmployee = currentUser.role === UserRole.EMPLOYEE;
    const employeeProfile = isEmployee ? MOCK_PROFILES.find(p => p.userId === currentUser.id && p.isDefault) || MOCK_PROFILES[0] : null;

    return (
        <div className="h-full bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">
            <header className="bg-purple-600 text-white p-4 shadow-sm flex items-center sticky top-0 z-20 shrink-0 justify-between">
                <div className="flex items-center">
                    <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-purple-700 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-lg font-bold">My Profile</h1>
                </div>
                <button className="text-[10px] font-bold bg-purple-500/50 p-2 rounded-lg hover:bg-purple-500">
                    <IconSettings className="w-5 h-5" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto pb-10">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_#7c3aed_0%,_transparent_50%)]"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-30" 
                      alt="Cover" 
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                            {isEmployee ? 'Ready to Work' : 'Hiring Actively'}
                        </span>
                        {isEmployee && (
                             <span className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                <IconAward className="w-3 h-3" /> Gold Tier
                             </span>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-col px-6 relative z-10 -mt-10">
                    <div className="flex justify-between items-end">
                         <img 
                            src={currentUser.avatar} 
                            alt="Avatar" 
                            className="w-24 h-24 rounded-3xl shadow-2xl border-4 border-white object-cover bg-white"
                        />
                        <div className="mb-2 text-right">
                             <div className="text-2xl font-black text-slate-900">{isEmployee ? '4.8' : '5.0'}</div>
                             <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rating</div>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                            {currentUser.name}
                            <IconCheck className="w-5 h-5 text-blue-500 bg-blue-50 rounded-full p-0.5" />
                        </h2>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-tight mt-1">
                            {isEmployee ? currentUser.title : currentUser.companyName} • {currentUser.location || 'India'}
                        </p>
                    </div>

                    {isEmployee && (
                        <div className="flex gap-2 mt-4 mb-2">
                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
                                {employeeProfile?.experienceYears} Years Exp
                            </span>
                             <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                                {employeeProfile?.qualifications?.[0] || 'Certified'}
                             </span>
                        </div>
                    )}
                </div>

                <div className="p-4 space-y-6 mt-2">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                             <div className="text-xl font-black text-slate-800">1.2k</div>
                             <div className="text-[9px] text-slate-400 font-bold uppercase">Karma</div>
                        </div>
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                             <div className="text-xl font-black text-slate-800">{isEmployee ? '24' : '12'}</div>
                             <div className="text-[9px] text-slate-400 font-bold uppercase">{isEmployee ? 'Jobs Done' : 'Jobs Posted'}</div>
                        </div>
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                             <div className="text-xl font-black text-slate-800">98%</div>
                             <div className="text-[9px] text-slate-400 font-bold uppercase">Response</div>
                        </div>
                    </div>

                    {isEmployee ? (
                        <>
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
                                <IconSparkles className="absolute top-4 right-4 text-purple-100 w-12 h-12" />
                                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">About Me</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium relative z-10">
                                    {employeeProfile?.summary || "I am a dedicated professional looking for new opportunities."}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">Skills & Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {employeeProfile?.skills.map(s => (
                                        <span key={s} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                         <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">Company Mission</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    We strive to connect the best local talent with global opportunities, ensuring safety, fair wages, and growth for every partner in our network.
                                </p>
                        </div>
                    )}
                    
                    <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all active:scale-95">
                        Edit Profile Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectTab;
