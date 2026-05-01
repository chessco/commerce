import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Settings, 
  BarChart3, 
  ChevronRight, 
  Network,
  Lock,
  LineChart,
  CloudCog,
  Globe,
  Share2,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

export const Landing = () => {
  const { t } = useTranslation();

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-600/5 border border-brand-600/10 rounded-full">
                <span className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">{t('landing.heroBadge')}</span>
              </div>
              <h1 className="text-5xl lg:text-[5.5rem] font-bold text-on-surface tracking-[-0.03em] leading-[0.95] lowercase first-letter:uppercase">
                <Trans i18nKey="landing.heroTitle">
                  Technical Authority <span className="block" />
                  <span className="text-brand-600">Architected.</span>
                </Trans>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
                {t('landing.heroDesc')}
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <button className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-600/20 hover:scale-[0.98] transition-all flex items-center gap-2 group">
                  {t('common.exploreSolutions')}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-surface-container-high text-brand-600 px-8 py-4 rounded-2xl font-bold hover:bg-surface-container-highest transition-all flex items-center gap-2">
                  {t('common.watchDemo')}
                  <Zap size={18} />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
              <div className="relative bg-surface-container-lowest rounded-[48px] p-6 shadow-cobalt border border-white/40 overflow-hidden group">
                <img 
                  alt="Infrastructure Authority" 
                  className="w-full h-auto rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
                  src="/voltia_asset.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{t('common.featuredProject')}</p>
                  <h3 className="text-xl font-bold">{t('landing.project.metropolisName')}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Metrics */}
        <section className="bg-surface-container py-24 border-y border-surface-container-highest">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center lg:text-left">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
              {[
                { label: t('common.uptime'), value: '99.999%' },
                { label: t('common.capacity'), value: '15.4MW' },
                { label: t('common.throughput'), value: '420Tbps' },
                { label: t('common.edgeLocations'), value: '142' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-4xl lg:text-5xl font-bold text-brand-600 tracking-tight">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-outline">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 px-6 lg:px-20 bg-background" id="solutions">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
                {t('landing.sectionFeaturesTitle')}
              </h2>
              <p className="text-on-surface-variant text-lg">
                {t('landing.sectionFeaturesDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Feature Card 1 - Large */}
              <div className="md:col-span-8 bg-surface-container-lowest p-12 rounded-[40px] flex flex-col justify-between group shadow-premium border border-transparent hover:border-brand-600/10 transition-all duration-500">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-brand-600/5 rounded-[20px] flex items-center justify-center text-brand-600">
                    <Network size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">{t('landing.features.safety.title')}</h3>
                  <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
                    {t('landing.features.safety.desc')}
                  </p>
                </div>
                <div className="mt-12 h-64 overflow-hidden rounded-[32px] bg-surface-container relative">
                   <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    alt="Network"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent mix-blend-overlay"></div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="md:col-span-4 bg-surface-container p-12 rounded-[40px] flex flex-col gap-10 group shadow-premium hover:shadow-cobalt transition-all duration-500">
                <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center text-brand-600 shadow-sm">
                  <Lock size={32} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{t('landing.features.precision.title')}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {t('landing.features.precision.desc')}
                  </p>
                </div>
                <div className="mt-auto space-y-4">
                  {[75, 45, 90].map((width, i) => (
                    <div key={i} className="h-1.5 w-full bg-brand-600/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 rounded-full" style={{ width: `${width}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="md:col-span-4 bg-surface-container-low p-12 rounded-[40px] flex flex-col gap-8 group border border-surface-container-highest hover:bg-surface-container transition-all duration-500">
                <div className="w-16 h-16 bg-brand-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-brand-600/20">
                  <LineChart size={32} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{t('landing.features.efficiency.title')}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {t('landing.features.efficiency.desc')}
                  </p>
                </div>
              </div>

              {/* Feature Card 4 - Large Row */}
              <div className="md:col-span-8 bg-surface-container-lowest p-12 rounded-[40px] flex items-center gap-12 group shadow-premium border border-transparent hover:border-brand-600/10 transition-all duration-500">
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 bg-brand-600/5 rounded-[20px] flex items-center justify-center text-brand-600">
                    <CloudCog size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">{t('landing.infrastructure.title')}</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed">
                    {t('landing.infrastructure.desc')}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:gap-3 transition-all">
                    {t('common.viewMore')}
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="hidden lg:block w-1/3 aspect-square bg-surface-container rounded-[32px] overflow-hidden relative">
                   <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    alt="Infrastructure"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quantifiable Authority (Dark Section) */}
        <section className="py-32 bg-brand-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-600/5 mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">{t('landing.authority.title')}</h2>
              <p className="text-slate-400 text-xl leading-relaxed max-w-lg">
                {t('landing.authority.desc')}
              </p>
              <div className="space-y-10 pt-4">
                {[
                  { icon: Zap, title: t('landing.authority.instantFailover.title'), desc: t('landing.authority.instantFailover.desc') },
                  { icon: LineChart, title: t('landing.authority.predictiveAnalysis.title'), desc: t('landing.authority.predictiveAnalysis.desc') }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-600 border border-white/10 group-hover:bg-brand-600 group-hover:text-white transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0D1B2E] p-10 rounded-[48px] shadow-2xl border border-white/10 relative">
               <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t('landing.authority.liveThroughput')}</span>
                <div className="flex gap-1.5 font-mono text-[10px] items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                  <span className="text-brand-600">{t('landing.authority.live')}</span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-64 lg:h-80">
                {[45, 60, 40, 85, 30, 95, 70, 55, 80, 65, 50, 90].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-800 w-full rounded-full transition-all duration-700 hover:bg-brand-600 cursor-pointer"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
              <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-2 gap-10">
                <div className="space-y-1">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('common.capacity')}</p>
                  <p className="text-3xl font-bold">12.4 PB/s</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('landing.authority.systemStatus')}</p>
                  <p className="text-3xl font-bold text-[#00FF85]">{t('landing.authority.operational')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto rounded-[60px] p-16 lg:p-24 bg-surface-container relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/5 skew-x-12 translate-x-1/4 -z-10 transition-transform duration-1000 group-hover:translate-x-1/3"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
              <div className="max-w-xl space-y-8">
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tight lowercase first-letter:uppercase">
                  {t('landing.ctaTitle')}
                </h2>
                <p className="text-on-surface-variant text-xl leading-relaxed">
                  {t('landing.ctaDesc')}
                </p>
                <div className="flex flex-wrap gap-5">
                  <button className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold shadow-xl shadow-brand-600/30 hover:scale-[0.98] transition-all flex items-center gap-3">
                    {t('landing.ctaQuoteButton')}
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
              <div className="w-72 h-72 lg:w-96 lg:h-96 bg-white/50 backdrop-blur-3xl rounded-[64px] border border-white p-12 rotate-6 group-hover:rotate-0 transition-all duration-1000 shadow-premium">
                <div className="w-full h-full border-2 border-dashed border-brand-600/20 rounded-[40px] flex flex-col items-center justify-center gap-6 text-brand-600/30">
                  <Cpu size={80} className="animate-spin-slow" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">{t('landing.project.commandCenter')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};


