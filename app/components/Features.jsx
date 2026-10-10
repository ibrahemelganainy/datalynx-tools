'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faServer, 
  faBoltLightning, 
  faLock, 
  faCodeBranch
} from '@fortawesome/free-solid-svg-icons';

import { useLocale } from './LocaleProvider';

export default function Features() {
  const { t, dictionary } = useLocale();

  const features = [
    {
      id: 1,
      title: dictionary.features.items[0].title,
      desc: dictionary.features.items[0].desc,
      icon: faServer,
      iconColor: "text-emerald-400",
      bgClass: "bg-emerald-400/10",
      borderClass: "group-hover:border-emerald-400/50"
    },
    {
      id: 2,
      title: dictionary.features.items[1].title,
      desc: dictionary.features.items[1].desc,
      icon: faLock,
      iconColor: "text-blue-400",
      bgClass: "bg-blue-400/10",
      borderClass: "group-hover:border-blue-400/50"
    },
    {
      id: 3,
      title: dictionary.features.items[2].title,
      desc: dictionary.features.items[2].desc,
      icon: faBoltLightning,
      iconColor: "text-amber-400",
      bgClass: "bg-amber-400/10",
      borderClass: "group-hover:border-amber-400/50"
    },
    {
      id: 4,
      title: dictionary.features.items[3].title,
      desc: dictionary.features.items[3].desc,
      icon: faCodeBranch,
      iconColor: "text-purple-400",
      bgClass: "bg-purple-400/10",
      borderClass: "group-hover:border-purple-400/50"
    }
  ];

  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* عنوان القسم */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              {t('features.titleBefore')} <span className="text-datalynx-primary">{t('features.titleHighlight')}</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {t('features.description')}
            </p>
          </motion.div>
        </div>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 transition-all duration-300 hover:-translate-y-2 ${feature.borderClass} hover:shadow-2xl`}
            >
              {/* إضاءة خلفية ناعمة */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* الأيقونة */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${feature.bgClass} ${feature.iconColor}`}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>

              {/* النص */}
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}