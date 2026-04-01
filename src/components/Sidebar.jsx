import React from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  AlertCircle, 
  FileText, 
  MessageSquare, 
  ShieldAlert, 
  Search, 
  Settings,
  Mail,
  Star,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { id: 'Overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'Inbox', icon: Inbox, label: 'Inbox' },
  { id: 'Starred', icon: Star, label: 'Starred', color: 'text-yellow-400' },
  { id: 'Complaint', icon: AlertCircle, label: 'Complaints', color: 'text-red-400' },
  { id: 'Request', icon: FileText, label: 'Requests', color: 'text-blue-400' },
  { id: 'Feedback', icon: MessageSquare, label: 'Feedback', color: 'text-green-400' },
  { id: 'Spam', icon: ShieldAlert, label: 'Spam', color: 'text-slate-400' },
  { id: 'Classify New', icon: Search, label: 'Classify New' },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  return (
    <aside className={cn(
      "h-screen glass border-r-0 flex flex-col py-6 z-20 transition-all duration-300 relative",
      isOpen ? "w-72 px-6" : "w-20 px-3 items-center"
    )}>
      <div className={cn(
        "flex items-center mb-12",
        isOpen ? "gap-3 px-2 justify-between w-full" : "justify-center"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="min-w-10 w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Mail className="text-gray-900 dark:text-white w-6 h-6 shrink-0" />
          </div>
          {isOpen && (
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-white/60 whitespace-nowrap">
              AI Email
            </h1>
          )}
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shrink-0"
          title={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={cn("space-y-1 flex-1 w-full", !isOpen && "flex flex-col items-center")}>
        {isOpen ? (
          <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-[0.2em] mb-4 px-2 whitespace-nowrap">
            Workspace
          </p>
        ) : (
          <div className="h-0 mb-4 border-b border-gray-200 dark:border-white/10 w-8" /> 
        )}
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={!isOpen ? item.label : undefined}
            className={cn(
              "flex items-center rounded-xl transition-all duration-200 group relative",
              isOpen ? "w-full gap-3 px-3 py-2.5" : "w-12 h-12 justify-center mb-1",
              activeTab === item.id 
                ? "bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" 
                : "text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-700 dark:text-white/80"
            )}
          >
            {activeTab === item.id && (
              <div className={cn(
                "absolute bg-primary-500",
                isOpen ? "left-0 w-1 h-6 rounded-r-full" : "left-0 w-1 h-6 rounded-r-full"
              )} />
            )}
            <item.icon className={cn("w-5 h-5 transition-colors shrink-0", item.color || "text-inherit")} />
            {isOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className={cn("pt-6 border-t border-gray-100 dark:border-white/5 space-y-1 w-full", !isOpen && "flex flex-col items-center")}>
        <button 
          onClick={() => setActiveTab('Settings')}
          title={!isOpen ? 'Settings' : undefined}
          className={cn(
            "flex items-center rounded-xl transition-all duration-200 group relative",
            isOpen ? "w-full gap-3 px-3 py-2.5" : "w-12 h-12 justify-center",
            activeTab === 'Settings' 
              ? "bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" 
              : "text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-700 dark:text-white/80"
          )}
        >
          {activeTab === 'Settings' && (
            <div className={cn(
              "absolute bg-primary-500",
              isOpen ? "left-0 w-1 h-6 rounded-r-full" : "left-0 w-1 h-6 rounded-r-full"
            )} />
          )}
          <Settings className={cn("w-5 h-5 transition-colors shrink-0", activeTab === 'Settings' ? "text-primary-400" : "text-inherit")} />
          {isOpen && <span className="font-medium whitespace-nowrap">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
