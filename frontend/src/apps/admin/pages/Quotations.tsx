import React, { useState } from 'react';
import { 
  Building2, 
  Warehouse, 
  Home, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useCreateQuotation } from '../../../shared/hooks/useQuotations';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Quotations = () => {
  const { t } = useTranslation();
  
  const steps = [
    { id: 1, title: t('quotations.steps.type'), description: t('quotations.steps.typeDesc') },
    { id: 2, title: t('quotations.steps.details'), description: t('quotations.steps.detailsDesc') },
    { id: 3, title: t('quotations.steps.review'), description: t('quotations.steps.reviewDesc') }
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState<'Industrial' | 'Commercial' | 'Residential' | null>(null);
  const [reference, setReference] = useState('');
  
  const navigate = useNavigate();
  const { mutate: createQuotation, isPending } = useCreateQuotation();

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    createQuotation(
      { projectName: projectType || 'Misc Project', description: reference },
      {
        onSuccess: () => {
          navigate('/admin/dashboard');
        }
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">{t('quotations.wizardTitle')}</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('quotations.wizardSubtitle')}</p>
      </header>

      {/* Stepper */}
      <div className="flex items-center justify-between relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0"></div>
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 group">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 border-2",
              currentStep === step.id ? "bg-orange-500 text-white border-orange-500 shadow-xl shadow-orange-500/30 scale-110" : 
              currentStep > step.id ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-400 border-gray-100 group-hover:border-orange-200"
            )}>
              {currentStep > step.id ? <CheckCircle2 size={24} /> : step.id}
            </div>
            <div className="text-center hidden sm:block">
              <p className={cn(
                "text-xs font-black uppercase tracking-widest",
                currentStep === step.id ? "text-orange-500" : "text-gray-400"
              )}>{step.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50 p-12 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">{t('quotations.selection.title')}</h3>
                <p className="text-gray-500">{t('quotations.selection.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'Industrial', icon: Warehouse, label: t('quotations.selection.industrial'), desc: t('quotations.selection.industrialDesc') },
                  { id: 'Commercial', icon: Building2, label: t('quotations.selection.commercial'), desc: t('quotations.selection.commercialDesc') },
                  { id: 'Residential', icon: Home, label: t('quotations.selection.residential'), desc: t('quotations.selection.residentialDesc') }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={cn(
                      "p-8 rounded-[32px] border-2 text-left transition-all duration-300 group flex flex-col gap-4",
                      projectType === type.id 
                        ? "bg-orange-500 border-orange-500 shadow-2xl shadow-orange-500/30 text-white" 
                        : "bg-gray-50 border-transparent hover:border-orange-200 text-gray-900"
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                      projectType === type.id ? "bg-white/20" : "bg-white group-hover:bg-orange-50"
                    )}>
                      <type.icon size={32} className={cn(
                        "transition-colors",
                        projectType === type.id ? "text-white" : "text-gray-400 group-hover:text-orange-500"
                      )} />
                    </div>
                    <div>
                      <p className="text-xl font-black uppercase tracking-tight italic">{type.label}</p>
                      <p className={cn(
                        "text-xs mt-1 font-medium",
                        projectType === type.id ? "text-white/80" : "text-gray-500"
                      )}>{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">{t('quotations.steps.details')}</h3>
                <p className="text-gray-500">{t('quotations.form.referencePlaceholder')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} />
                    {t('quotations.form.reference')}
                  </label>
                  <input 
                    type="text" 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder={t('quotations.form.referencePlaceholder')} 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} />
                    {t('quotations.form.surface')}
                  </label>
                  <input 
                    type="number" 
                    placeholder={t('quotations.form.surfacePlaceholder')} 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} />
                    {t('quotations.form.deadline')}
                  </label>
                  <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold appearance-none">
                    <option>{t('quotations.form.deadlines.immediate')}</option>
                    <option>{t('quotations.form.deadlines.medium')}</option>
                    <option>{t('quotations.form.deadlines.long')}</option>
                    <option>{t('quotations.form.deadlines.planning')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    {t('quotations.form.priority')}
                  </label>
                  <div className="flex gap-2">
                    {[
                      { key: 'low', label: t('quotations.form.priorities.low') },
                      { key: 'medium', label: t('quotations.form.priorities.medium') },
                      { key: 'high', label: t('quotations.form.priorities.high') }
                    ].map((p) => (
                      <button key={p.key} className="flex-1 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:bg-white hover:border-orange-200 hover:text-orange-500 transition-all">
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">{t('quotations.review.title')}</h3>
                <p className="text-gray-500 max-w-md">{t('quotations.review.subtitle')}</p>
              </div>
              
              <div className="w-full max-w-md bg-gray-50 rounded-3xl p-8 text-left space-y-4 border border-gray-100">
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tipo de Proyecto</span>
                  <span className="text-sm font-black text-gray-900 uppercase italic">{projectType || 'No Seleccionado'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Referencia</span>
                  <span className="text-sm font-black text-gray-900 uppercase italic">{reference || 'No definida'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Plazo</span>
                  <span className="text-sm font-black text-gray-900 uppercase italic">Mediano Plazo</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black uppercase tracking-widest italic text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center gap-3 disabled:opacity-0"
          >
            <ArrowLeft size={20} />
            {t('common.back')}
          </button>
          <button 
            onClick={currentStep === steps.length ? handleSubmit : nextStep}
            disabled={isPending}
            className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest italic hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30 flex items-center gap-3 group disabled:opacity-50"
          >
            {isPending ? t('quotations.review.sending') : currentStep === steps.length ? t('quotations.review.submit') : t('common.continue')}
            {!isPending && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
};

