import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Layers,
  Zap,
  Search,
  Download
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  LineChart,
  Line
} from 'recharts';
import { CHART_DATA, RECENT_ACTIVITY } from '../../../shared/constants';
import { cn } from '../../../shared/lib/utils';
import { useStats } from '../../../shared/hooks/useStats';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { data: stats, isLoading } = useStats();
  const { t } = useTranslation();

  const metrics = [
    { 
      label: t('dashboard.metrics.revenue'), 
      value: `$${stats?.revenue?.toLocaleString() || 0}`, 
      change: 12, 
      trend: 'up',
      sparkData: [40, 35, 50, 45, 60, 55, 70]
    },
    { 
      label: t('dashboard.metrics.projects'), 
      value: stats?.quotations || 0, 
      change: 5, 
      trend: 'up',
      sparkData: [20, 25, 22, 30, 28, 35, 32]
    },
    { 
      label: t('dashboard.metrics.orders'), 
      value: stats?.orders || 0, 
      change: -2, 
      trend: 'down',
      sparkData: [50, 48, 45, 42, 44, 40, 38]
    },
    { 
      label: t('dashboard.metrics.hardware'), 
      value: stats?.products || 0, 
      change: 24, 
      trend: 'up',
      sparkData: [10, 15, 12, 18, 22, 25, 30]
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Editorial Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 leading-none">
            {t('dashboard.title')}
          </h1>
          <div className="flex items-center gap-2 mt-3 text-slate-500 font-medium text-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('dashboard.subtitle')} • 
            <span className="flex items-center gap-1">
              <Activity size={14} className="text-blue-600" />
              Surgical analysis active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} />
            {t('dashboard.exportReport')}
          </button>
          <button className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
            Provision New Asset
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Metric Cards */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-full py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !ih-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![rect(0,0,0,0)] italic font-bold">Loading...</span>
              </div>
              <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t('dashboard.syncingMetrics')}</p>
            </div>
          ) : metrics.map((metric) => (
            <div key={metric.label} className="relative group overflow-hidden bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">{metric.label}</span>
                <div className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  metric.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">{metric.value}</div>
                  <div className={cn(
                    "text-[10px] font-extrabold mt-1",
                    metric.change > 0 ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}% <span className="text-slate-300 font-medium ml-1">vs L30D</span>
                  </div>
                </div>
                <div className="w-16 h-10 -mr-2 -mb-1 opacity-40 group-hover:opacity-100 transition-opacity">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.sparkData.map((v, i) => ({ v, i }))}>
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        stroke={metric.trend === 'up' ? "#10b981" : "#f43f5e"} 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Intelligence feed (Right Panel) */}
        <div className="col-span-12 lg:col-span-4 lg:row-span-2 bg-[#f8fafc] rounded-3xl p-6 border border-slate-100/50 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Zap size={180} className="text-blue-600" />
          </div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">{t('dashboard.recentActivity')}</h3>
            <button className="text-[10px] font-black text-blue-600 hover:underline">{t('dashboard.viewAll')}</button>
          </div>

          <div className="flex-1 space-y-7 relative z-10">
            {RECENT_ACTIVITY.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {activity.action}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                    {activity.user} • {activity.project}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/60 relative z-10">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-blue-600 tracking-[0.2em] uppercase underline decoration-2 underline-offset-4">AI Insight</span>
                <Layers size={14} className="text-slate-300" />
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
                Predictive analysis suggests a 14% increase in infrastructure demand in the LATAM region over the next 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Surgical Infrastructure Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden h-[450px]">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">
                {t('dashboard.trendingAnalysis')}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Real-time throughput surgical mapping</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.5)]"></span>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{t('sidebar.orders')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('sidebar.quotations')}</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="surgicalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    borderRadius: '12px', 
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '12px', color: '#0f172a' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#2563eb" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#surgicalGradient)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="quotes" 
                  stroke="#e2e8f0" 
                  strokeWidth={1.5}
                  fillOpacity={0} 
                  strokeDasharray="4 4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Infrastructure Table */}
        <div className="col-span-12 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Active Infrastructure Clusters</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Live status of global deployment zones</p>
            </div>
            <div className="relative group w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-[11px] font-bold text-slate-900 focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc] text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Resource Identity</th>
                  <th className="px-8 py-4">Deployment Zone</th>
                  <th className="px-8 py-4">Network Status</th>
                  <th className="px-8 py-4 text-right">Operational Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: 'v-delta-502', region: 'USE-1 (Virginia)', status: 'ACTIVE', load: '82.4%', color: 'blue' },
                  { id: 'v-gamma-104', region: 'EUC-1 (Frankfurt)', status: 'SCALING', load: '45.1%', color: 'amber' },
                  { id: 'v-sigma-990', region: 'APN-1 (Tokyo)', status: 'NOMINAL', load: '12.8%', color: 'emerald' },
                ].map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                          <Layers size={14} />
                        </div>
                        <span className="text-xs font-black text-slate-900">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">{item.region}</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest",
                        item.color === 'blue' ? "bg-blue-50 text-blue-600" :
                        item.color === 'amber' ? "bg-amber-50 text-amber-600" :
                        "bg-emerald-50 text-emerald-600"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-xs font-black text-slate-900 tabular-nums">{item.load}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

