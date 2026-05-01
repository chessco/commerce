import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ShieldCheck, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useLoginMutation } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate: login, isPending, isError } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, pass: password },
      {
        onSuccess: (data: any) => {
          if (data.user.role === 'ADMIN' || data.user.role === 'SUPERADMIN') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#061326] text-[#d6e3fd] font-['Inter'] selection:bg-blue-500/30 selection:text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-blue-600/10 to-transparent" />
        <div className="absolute top-0 left-1/3 w-[0.5px] h-full bg-gradient-to-b from-transparent via-blue-600/10 to-transparent" />
        <div className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Global Header Anchor */}
      <header className="fixed top-0 w-full z-50 bg-[#061326]/80 backdrop-blur-xl border-b-[0.5px] border-slate-700/30 flex justify-between items-center px-8 py-4">
        <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ShieldCheck className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white">VOLTIA</h1>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('auth.secureNode')}</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>

      {/* Main Terminal */}
      <main className="w-full max-w-lg z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="backdrop-blur-3xl bg-slate-800/20 border border-slate-700/30 p-10 lg:p-12 rounded-3xl flex flex-col gap-10 shadow-2xl shadow-black/40"
        >
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase">{t('auth.loginTitle')}</span>
              <span className="text-[9px] font-mono text-slate-500">v4.0.2 / SECURE_LAYER</span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white">
              {t('auth.loginSubtitle')}
            </h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              {t('auth.visualDesc')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {isError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400"
              >
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="text-xs font-bold">{t('auth.invalidCredentials')}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="relative group">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full bg-transparent border-0 border-b-[0.5px] border-slate-700 pt-6 pb-2 px-0 text-white focus:ring-0 focus:border-blue-500 transition-all font-bold"
                placeholder=" "
              />
              <label className="absolute left-0 top-1 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-blue-500 peer-focus:tracking-widest capitalize">
                {t('common.email')}
              </label>
              <Mail size={14} className="absolute right-0 bottom-3 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full bg-transparent border-0 border-b-[0.5px] border-slate-700 pt-6 pb-2 px-0 text-white focus:ring-0 focus:border-blue-500 transition-all font-bold"
                placeholder=" "
              />
              <label className="absolute left-0 top-1 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-blue-500 peer-focus:tracking-widest capitalize">
                {t('common.password')}
              </label>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-slate-600 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded-sm bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0" />
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Remember Node</span>
              </label>
              <a href="#" className="text-xs font-black text-blue-500 hover:text-blue-400 transition-colors tracking-widest">{t('auth.forgotPassword')}</a>
            </div>

            {/* Primary Action */}
            <button 
              type="submit"
              disabled={isPending}
              className="h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:grayscale"
            >
              {isPending ? t('auth.signingIn') : t('common.login')}
            </button>
          </form>

          {/* Social / External */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[0.5px] flex-1 bg-slate-800" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{t('common.orContinueWith')}</span>
              <div className="h-[0.5px] flex-1 bg-slate-800" />
            </div>
            
            <button className="w-full h-14 bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/50 flex items-center justify-center gap-3 rounded-2xl transition-all duration-300 group">
              <Fingerprint size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                Validate with SSO
              </span>
            </button>
          </div>

          <p className="text-center text-xs font-bold text-slate-500 mt-4">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-blue-500 hover:underline hover:text-blue-400 font-black uppercase tracking-widest ml-2 italic">
              {t('common.register')}
            </Link>
          </p>

          {/* Status Bar */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 mt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <div className="flex-1 flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Integrity Check</span>
              <span className="text-[10px] font-mono text-slate-400">SECURE_CHANNEL_READY (AES-256)</span>
            </div>
            <ShieldCheck size={16} className="text-slate-700" />
          </div>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 w-full py-8 flex flex-col md:flex-row justify-between items-center px-12 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
        <div>© 2024 VOLTIA ARCHITECTURAL GROUP. SECURE TERMINAL.</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-500 transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

