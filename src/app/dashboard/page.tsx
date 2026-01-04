'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, MapPin, Briefcase, FileText, Save, Plus, Trash2, 
  Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Home, LogOut,
  Mail, Phone, Menu, X
} from 'lucide-react';

type Tab = 'settings' | 'content' | 'branches' | 'jobs';

interface Branch {
  id: string;
  active: boolean;
  ar: { name: string; address: string; city: string };
  en: { name: string; address: string; city: string };
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
}

interface Job {
  id: string;
  active: boolean;
  ar: { title: string; description: string; requirements: string[] };
  en: { title: string; description: string; requirements: string[] };
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Settings State
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    whatsapp: '',
  });

  // Content State
  const [content, setContent] = useState<Record<string, unknown>>({});

  // Branches State
  const [branches, setBranches] = useState<Branch[]>([]);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load content
      const contentRes = await fetch('/api/content');
      const contentData = await contentRes.json();
      setContent(contentData);
      setSettings(contentData.settings || { email: '', phone: '', whatsapp: '' });

      // Load branches
      const branchesRes = await fetch('/api/branches');
      const branchesData = await branchesRes.json();
      setBranches(branchesData.branches || []);

      // Load jobs
      const jobsRes = await fetch('/api/jobs');
      const jobsData = await jobsRes.json();
      setJobs(jobsData.jobs || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    setIsLoading(false);
  };

  const saveSettings = async () => {
    setSaveStatus('saving');
    try {
      const updatedContent = { ...content, settings };
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const saveBranches = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branches }),
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const saveJobs = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobs }),
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const addBranch = () => {
    const newBranch: Branch = {
      id: `branch-${Date.now()}`,
      active: true,
      ar: { name: 'فرع جديد', address: '', city: '' },
      en: { name: 'New Branch', address: '', city: '' },
      phone: '',
      email: '',
      coordinates: { lat: 24.7136, lng: 46.6753 },
    };
    setBranches([...branches, newBranch]);
    setEditingBranch(newBranch);
  };

  const updateBranch = (id: string, updates: Partial<Branch>) => {
    setBranches(branches.map(b => b.id === id ? { ...b, ...updates } : b));
    if (editingBranch?.id === id) {
      setEditingBranch({ ...editingBranch, ...updates });
    }
  };

  const deleteBranch = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
      setBranches(branches.filter(b => b.id !== id));
      if (editingBranch?.id === id) {
        setEditingBranch(null);
      }
    }
  };

  const addJob = () => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      active: true,
      ar: { title: 'وظيفة جديدة', description: '', requirements: [] },
      en: { title: 'New Job', description: '', requirements: [] },
    };
    setJobs([...jobs, newJob]);
    setEditingJob(newJob);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, ...updates } : j));
    if (editingJob?.id === id) {
      setEditingJob({ ...editingJob, ...updates });
    }
  };

  const deleteJob = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) {
      setJobs(jobs.filter(j => j.id !== id));
      if (editingJob?.id === id) {
        setEditingJob(null);
      }
    }
  };

  const tabs = [
    { id: 'settings' as Tab, label: 'الإعدادات', icon: Settings },
    { id: 'branches' as Tab, label: 'الفروع', icon: MapPin },
    { id: 'jobs' as Tab, label: 'الوظائف', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
          <span className="font-bold">لوحة التحكم</span>
          <a href="/" className="p-2">
            <Home size={24} />
          </a>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-72 bg-black border-l border-white/5 z-50
        transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 left-4 p-2"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black">FLL</span>
            <span className="text-2xl font-black text-primary-500">Express</span>
          </div>
          <p className="text-white/50 text-sm mt-1">لوحة التحكم</p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                  : 'hover:bg-white/5 text-white/60'}
              `}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <a 
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 transition-all"
          >
            <Home size={20} />
            <span>الصفحة الرئيسية</span>
          </a>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:mr-72 min-h-screen pt-16 lg:pt-0">
        {/* Header */}
        <header className="hidden lg:flex items-center justify-between p-6 border-b border-white/5">
          <h1 className="text-2xl font-bold">{tabs.find(t => t.id === activeTab)?.label}</h1>
          
          {/* Save Status */}
          <div className="flex items-center gap-4">
            {saveStatus === 'saving' && (
              <div className="flex items-center gap-2 text-white/50">
                <Loader2 size={18} className="animate-spin" />
                <span>جاري الحفظ...</span>
              </div>
            )}
            {saveStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={18} />
                <span>تم الحفظ بنجاح</span>
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={18} />
                <span>فشل الحفظ</span>
              </div>
            )}
          </div>
        </header>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 size={40} className="animate-spin text-primary-500" />
            </div>
          ) : (
            <>
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-6">
                  <div className="card-dark">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Mail size={24} className="text-primary-500" />
                      إعدادات التواصل
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">
                          البريد الإلكتروني (لاستقبال الطلبات)
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="form-input"
                          placeholder="info@fll-express.com"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm mb-2">
                          رقم الهاتف
                        </label>
                        <input
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="form-input"
                          placeholder="+966 50 000 0000"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm mb-2">
                          رقم الواتساب
                        </label>
                        <input
                          type="tel"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="form-input"
                          placeholder="+966500000000"
                          dir="ltr"
                        />
                        <p className="text-white/40 text-xs mt-1">بدون مسافات أو رموز خاصة</p>
                      </div>
                    </div>

                    <button
                      onClick={saveSettings}
                      disabled={saveStatus === 'saving'}
                      className="btn-primary mt-6 flex items-center gap-2"
                    >
                      <Save size={18} />
                      <span>حفظ الإعدادات</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Branches Tab */}
              {activeTab === 'branches' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">إدارة الفروع</h2>
                    <button
                      onClick={addBranch}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus size={18} />
                      <span>إضافة فرع</span>
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Branches List */}
                    <div className="space-y-4">
                      {branches.map((branch) => (
                        <div
                          key={branch.id}
                          className={`card-dark cursor-pointer transition-all ${
                            editingBranch?.id === branch.id ? 'border-primary-500' : ''
                          }`}
                          onClick={() => setEditingBranch(branch)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${branch.active ? 'bg-green-500' : 'bg-red-500'}`} />
                              <div>
                                <h3 className="font-bold">{branch.ar.name}</h3>
                                <p className="text-white/50 text-sm">{branch.ar.city}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateBranch(branch.id, { active: !branch.active });
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                {branch.active ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteBranch(branch.id);
                                }}
                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {branches.length === 0 && (
                        <div className="text-center py-12 text-white/40">
                          لا توجد فروع - أضف فرعاً جديداً
                        </div>
                      )}
                    </div>

                    {/* Branch Editor */}
                    {editingBranch && (
                      <div className="card-dark">
                        <h3 className="text-lg font-bold mb-6">تعديل الفرع</h3>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/70 text-sm mb-2">الاسم (عربي)</label>
                              <input
                                type="text"
                                value={editingBranch.ar.name}
                                onChange={(e) => updateBranch(editingBranch.id, {
                                  ar: { ...editingBranch.ar, name: e.target.value }
                                })}
                                className="form-input"
                              />
                            </div>
                            <div>
                              <label className="block text-white/70 text-sm mb-2">Name (English)</label>
                              <input
                                type="text"
                                value={editingBranch.en.name}
                                onChange={(e) => updateBranch(editingBranch.id, {
                                  en: { ...editingBranch.en, name: e.target.value }
                                })}
                                className="form-input"
                                dir="ltr"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/70 text-sm mb-2">المدينة (عربي)</label>
                              <input
                                type="text"
                                value={editingBranch.ar.city}
                                onChange={(e) => updateBranch(editingBranch.id, {
                                  ar: { ...editingBranch.ar, city: e.target.value }
                                })}
                                className="form-input"
                              />
                            </div>
                            <div>
                              <label className="block text-white/70 text-sm mb-2">City (English)</label>
                              <input
                                type="text"
                                value={editingBranch.en.city}
                                onChange={(e) => updateBranch(editingBranch.id, {
                                  en: { ...editingBranch.en, city: e.target.value }
                                })}
                                className="form-input"
                                dir="ltr"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">العنوان (عربي)</label>
                            <input
                              type="text"
                              value={editingBranch.ar.address}
                              onChange={(e) => updateBranch(editingBranch.id, {
                                ar: { ...editingBranch.ar, address: e.target.value }
                              })}
                              className="form-input"
                            />
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">Address (English)</label>
                            <input
                              type="text"
                              value={editingBranch.en.address}
                              onChange={(e) => updateBranch(editingBranch.id, {
                                en: { ...editingBranch.en, address: e.target.value }
                              })}
                              className="form-input"
                              dir="ltr"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/70 text-sm mb-2">الهاتف</label>
                              <input
                                type="tel"
                                value={editingBranch.phone}
                                onChange={(e) => updateBranch(editingBranch.id, { phone: e.target.value })}
                                className="form-input"
                                dir="ltr"
                              />
                            </div>
                            <div>
                              <label className="block text-white/70 text-sm mb-2">البريد</label>
                              <input
                                type="email"
                                value={editingBranch.email}
                                onChange={(e) => updateBranch(editingBranch.id, { email: e.target.value })}
                                className="form-input"
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={saveBranches}
                          disabled={saveStatus === 'saving'}
                          className="btn-primary mt-6 flex items-center gap-2"
                        >
                          <Save size={18} />
                          <span>حفظ الفروع</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Jobs Tab */}
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">إدارة الوظائف</h2>
                    <button
                      onClick={addJob}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus size={18} />
                      <span>إضافة وظيفة</span>
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Jobs List */}
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div
                          key={job.id}
                          className={`card-dark cursor-pointer transition-all ${
                            editingJob?.id === job.id ? 'border-primary-500' : ''
                          }`}
                          onClick={() => setEditingJob(job)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${job.active ? 'bg-green-500' : 'bg-red-500'}`} />
                              <div>
                                <h3 className="font-bold">{job.ar.title}</h3>
                                <p className="text-white/50 text-sm">{job.en.title}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateJob(job.id, { active: !job.active });
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                {job.active ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteJob(job.id);
                                }}
                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {jobs.length === 0 && (
                        <div className="text-center py-12 text-white/40">
                          لا توجد وظائف - أضف وظيفة جديدة
                        </div>
                      )}
                    </div>

                    {/* Job Editor */}
                    {editingJob && (
                      <div className="card-dark">
                        <h3 className="text-lg font-bold mb-6">تعديل الوظيفة</h3>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/70 text-sm mb-2">المسمى (عربي)</label>
                              <input
                                type="text"
                                value={editingJob.ar.title}
                                onChange={(e) => updateJob(editingJob.id, {
                                  ar: { ...editingJob.ar, title: e.target.value }
                                })}
                                className="form-input"
                              />
                            </div>
                            <div>
                              <label className="block text-white/70 text-sm mb-2">Title (English)</label>
                              <input
                                type="text"
                                value={editingJob.en.title}
                                onChange={(e) => updateJob(editingJob.id, {
                                  en: { ...editingJob.en, title: e.target.value }
                                })}
                                className="form-input"
                                dir="ltr"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">الوصف (عربي)</label>
                            <textarea
                              value={editingJob.ar.description}
                              onChange={(e) => updateJob(editingJob.id, {
                                ar: { ...editingJob.ar, description: e.target.value }
                              })}
                              className="form-input resize-none"
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">Description (English)</label>
                            <textarea
                              value={editingJob.en.description}
                              onChange={(e) => updateJob(editingJob.id, {
                                en: { ...editingJob.en, description: e.target.value }
                              })}
                              className="form-input resize-none"
                              rows={3}
                              dir="ltr"
                            />
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">المتطلبات (عربي) - سطر لكل متطلب</label>
                            <textarea
                              value={editingJob.ar.requirements.join('\n')}
                              onChange={(e) => updateJob(editingJob.id, {
                                ar: { ...editingJob.ar, requirements: e.target.value.split('\n').filter(r => r.trim()) }
                              })}
                              className="form-input resize-none"
                              rows={4}
                            />
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">Requirements (English) - One per line</label>
                            <textarea
                              value={editingJob.en.requirements.join('\n')}
                              onChange={(e) => updateJob(editingJob.id, {
                                en: { ...editingJob.en, requirements: e.target.value.split('\n').filter(r => r.trim()) }
                              })}
                              className="form-input resize-none"
                              rows={4}
                              dir="ltr"
                            />
                          </div>
                        </div>

                        <button
                          onClick={saveJobs}
                          disabled={saveStatus === 'saving'}
                          className="btn-primary mt-6 flex items-center gap-2"
                        >
                          <Save size={18} />
                          <span>حفظ الوظائف</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

