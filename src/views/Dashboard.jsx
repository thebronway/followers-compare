import React, { useState, useEffect } from 'react';
import FileDrop from '../components/FileDrop';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import InstructionsModal from '../components/InstructionsModal';
import { parseFile } from '../utils/parser';
import { processLists } from '../utils/logic';
import { downloadExcel } from '../utils/export';
import { Users, UserMinus, UserPlus, Download, Info, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersName, setFollowersName] = useState(null);
  const [followingName, setFollowingName] = useState(null);

  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('non'); 
  const [showInstructions, setShowInstructions] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedV2');
    if (!hasVisited) {
      setShowInstructions(true);
      localStorage.setItem('hasVisitedV2', 'true');
    }
  }, []);

  const handleUpload = async (file, type) => {
    try {
      const data = await parseFile(file);
      
      if (!data || data.length === 0) {
        alert(`Error: No users found in ${file.name}. \n\nThe file format might be different than expected.`);
        return;
      }

      if (type === 'followers') {
        setFollowers(data);
        setFollowersName(file.name);
      } else {
        setFollowing(data);
        setFollowingName(file.name);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (followers.length && following.length) {
      const res = processLists(followers, following);
      setStats(res);
      setIsCollapsed(true);
    }
  }, [followers, following]);

  const handleDownload = () => {
    if (!stats) return;
    downloadExcel({
      "Non-Followers": stats.nonFollowers,
      "Fans": stats.fans,
      "Mutuals": stats.mutual
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
          Analyze Followers
          {stats && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-xs font-normal text-slate-500 hover:text-primary flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md transition-colors"
            >
              {isCollapsed ? <><ChevronDown size={14} className="mr-1"/> Show Uploads</> : <><ChevronUp size={14} className="mr-1"/> Hide Uploads</>}
            </button>
          )}
        </h2>
        <button 
          onClick={() => setShowInstructions(true)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
        >
          <Info size={16} /> Instructions
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0 m-0' : 'max-h-[500px] opacity-100'}`}>
        <FileDrop 
          label="Upload Followers" 
          color="pink"
          fileData={followers}
          fileName={followersName}
          fileType="followers"
          onFileLoaded={(f) => handleUpload(f, 'followers')} 
        />
        <FileDrop 
          label="Upload Following" 
          color="indigo"
          fileData={following}
          fileName={followingName}
          fileType="following"
          onFileLoaded={(f) => handleUpload(f, 'following')} 
        />
      </div>

      {stats && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-2xl font-bold dark:text-white">Analysis Results</h2>
            <button 
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
            >
              <Download size={18} />
              <span>Export Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard 
              title="Not Following Back" 
              count={stats.nonFollowers.length} 
              total={following.length}
              color="red"
              icon={UserMinus}
              active={activeTab === 'non'}
              onClick={() => setActiveTab('non')}
            />
            <StatsCard 
              title="Fans (They Follow You)" 
              count={stats.fans.length} 
              total={followers.length}
              color="amber"
              icon={UserPlus}
              active={activeTab === 'fans'}
              onClick={() => setActiveTab('fans')}
            />
            <StatsCard 
              title="Mutual Followers" 
              count={stats.mutual.length} 
              total={followers.length}
              color="green"
              icon={Users}
              active={activeTab === 'mutual'}
              onClick={() => setActiveTab('mutual')}
            />
          </div>

          <div className="transition-all duration-300">
            
            {/* DISCLAIMER FOR NON-FOLLOWERS TAB */}
            {activeTab === 'non' && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-4 rounded-r">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                      Note: This list may include users who have <strong>deactivated</strong> or <strong>deleted</strong> their accounts. They appear here because they are technically "not following you back" (because they don't exist), but you are still following their ghost profile.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'non' && <DataTable data={stats.nonFollowers} title="People you follow who don't follow back" />}
            {activeTab === 'fans' && <DataTable data={stats.fans} title="People who follow you but you don't follow back" />}
            {activeTab === 'mutual' && <DataTable data={stats.mutual} title="Mutual Connections" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;