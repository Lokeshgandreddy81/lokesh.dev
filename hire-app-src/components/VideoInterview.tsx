
import React, { useState, useRef, useEffect } from 'react';
import { IconCamera, IconMic, IconCheck, IconX, IconSparkles } from './Icons';
import { processInterview, processJobPosting } from '../services/geminiService';
import { UserRole } from '../types';

interface VideoInterviewProps {
  role: UserRole;
  onClose: () => void;
  onComplete: (data: any) => void;
}

const EMPLOYEE_QUESTIONS = [
  "Please state your full name and where you are currently based.",
  "Tell us about your work history. What roles have you held in the past 5 years?",
  "What are your core technical or professional skills?",
  "What are your educational or vocational qualifications?"
];

const EMPLOYER_QUESTIONS = [
  "What is the job title you are hiring for?",
  "Describe the daily responsibilities and key tasks for this role.",
  "What specific skills, licenses, or certifications are required?",
  "What is the salary range and work location?"
];

const VideoInterview: React.FC<VideoInterviewProps> = ({ role, onClose, onComplete }) => {
  const [step, setStep] = useState<'PREVIEW' | 'RECORDING' | 'PROCESSING' | 'REVIEW'>('PREVIEW');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ question: string, answer: string }[]>([]);
  const [processedData, setProcessedData] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const questions = role === UserRole.EMPLOYEE ? EMPLOYEE_QUESTIONS : EMPLOYER_QUESTIONS;

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Camera access is required for Smart Interview.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleStartRecording = () => {
    setStep('RECORDING');
  };

  const handleNextQuestion = () => {
    // In a real app, we would use the Speech-to-Text API or Live API here to get the actual answer.
    // For this demo, we simulate the answer based on the role to demonstrate the AI processing.
    
    let currentAnswer = "";
    
    if (role === UserRole.EMPLOYEE) {
         const mockAnswers = [
            "I am Rajesh Kumar from Hyderabad.",
            "I have been a heavy truck driver for 8 years, mostly long-haul logistics.",
            "Defensive driving, engine maintenance, and route planning are my top skills.",
            "I have an ITI certification in Mechanical works and a valid Heavy Motor Vehicle license."
          ];
          currentAnswer = mockAnswers[currentQuestionIndex];
    } else {
         const mockAnswers = [
            "We are looking for a Senior Warehouse Manager.",
            "They will oversee daily operations, manage a team of 15 staff, and handle inventory tracking using our software.",
            "They need experience with SAP, team leadership, and forklift certification.",
            "The pay is 45,000 rupees per month, based in Hyderabad."
         ];
         currentAnswer = mockAnswers[currentQuestionIndex];
    }

    const newAnswers = [...answers, { question: questions[currentQuestionIndex], answer: currentAnswer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finalizeInterview(newAnswers);
    }
  };

  const finalizeInterview = async (allAnswers: any[]) => {
    setStep('PROCESSING');
    stopCamera();
    
    let result = null;
    if (role === UserRole.EMPLOYEE) {
        result = await processInterview(allAnswers);
    } else {
        result = await processJobPosting(allAnswers);
    }

    if (result) {
      setProcessedData(result);
      setStep('REVIEW');
    } else {
      alert("Something went wrong with Smart analysis.");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      <div className="p-4 flex justify-between items-center text-white bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-10">
        <h2 className="font-bold flex items-center gap-2">
           <IconSparkles className="w-5 h-5 text-purple-400" />
           {role === UserRole.EMPLOYEE ? 'Smart Interview' : 'Smart Job Post'}
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <IconX className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {(step === 'PREVIEW' || step === 'RECORDING') && (
          <div className="relative h-full w-full">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="h-full w-full object-cover"
            />
            
            <div className="absolute top-20 left-4 right-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-in slide-in-from-top-4">
              <span className="text-purple-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <p className="text-white text-lg font-medium leading-tight">
                {questions[currentQuestionIndex]}
              </p>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8">
              {step === 'PREVIEW' ? (
                <button 
                  onClick={handleStartRecording}
                  className="bg-red-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl hover:bg-red-700 transition-all active:scale-95"
                >
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  Start {role === UserRole.EMPLOYEE ? 'Interview' : 'Recording'}
                </button>
              ) : (
                <button 
                  onClick={handleNextQuestion}
                  className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl hover:bg-purple-700 transition-all active:scale-95"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                  <IconCheck className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'PROCESSING' && (
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 flex items-center justify-center">
                <IconSparkles className="w-12 h-12 text-purple-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Smart Processing</h3>
            <p className="text-slate-400 text-center max-w-xs">
              {role === UserRole.EMPLOYEE 
                ? "Analyzing your interview to extract skills, experience, and qualifications..."
                : "Analyzing requirements to generate a structured job posting..."}
            </p>
          </div>
        )}

        {step === 'REVIEW' && processedData && (
          <div className="flex-1 bg-white overflow-y-auto">
             <div className="p-6">
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500 text-white rounded-lg">
                      <IconCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-purple-900 font-bold text-lg">Analysis Complete!</h3>
                      <p className="text-purple-700 text-sm">
                          {role === UserRole.EMPLOYEE ? "We've generated your professional profile." : "We've created your job posting."}
                      </p>
                    </div>
                  </div>
                </div>

                {role === UserRole.EMPLOYER && (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{processedData.title}</h4>
                        <div className="flex gap-2 mb-3">
                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{processedData.location}</span>
                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{processedData.salary}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{processedData.description}</p>
                        <div className="flex flex-wrap gap-2">
                             {processedData.skills?.map((s: string) => (
                                 <span key={s} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded border border-purple-100">{s}</span>
                             ))}
                        </div>
                    </div>
                )}

                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => { setStep('PREVIEW'); startCamera(); }}
                    className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Retake
                  </button>
                  <button 
                    onClick={() => onComplete(processedData)}
                    className="flex-[2] py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
                  >
                    {role === UserRole.EMPLOYEE ? 'Save to Profile' : 'Post Job Now'}
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInterview;
