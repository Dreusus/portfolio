'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/data/i18n';
import { Briefcase, Bug, Code, Coffee } from 'lucide-react';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

const StatItem = ({ value, suffix = '', label, icon, delay }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center p-6 bg-gradient-to-br from-primary/50 to-secondary/30 rounded-2xl hover:shadow-lg transition-shadow duration-300"
    >
      <div className="text-icon-accent mb-3">{icon}</div>
      <div className="text-4xl sm:text-5xl font-bold text-foreground">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 text-center">{label}</div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: 3,
      suffix: '+',
      label: t.stats?.years || 'Года опыта',
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      value: 500,
      suffix: '+',
      label: t.stats?.tests || 'Автотестов',
      icon: <Code className="w-8 h-8" />,
    },
    {
      value: 1000,
      suffix: '+',
      label: t.stats?.bugs || 'Багов найдено',
      icon: <Bug className="w-8 h-8" />,
    },
    {
      value: 500,
      suffix: '+',
      label: t.stats?.coffee || 'Чашек кофе',
      icon: <Coffee className="w-8 h-8" />,
    },
  ];

  return (
    <section className="w-full px-3 sm:px-5 py-12 md:py-20 bg-gradient-to-b from-background to-colored-background">
      <div className="w-full max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.stats?.title || 'Статистика'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.stats?.subtitle || 'Цифры, которые говорят сами за себя'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
