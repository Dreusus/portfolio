'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useTranslation } from '@/data/i18n';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
  rating: number;
}

const TestimonialCard = ({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-gradient-to-br from-primary/30 to-secondary/20 rounded-2xl p-6 md:p-8',
        'border border-primary/20 shadow-lg backdrop-blur-sm',
        'transition-all duration-300',
        isActive ? 'ring-2 ring-icon-accent/50' : ''
      )}
    >
      <Quote className="w-10 h-10 text-icon-accent/30 mb-4" />

      <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-icon-accent to-secondary flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = t.testimonials?.items || [
    {
      name: 'Алексей Смирнов',
      role: 'Tech Lead',
      company: 'Leads.tech',
      text: 'Андрей — профессионал своего дела. Его автотесты сэкономили нам сотни часов ручного тестирования. Рекомендую!',
      rating: 5,
    },
    {
      name: 'Мария Иванова',
      role: 'Product Manager',
      company: 'IT Finance',
      text: 'Отличный QA-инженер с глубоким пониманием процессов разработки. Всегда находит критические баги до релиза.',
      rating: 5,
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Senior Developer',
      company: 'Leads.tech',
      text: 'Работа с Андреем — это всегда качественный результат. Его тесты стабильны и покрывают все edge-кейсы.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="w-full px-3 sm:px-5 py-12 md:py-20 bg-colored-background">
      <div className="w-full max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.testimonials?.title || 'Отзывы'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.testimonials?.subtitle || 'Что коллеги говорят о работе со мной'}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isActive={true}
          />

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-primary/50 hover:bg-primary text-foreground transition-colors duration-200 hover:shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'bg-icon-accent w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-primary/50 hover:bg-primary text-foreground transition-colors duration-200 hover:shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
