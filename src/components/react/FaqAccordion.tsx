import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const faqs = [
  {
    question: '¿Cuánto cuesta Scalo?',
    answer: 'Durante el piloto, el acceso es completamente gratuito. Cuando Scalo lance oficialmente, operará bajo un modelo de suscripción mensual accesible para pymes. Las empresas del piloto tendrán precio preferencial garantizado.',
  },
  {
    question: '¿Necesito un equipo técnico para usar Scalo?',
    answer: 'No. Scalo está diseñado para founders y equipos de negocio sin conocimientos técnicos. La plataforma se conecta con las herramientas que ya usas y te entrega insights en lenguaje claro, sin necesidad de analistas o desarrolladores.',
  },
  {
    question: '¿Qué hago con mis datos? ¿Son seguros?',
    answer: 'Tus datos son tuyos. Scalo los procesa de forma segura y encriptada, nunca los comparte con terceros. Solo tú y tu equipo autorizado tienen acceso a la información de tu empresa.',
  },
  {
    question: '¿Para qué tipo de empresas es Scalo?',
    answer: 'Scalo está pensado para pymes y startups que quieren tomar mejores decisiones con sus datos pero no tienen un equipo de BI dedicado. Si vendes, operas o creces con datos dispersos en Excel, CRM o ERP, Scalo es para ti.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'rounded-md overflow-hidden border transition-colors duration-200',
              isOpen
                ? 'bg-white border-black/10'
                : 'bg-[#f5f5f5] border-black/[0.08]'
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex min-h-[48px] w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-3.5"
              aria-expanded={isOpen}
            >
              <span className="pr-2 font-outfit text-sm font-bold text-deep-navy md:text-[15px]">
                {faq.question}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-deep-navy/70" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-deep-navy/55" />
              )}
            </button>
            <div
              className={cn(
                'grid transition-all duration-250 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 font-outfit text-sm font-normal leading-relaxed text-deep-navy/70 md:px-5 md:pb-3.5 md:text-[13px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
