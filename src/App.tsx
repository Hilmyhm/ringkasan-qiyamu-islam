import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Moon,
  Sun,
  Type,
  X,
} from 'lucide-react';
import { SlidesView, SLIDES } from './components/SlidesView';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const goToSlide = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setCurrentSlide(clamped);
    setIsIndexOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation adapted for RTL presentation flow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape' && isIndexOpen) {
        setIsIndexOpen(false);
        return;
      }
      if (e.key === 'ArrowLeft') {
        nextSlide();
      } else if (e.key === 'ArrowRight') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIndexOpen, nextSlide, prevSlide]);

  const slideMeta = SLIDES[currentSlide];
  const progressPercent = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-primary)' }}
    >
      {/* Top Bar Contract: Exactly 3 Zones separated by gap-8 */}
      <header
        className="border-b px-5 md:px-10 py-3.5"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className="font-display font-bold text-lg md:text-xl whitespace-nowrap shrink-0 cursor-pointer text-right"
            style={{ color: 'var(--text-primary)' }}
          >
            القيم الإسلامية
          </button>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {[
              { label: 'المفهوم والمصادر', idx: 1 },
              { label: 'أنواع القيم', idx: 3 },
              { label: 'الخصائص والأسس', idx: 8 },
              { label: 'الأهمية والتقويم', idx: 10 },
            ].map((navItem) => {
              const isInRange =
                (navItem.idx === 1 && (currentSlide === 1 || currentSlide === 2)) ||
                (navItem.idx === 3 && currentSlide >= 3 && currentSlide <= 7) ||
                (navItem.idx === 8 && (currentSlide === 8 || currentSlide === 9)) ||
                (navItem.idx === 10 && currentSlide >= 10);

              return (
                <button
                  key={navItem.label}
                  type="button"
                  onClick={() => goToSlide(navItem.idx)}
                  className="whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:opacity-80 py-1 border-b-2"
                  style={{
                    color: isInRange ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    borderColor: isInRange ? 'var(--accent-primary)' : 'transparent',
                  }}
                >
                  {navItem.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setIsIndexOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-medium text-white whitespace-nowrap shrink-0 cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <LayoutGrid className="w-4 h-4" />
              فهرس الشرائح
            </button>
          </div>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <main className="flex-1 px-5 md:px-10 py-6 md:py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Workspace Presentation Toolbar & Progress */}
          <div
            className="rounded-xl border px-4 md:px-5 py-3 flex flex-wrap items-center justify-between gap-4"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <span
                className="font-mono tabular-nums text-sm font-semibold whitespace-nowrap"
                style={{ color: 'var(--accent-primary)' }}
              >
                الشريحة {currentSlide + 1} من {SLIDES.length}
              </span>
              <span className="hidden sm:inline text-sm" style={{ color: 'var(--text-muted)' }}>
                ·
              </span>
              <span className="hidden sm:inline text-sm font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
                {slideMeta.unitLabel}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Font Comfort Toggle */}
              <button
                type="button"
                onClick={() => setLargeText((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: largeText ? 'var(--accent-soft)' : 'var(--bg-canvas)',
                  borderColor: largeText ? 'var(--accent-primary)' : 'var(--border-hairline)',
                  color: largeText ? 'var(--accent-primary)' : 'var(--text-secondary)',
                }}
              >
                <Type className="w-4 h-4" />
                {largeText ? 'خط مكبّر' : 'خط مريح'}
              </button>

              {/* Light / Dark Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsDark((prev) => !prev)}
                aria-label="تبديل المظهر الفاتح والداكن"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-hairline)',
                  color: 'var(--text-secondary)',
                }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? 'نهاري' : 'ليلي'}
              </button>
            </div>
          </div>

          {/* Slim Progress Track */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface-muted)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: 'var(--accent-primary)',
              }}
            />
          </div>

          {/* Slide Header */}
          {currentSlide !== 0 && (
            <div className="space-y-2 pt-1">
              <p className="text-sm md:text-base font-medium" style={{ color: 'var(--accent-primary)' }}>
                {slideMeta.unitLabel}
              </p>
              <h1
                className="font-display font-bold text-2xl md:text-4xl leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {slideMeta.title}
              </h1>
              <p
                className={`${largeText ? 'text-xl' : 'text-lg'} leading-relaxed max-w-4xl`}
                style={{ color: 'var(--text-secondary)' }}
              >
                {slideMeta.subtitle}
              </p>
            </div>
          )}

          {/* Animated Slide Content */}
          <AnimatePresence mode="wait">
            <motion.section
              key={slideMeta.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 pb-6"
            >
              <SlidesView
                currentSlide={currentSlide}
                onSelectSlide={goToSlide}
                largeText={largeText}
              />
            </motion.section>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Slide Controls */}
      <footer
        className="border-t px-5 md:px-10 py-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-display font-medium text-base transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
            }}
          >
            <ArrowRight className="w-4 h-4" />
            الشريحة السابقة
          </button>

          {/* Compact Slide Dot Indicators */}
          <div className="hidden sm:flex items-center gap-1.5" aria-label="التنقل بين الشرائح">
            {SLIDES.map((s) => {
              const active = s.index === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(s.index)}
                  title={s.title}
                  aria-label={`الانتقال إلى ${s.title}`}
                  className="h-2.5 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    width: active ? '24px' : '10px',
                    backgroundColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-medium text-base text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            الشريحة التالية
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Slide Index Modal / Grid */}
      {isIndexOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(10, 16, 15, 0.65)' }}
          onClick={() => setIsIndexOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border p-6 md:p-8 space-y-6"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-hairline)' }}>
              <div>
                <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                  فهرس شرائح العرض التقديمي
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  اختر أي شريحة للانتقال المباشر إليها (يمكنك أيضاً استخدام الأسهم للتنقل)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsIndexOpen(false)}
                aria-label="إغلاق الفهرس"
                className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-hairline)',
                  color: 'var(--text-primary)',
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SLIDES.map((s) => {
                const isCurrent = s.index === currentSlide;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToSlide(s.index)}
                    className="text-right rounded-xl border p-4 cursor-pointer transition-colors space-y-1.5"
                    style={{
                      backgroundColor: isCurrent ? 'var(--accent-soft)' : 'var(--bg-canvas)',
                      borderColor: isCurrent ? 'var(--accent-primary)' : 'var(--border-hairline)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-medium">
                      <span style={{ color: 'var(--accent-primary)' }}>{s.unitLabel}</span>
                      <span className="font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
                        {s.index + 1} / {SLIDES.length}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>
                      {s.title}
                    </h3>
                    <p className="text-sm line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                      {s.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
