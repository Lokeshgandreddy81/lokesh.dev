
import React, { useState } from 'react';
import { User, UserRole, Profile, TalentPool } from '../types';
import { MOCK_PROFILES, MOCK_POOLS } from '../services/mockData';
import { IconMic, IconUsers, IconMapPin, IconBriefcase, IconCheck, IconVideo, IconGlobe, IconFile, IconX, IconMessageSquare, IconPlus } from '../components/Icons';

interface ProfilesTabProps {
  currentUser: User;
  onTriggerInterview?: () => void;
}

const ProfilesTab: React.FC<ProfilesTabProps> = ({ currentUser, onTriggerInterview }) => {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [selectedPool, setSelectedPool] = useState<TalentPool | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Profile | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;
    setProfiles(prev => prev.map(p => p.id === editingProfile.id ? editingProfile : p));
    setEditingProfile(null);
  };

  // --- Employer Role Views ---
  if (currentUser.role === UserRole.EMPLOYER) {
    if (selectedCandidate) {
        return (
            <div className="h-full bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">
                <header className="bg-purple-600 text-white p-4 shadow-sm flex items-center sticky top-0 z-10">
                    <button onClick={() => setSelectedCandidate(null)} className="mr-3 p-1 rounded-full hover:bg-purple-700 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-lg font-bold">Candidate Profile</h1>
                </header>
                <div className="flex-1 overflow-y-auto pb-10">
                    <div className="flex flex-col items-center pt-8 pb-6 bg-white border-b border-slate-200">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${selectedCandidate.roleTitle}&background=7c3aed&color=fff&size=128`} 
                            alt="Avatar" 
                            className="w-24 h-24 rounded-full mb-3 shadow-md border-4 border-purple-50"
                        />
                        <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.roleTitle} Expert</h2>
                        <p className="text-slate-500 flex items-center gap-1 text-sm font-medium">
                            <IconMapPin className="w-4 h-4 text-purple-500" />
                            {selectedCandidate.location}
                        </p>
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                             <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-slate-900">Professional Summary</h3>
                                <button className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded hover:bg-purple-100 border border-purple-100">
                                    VIEW RESUME
                                </button>
                             </div>
                             <p className="text-slate-600 text-sm leading-relaxed">{selectedCandidate.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedPool) {
        return (
            <div className="h-full bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">
                <header className="bg-purple-600 text-white p-4 shadow-sm flex items-center sticky top-0 z-10">
                    <button onClick={() => setSelectedPool(null)} className="mr-3 p-1 rounded-full hover:bg-purple-700 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">{selectedPool.name}</h1>
                        <p className="text-[10px] text-purple-100 uppercase tracking-widest">{selectedPool.count} Candidates Found</p>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {profiles.map((profile, i) => (
                        <div 
                            key={profile.id} 
                            onClick={() => setSelectedCandidate(profile)}
                            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer hover:border-purple-200"
                        >
                            <div className="flex gap-4">
                                <img src={`https://ui-avatars.com/api/?name=Candidate+${i+1}&background=7c3aed&color=fff`} className="w-12 h-12 rounded-full border border-slate-100 shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 truncate">{profile.roleTitle} Expert</h3>
                                    <p className="text-xs text-slate-500 mb-2">{profile.experienceYears} Years Exp • {profile.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
             <header className="bg-purple-600 text-white p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-1">Talent Pools</h1>
                <p className="text-purple-100 text-sm">Organize and track your candidate pipelines</p>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {MOCK_POOLS.map(pool => (
                    <div key={pool.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-lg text-slate-800">{pool.name}</h3>
                            <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2 py-1 rounded-full border border-purple-200">
                                {pool.count} Candidates
                            </span>
                        </div>
                        <button 
                            onClick={() => setSelectedPool(pool)}
                            className="w-full py-2.5 text-sm text-purple-600 font-bold border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors shadow-sm"
                        >
                            View Candidates
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  // --- Employee Role View ---
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="bg-white p-6 shadow-sm z-10 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-900">My Profiles</h1>
              <button 
                onClick={onTriggerInterview}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold shadow-lg shadow-purple-200 transition-all bg-purple-600 hover:bg-purple-700 active:scale-95"
              >
                  <IconMic className="w-4 h-4"/> Create New
              </button>
          </div>
          <p className="text-slate-500 text-sm">
              Manage your diverse skillsets and job-specific profiles.
          </p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {profiles.map((profile) => (
            <div key={profile.id} className={`bg-white p-5 rounded-2xl border-2 transition-all ${profile.isDefault ? 'border-purple-500 shadow-md ring-4 ring-purple-50' : 'border-transparent shadow-sm hover:border-slate-200'}`}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-800">{profile.roleTitle}</h3>
                    {profile.isDefault && <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">Default</span>}
                </div>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{profile.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {profile.skills.slice(0,4).map(skill => (
                        <span key={skill} className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase px-2 py-1 rounded-md border border-slate-100">
                            {skill}
                        </span>
                    ))}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                         <IconMapPin className="w-3.5 h-3.5 text-slate-400" />
                         <span className="text-[11px] text-slate-400 font-medium">{profile.experienceYears} Years Exp. • {profile.location}</span>
                    </div>
                    <button 
                      onClick={() => setEditingProfile({...profile})}
                      className="text-purple-600 text-xs font-bold hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      EDIT
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Edit Profile Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end animate-in fade-in duration-300">
            <div className="w-full bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[90%] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
                    <button onClick={() => setEditingProfile(null)} className="p-2 text-slate-400">
                        <IconX className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Profile Role Title</label>
                        <input 
                            type="text" 
                            value={editingProfile.roleTitle}
                            onChange={(e) => setEditingProfile({...editingProfile, roleTitle: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Professional Summary</label>
                        <textarea 
                            rows={4}
                            value={editingProfile.summary}
                            onChange={(e) => setEditingProfile({...editingProfile, summary: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Years Experience</label>
                            <input 
                                type="number" 
                                value={editingProfile.experienceYears}
                                onChange={(e) => setEditingProfile({...editingProfile, experienceYears: parseInt(e.target.value)})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Location</label>
                            <input 
                                type="text" 
                                value={editingProfile.location}
                                onChange={(e) => setEditingProfile({...editingProfile, location: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button"
                            onClick={() => setEditingProfile(null)}
                            className="flex-1 py-4 text-slate-500 font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-[2] py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProfilesTab;
