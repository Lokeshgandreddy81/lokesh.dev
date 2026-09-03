
import React, { useState } from 'react';
import Layout from './components/Layout';
import { UserRole, Application } from './types';
import { CURRENT_USER_EMPLOYEE, CURRENT_USER_EMPLOYER } from './services/mockData';
import { IconBriefcase, IconUsers, IconSparkles } from './components/Icons';

// Views
import ApplicationsTab, { ChatInterface } from './views/ApplicationsTab';
import JobsTab from './views/JobsTab';
import ProfilesTab from './views/ProfilesTab';
import ConnectTab from './views/ConnectTab';
import SettingsTab from './views/SettingsTab';
import VideoInterview from './components/VideoInterview';

type AuthStage = 'ROLE_SELECTION' | 'LOGIN' | 'SIGNUP' | 'APP';
type LoginMethod = 'PHONE' | 'EMAIL';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applications'); // Default to center tab
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.EMPLOYEE);
  const [authStage, setAuthStage] = useState<AuthStage>('ROLE_SELECTION');
  const [showInterview, setShowInterview] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('PHONE');
  
  // Auth state
  const [fullName, setFullName] = useState('Lokesh Gandreddy');
  const [identifier, setIdentifier] = useState('98765 43210'); // Email or Phone
  const [password, setPassword] = useState('12345');

  // UI state - Replaces "isChatOpen" with the specific selected chat app for "stack" navigation
  const [selectedChatApp, setSelectedChatApp] = useState<Application | null>(null);

  const currentUser = currentRole === UserRole.EMPLOYEE ? CURRENT_USER_EMPLOYEE : CURRENT_USER_EMPLOYER;

  const handleRoleSelect = (role: UserRole) => {
      setCurrentRole(role);
      setAuthStage('LOGIN');
  };

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setAuthStage('APP');
  };

  const handleLogout = () => {
      setAuthStage('ROLE_SELECTION');
      setIdentifier('');
      setPassword('');
      setActiveTab('applications');
      setSelectedChatApp(null);
  };

  const handleSmartComplete = (data: any) => {
      setShowInterview(false);
      if (currentRole === UserRole.EMPLOYEE) {
          setActiveTab('profiles');
          alert(`Smart Profile Created: ${data.roleTitle}. It's now being matched with employers!`);
      } else {
          setActiveTab('jobs');
          alert(`Smart Job Posting Created: ${data.title}. Candidates are being notified!`);
      }
      setSelectedChatApp(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'connect':
        return <ConnectTab currentUser={currentUser} />;
      case 'profiles':
        return <ProfilesTab currentUser={currentUser} onTriggerInterview={() => setShowInterview(true)} />;
      case 'applications':
        return <ApplicationsTab currentUser={currentUser} onChatOpen={setSelectedChatApp} />;
      case 'jobs':
        return <JobsTab currentUser={currentUser} />;
      case 'settings':
        return <SettingsTab currentUser={currentUser} onLogout={handleLogout} />;
      default:
        return <ApplicationsTab currentUser={currentUser} onChatOpen={setSelectedChatApp} />;
    }
  };

  const renderAuthScreens = () => {
      if (authStage === 'ROLE_SELECTION') {
          return (
            <div className="flex flex-col h-full bg-white p-6 justify-center">
                <div className="mb-10 text-center">
                    <div className="inline-flex p-3 bg-purple-100 rounded-2xl mb-4">
                        <IconSparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Hire App</h1>
                    <p className="text-slate-500 font-medium">Smart AI matching for everyone.</p>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => handleRoleSelect(UserRole.EMPLOYEE)}
                        className="w-full p-6 border-2 border-slate-100 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all group text-left relative overflow-hidden"
                    >
                        <div className="absolute right-[-20px] top-[-20px] bg-purple-100 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                <IconUsers className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-purple-700">I'm a Job Seeker</h3>
                                <p className="text-sm text-slate-500">Find jobs and get matched by AI.</p>
                            </div>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleRoleSelect(UserRole.EMPLOYER)}
                        className="w-full p-6 border-2 border-slate-100 rounded-2xl hover:border-fuchsia-500 hover:bg-fuchsia-50 transition-all group text-left relative overflow-hidden"
                    >
                         <div className="absolute right-[-20px] top-[-20px] bg-fuchsia-100 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-3 bg-fuchsia-100 text-fuchsia-600 rounded-full">
                                <IconBriefcase className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-fuchsia-700">I'm an Employer</h3>
                                <p className="text-sm text-slate-500">Post jobs and find top talent fast.</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
          );
      }

      if (authStage === 'LOGIN') {
          const isEmployee = currentRole === UserRole.EMPLOYEE;
          const themeColor = isEmployee ? 'purple' : 'fuchsia';
          const themeClass = isEmployee ? 'bg-purple-600 hover:bg-purple-700' : 'bg-fuchsia-600 hover:bg-fuchsia-700';

          return (
            <div className="flex flex-col h-full bg-white p-8 animate-in slide-in-from-bottom duration-300">
                 <button onClick={() => setAuthStage('ROLE_SELECTION')} className="mb-8 text-slate-400 hover:text-slate-600 inline-flex items-center gap-2 font-bold text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back
                 </button>

                 <div className="mb-8">
                     <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome!</h2>
                     <p className="text-slate-500 text-sm font-medium">Sign in to your {isEmployee ? 'Job Seeker' : 'Employer'} account</p>
                 </div>

                 {/* Login Method Toggle */}
                 <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                    <button 
                        onClick={() => setLoginMethod('PHONE')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === 'PHONE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                        PHONE
                    </button>
                    <button 
                        onClick={() => setLoginMethod('EMAIL')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === 'EMAIL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                        EMAIL
                    </button>
                 </div>

                 <form onSubmit={handleLogin} className="space-y-4">
                     {loginMethod === 'PHONE' ? (
                         <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                            <div className="flex gap-2">
                                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-500 font-bold text-sm">
                                    +91
                                </div>
                                <input 
                                    type="tel" 
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className={`flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium`}
                                    placeholder="98765 43210"
                                />
                            </div>
                         </div>
                     ) : (
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                            <input 
                               type="email" 
                               required
                               value={identifier}
                               onChange={(e) => setIdentifier(e.target.value)}
                               className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium`}
                               placeholder="user@example.com"
                            />
                        </div>
                     )}
                     
                     <div>
                         <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
                         <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium`}
                            placeholder="••••••••"
                         />
                     </div>

                     <div className="flex justify-end">
                         <button type="button" className={`text-xs font-bold text-${themeColor}-600`}>Forgot password?</button>
                     </div>
                     
                     <div className="pt-4">
                        <button 
                            type="submit"
                            className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-[0.98] ${themeClass}`}
                        >
                            Sign In
                        </button>
                     </div>
                 </form>
                 
                 <div className="mt-auto pt-8 text-center">
                     <p className="text-xs text-slate-400 font-medium">
                         Don't have an account? <span onClick={() => setAuthStage('SIGNUP')} className={`text-${themeColor}-600 font-bold cursor-pointer hover:underline`}>Sign Up</span>
                     </p>
                  </div>
             </div>
           );
       }

       if (authStage === 'SIGNUP') {
           const isEmployee = currentRole === UserRole.EMPLOYEE;
           const themeColor = isEmployee ? 'purple' : 'fuchsia';
           const themeClass = isEmployee ? 'bg-purple-600 hover:bg-purple-700' : 'bg-fuchsia-600 hover:bg-fuchsia-700';

           const handleSignUp = (e: React.FormEvent) => {
               e.preventDefault();
               setAuthStage('APP');
           };

           return (
             <div className="flex flex-col h-full bg-white p-6 sm:p-8 animate-in slide-in-from-bottom duration-300 overflow-y-auto">
                  <button onClick={() => setAuthStage('LOGIN')} className="mb-4 text-slate-400 hover:text-slate-600 inline-flex items-center gap-2 font-bold text-sm">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                     Back
                  </button>

                  <div className="mb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Create Account</h2>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium">Join as a {isEmployee ? 'Job Seeker' : 'Employer'}</p>
                  </div>

                  {/* Signup Method Toggle */}
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-3">
                     <button 
                         type="button"
                         onClick={() => setLoginMethod('PHONE')}
                         className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${loginMethod === 'PHONE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                     >
                         PHONE
                     </button>
                     <button 
                         type="button"
                         onClick={() => setLoginMethod('EMAIL')}
                         className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${loginMethod === 'EMAIL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                     >
                         EMAIL
                     </button>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-3">
                      <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                             {isEmployee ? 'Full Name' : 'Company Name'}
                          </label>
                          <input 
                             type="text" 
                             required
                             value={fullName}
                             onChange={(e) => setFullName(e.target.value)}
                             className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium text-sm`}
                             placeholder={isEmployee ? "Lokesh Gandreddy" : "LogiTech Solutions"}
                          />
                      </div>

                      {loginMethod === 'PHONE' ? (
                          <div>
                             <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</label>
                             <div className="flex gap-2">
                                 <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-500 font-bold text-sm">
                                     +91
                                 </div>
                                 <input 
                                     type="tel" 
                                     required
                                     value={identifier}
                                     onChange={(e) => setIdentifier(e.target.value)}
                                     className={`flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium text-sm`}
                                     placeholder="98765 43210"
                                 />
                             </div>
                          </div>
                      ) : (
                         <div>
                             <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
                             <input 
                                type="email" 
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium text-sm`}
                                placeholder="user@example.com"
                             />
                         </div>
                      )}
                      
                      <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Password</label>
                          <input 
                             type="password" 
                             required
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 font-medium text-sm`}
                             placeholder="••••••••"
                          />
                      </div>

                      <div className="pt-2">
                         <button 
                             type="submit"
                             className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-[0.98] ${themeClass}`}
                         >
                             Sign Up
                         </button>
                      </div>
                  </form>
                  
                  <div className="mt-auto pt-5 text-center">
                     <p className="text-xs text-slate-400 font-medium">
                         Already have an account? <span onClick={() => setAuthStage('LOGIN')} className={`text-${themeColor}-600 font-bold cursor-pointer hover:underline`}>Sign In</span>
                     </p>
                  </div>
             </div>
           );
       }
       return null;
  }

  return (
    <div className="w-full h-full bg-white overflow-hidden relative flex flex-col">
       {authStage !== 'APP' ? (
           renderAuthScreens()
       ) : (
         <>
           {selectedChatApp ? (
               // Full Screen Chat Stack - Outside Layout (Hides Bottom Tabs)
               <ChatInterface 
                   application={selectedChatApp} 
                   currentUser={currentUser} 
                   onBack={() => setSelectedChatApp(null)} 
               />
           ) : (
               // Main Tab Navigation Stack
               <Layout 
                   activeTab={activeTab} 
                   onTabChange={(tab) => { setActiveTab(tab); setSelectedChatApp(null); }}
                   role={currentRole}
                   onTriggerInterview={() => setShowInterview(true)}
               >
                   {renderContent()}
               </Layout>
           )}
           
           {showInterview && (
             <VideoInterview 
               role={currentRole}
               onClose={() => setShowInterview(false)} 
               onComplete={handleSmartComplete} 
             />
           )}
         </>
       )}
    </div>
  );
};

export default App;
