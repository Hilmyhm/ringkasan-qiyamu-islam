import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  BookOpen,
  RotateCw,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Target,
  Quote,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  ValueItem,
  FlashcardItem,
  QuizQuestion,
  VerbatimSource,
  UnitObjectives,
  CategoryDiffItem,
  IstinbathItem,
} from '../data/presentationData';

// ==========================================
// 1. زر النص الأصلي من المقرر + النسخ الفوري للبحث
// ==========================================
interface SourceQuoteButtonProps {
  sources: VerbatimSource[];
  label?: string;
}

export const SourceQuoteButton: React.FC<SourceQuoteButtonProps> = ({
  sources,
  label = 'النص الأصلي من المقرر',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!sources || sources.length === 0) return null;

  const pageLabel =
    sources.length === 1
      ? sources[0].page
      : `${sources[0].page} (${sources.length} مواضع)`;

  const handleCopy = async (text: string, idx: number) => {
    const cleanText = text.replace(/[«»]/g, '').trim();
    try {
      await navigator.clipboard.writeText(cleanText);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = cleanText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedIdx(idx);
    window.setTimeout(() => {
      setCopiedIdx((prev) => (prev === idx ? null : prev));
    }, 1600);
  };

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs md:text-sm font-display font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
        style={{
          backgroundColor: isOpen ? 'var(--accent-gold-soft)' : 'var(--bg-surface-muted)',
          borderColor: isOpen ? 'var(--accent-gold)' : 'var(--border-hairline)',
          color: isOpen ? 'var(--accent-gold)' : 'var(--text-secondary)',
        }}
      >
        <Quote className="w-3.5 h-3.5 shrink-0" />
        <span>
          {label} · <span className="font-mono tabular-nums">{pageLabel}</span>
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 shrink-0 transition-transform duration-150"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isOpen && (
        <div
          className="mt-2.5 rounded-xl border p-4 space-y-3"
          style={{
            backgroundColor: 'var(--accent-gold-soft)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          {sources.map((src, idx) => {
            const isCopied = copiedIdx === idx;
            return (
              <div
                key={idx}
                className={idx > 0 ? 'pt-3 border-t space-y-2' : 'space-y-2'}
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    {src.context ? `${src.context} · ` : ''}
                    <span className="font-mono tabular-nums font-bold">{src.page}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopy(src.excerpt, idx)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer transition-colors duration-150 whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: isCopied ? 'var(--accent-primary)' : 'var(--border-hairline)',
                      color: isCopied ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>نسخ للبحث</span>
                      </>
                    )}
                  </button>
                </div>

                <p
                  className="font-quran text-[1.16rem] md:text-[1.22rem] leading-[1.9]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {src.excerpt}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. لوحة أهداف الدرس الرسمية لكل وحدة
// ==========================================
interface AhdafPanelProps {
  unitObj: UnitObjectives;
  largeText?: boolean;
}

export const AhdafPanel: React.FC<AhdafPanelProps> = ({ unitObj, largeText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-xl border transition-colors duration-150"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: isOpen ? 'var(--accent-primary)' : 'var(--border-hairline)',
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-right cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Target className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-primary)' }} />
          <div className="min-w-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
              أهداف الدرس ({unitObj.unitNumber})
            </span>
            <span className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
              {unitObj.objectives.length} أهداف معتمدة · <span className="font-mono tabular-nums">{unitObj.page}</span>
            </span>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent-primary)' }}
        >
          <span>{isOpen ? 'إخفاء الأهداف' : 'عرض الأهداف'}</span>
          <ChevronDown
            className="w-4 h-4 transition-transform duration-150"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className="px-5 pb-4 pt-3 border-t space-y-2"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <p className="text-xs md:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            الأهداف التعليمية المعتمدة في المقرر ({unitObj.unitName} · {unitObj.page}):
          </p>
          <ol className="space-y-2">
            {unitObj.objectives.map((goal, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2.5 ${largeText ? 'text-[1.12rem]' : 'text-[0.98rem]'} leading-relaxed`}
                style={{ color: 'var(--text-primary)' }}
              >
                <span
                  className="font-mono tabular-nums text-xs font-bold mt-1.5 shrink-0"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  0{idx + 1}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. لوحة التمييز بين أنواع القيم الخمسة (الوحدة الثالثة)
// ==========================================
interface CategoryComparisonPanelProps {
  categories: CategoryDiffItem[];
  onJumpToSlide?: (slideIdx: number) => void;
  currentSlide?: number;
  largeText?: boolean;
}

export const CategoryComparisonPanel: React.FC<CategoryComparisonPanelProps> = ({
  categories,
  onJumpToSlide,
  currentSlide,
  largeText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-xl border transition-colors duration-150"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: isOpen ? 'var(--accent-gold)' : 'var(--border-hairline)',
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-right cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Scale className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-gold)' }} />
          <div className="min-w-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
              لوحة التمييز بين أنواع القيم الخمسة (١٥ قيمة)
            </span>
            <span className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
              الخلقية · الحضارية · الاقتصادية · الاجتماعية · النفسية (ص ١٠ و ٧٠)
            </span>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent-gold)' }}
        >
          <span>{isOpen ? 'إغلاق المقارنة' : 'قارن الأنواع الخمسة'}</span>
          <ChevronDown
            className="w-4 h-4 transition-transform duration-150"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className="px-5 pb-5 pt-4 border-t space-y-4"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <p className={largeText ? 'text-[1.1rem]' : 'text-[0.98rem]'} style={{ color: 'var(--text-secondary)' }}>
            صنّفت القيم الإسلامية إلى <strong>خمسة أنواع رئيسية</strong> تضم <strong>١٥ قيمة</strong>؛ ويوضح الجدول الآتي الفارق الجوهري لكل نوع ومجاله التطبيقي:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categories.map((cat) => {
              const isCurrent = currentSlide === cat.slideTarget;
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border p-4 flex flex-col justify-between gap-3"
                  style={{
                    backgroundColor: isCurrent ? 'var(--accent-soft)' : 'var(--bg-canvas)',
                    borderColor: isCurrent ? 'var(--accent-primary)' : 'var(--border-hairline)',
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                        {cat.name}
                      </h4>
                      <span className="font-mono tabular-nums text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                        {cat.pages}
                      </span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                      القيم: {cat.valuesList}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {cat.definition}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      <strong>وجه التمييز: </strong>
                      {cat.distinction}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <SourceQuoteButton sources={cat.sources} label="النص الأصلي" />
                    {onJumpToSlide && !isCurrent && (
                      <button
                        type="button"
                        onClick={() => onJumpToSlide(cat.slideTarget)}
                        className="inline-flex items-center gap-1.5 text-xs font-display font-semibold cursor-pointer hover:underline whitespace-nowrap"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        <span>الانتقال إلى شريحة هذا النوع</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. اللوحة القابلة للطي (للوحدة ١ و ٥ و ٦)
// ==========================================
interface ExpandablePanelProps {
  title: string;
  subtitle?: string;
  indexLabel?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
  title,
  subtitle,
  indexLabel,
  defaultOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-xl border transition-colors duration-150"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: isOpen ? 'var(--accent-primary)' : 'var(--border-hairline)',
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        <div className="flex items-start gap-3.5 min-w-0">
          {indexLabel && (
            <span
              className="font-mono tabular-nums text-sm font-semibold pt-1 shrink-0"
              style={{ color: 'var(--accent-primary)' }}
            >
              {indexLabel}
            </span>
          )}
          <div className="min-w-0">
            <h3
              className="font-display font-semibold text-[1.125rem] leading-snug"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h3>
            {subtitle && !isOpen && (
              <p
                className="mt-1 text-[0.95rem] leading-relaxed line-clamp-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <span
          className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-150"
          style={{
            backgroundColor: isOpen ? 'var(--accent-soft)' : 'var(--bg-surface-muted)',
            color: isOpen ? 'var(--accent-primary)' : 'var(--text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>

      {isOpen && (
        <div
          className="px-5 pb-5 pt-2 border-t text-[1.0625rem] leading-[1.85]"
          style={{
            borderColor: 'var(--border-hairline)',
            color: 'var(--text-secondary)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. اقتباس النصوص والشواهد العلمية
// ==========================================
interface ScholarQuoteProps {
  text: string;
  source?: string;
}

export const ScholarQuote: React.FC<ScholarQuoteProps> = ({ text, source }) => {
  return (
    <blockquote
      className="rounded-xl border px-5 py-4"
      style={{
        backgroundColor: 'var(--accent-gold-soft)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <p
        className="font-quran text-[1.25rem] leading-[1.95]"
        style={{ color: 'var(--text-primary)' }}
      >
        {text}
      </p>
      {source && (
        <footer
          className="mt-2 text-sm font-medium"
          style={{ color: 'var(--accent-gold)' }}
        >
          — {source}
        </footer>
      )}
    </blockquote>
  );
};

// ==========================================
// 6. مستكشف القيم التفاعلي (للقيم الـ ١٥ في الوحدة ٣)
// ==========================================
interface ValueExplorerProps {
  values: ValueItem[];
  largeText: boolean;
}

export const ValueExplorer: React.FC<ValueExplorerProps> = ({ values, largeText }) => {
  const [activeId, setActiveId] = useState<string>(values[0].id);
  const [openSection, setOpenSection] = useState<'definition' | 'dimensions' | 'evidence' | 'impacts'>('definition');

  useEffect(() => {
    if (!values.some((v) => v.id === activeId)) {
      setActiveId(values[0].id);
      setOpenSection('definition');
    }
  }, [values, activeId]);

  const activeValue = values.find((v) => v.id === activeId) || values[0];
  const bodySize = largeText ? 'text-[1.22rem]' : 'text-[1.08rem]';

  const handleSelectValue = (id: string) => {
    setActiveId(id);
    setOpenSection('definition');
  };

  return (
    <div className="space-y-6">
      {/* Selector Tabs for the values in this category */}
      <div
        className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border"
        style={{
          backgroundColor: 'var(--bg-surface-muted)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        {values.map((val, idx) => {
          const isActive = val.id === activeValue.id;
          return (
            <button
              key={val.id}
              type="button"
              onClick={() => handleSelectValue(val.id)}
              className="flex-1 min-w-[140px] py-2.5 px-4 rounded-lg font-display font-medium text-base transition-colors duration-150 cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <span className="font-mono tabular-nums ml-2 opacity-75">0{idx + 1}</span>
              {val.name}
            </button>
          );
        })}
      </div>

      {/* Main Content Stage for the Active Value */}
      <div
        className="rounded-2xl border p-6 md:p-7 space-y-6"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div
          className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {activeValue.name}
          </h3>
          <span className="text-sm font-medium font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
            المرجع في المقرر: {activeValue.pages}
          </span>
        </div>

        {/* Clickable Sub-navigation inside the value */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { key: 'definition', label: 'التعريف والمعيار والإلزام' },
            { key: 'dimensions', label: 'المجالات والضوابط' },
            { key: 'evidence', label: 'الأدلة والشواهد' },
            { key: 'impacts', label: 'الآثار والثمرات' },
          ].map((tab) => {
            const selected = openSection === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setOpenSection(tab.key as typeof openSection)}
                className="py-2.5 px-3 rounded-lg border text-sm md:text-base font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: selected ? 'var(--accent-soft)' : 'var(--bg-surface-muted)',
                  borderColor: selected ? 'var(--accent-primary)' : 'var(--border-hairline)',
                  color: selected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Sub-pane */}
        <div className={`${bodySize} leading-[1.9] space-y-5`} style={{ color: 'var(--text-secondary)' }}>
          {openSection === 'definition' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="rounded-xl border p-5 space-y-2"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-primary)' }}>
                    المعنى اللغوي
                  </h4>
                  <p style={{ color: 'var(--text-primary)' }}>{activeValue.linguistic}</p>
                </div>

                <div
                  className="rounded-xl border p-5 space-y-2"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-primary)' }}>
                    المعنى الاصطلاحي
                  </h4>
                  <p style={{ color: 'var(--text-primary)' }}>{activeValue.terminology}</p>
                </div>
              </div>

              <SourceQuoteButton sources={activeValue.definitionSources} label="النص الأصلي (التعريف)" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div
                  className="rounded-xl border p-5 space-y-2"
                  style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
                >
                  <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-gold)' }}>
                    معيار القيمة وضابطها
                  </h4>
                  <p style={{ color: 'var(--text-primary)' }}>{activeValue.standard}</p>
                </div>

                <div
                  className="rounded-xl border p-5 space-y-2"
                  style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
                >
                  <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-gold)' }}>
                    مصدر الإلزام بالقيمة
                  </h4>
                  <p style={{ color: 'var(--text-primary)' }}>{activeValue.obligationSource}</p>
                </div>
              </div>

              <SourceQuoteButton sources={activeValue.standardSources} label="النص الأصلي (المعيار والإلزام)" />
            </div>
          )}

          {openSection === 'dimensions' && (
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                {activeValue.dimensionsTitle}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeValue.dimensions.map((dim, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-4 space-y-1.5"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  >
                    <h5 className="font-display font-semibold text-[1.05rem]" style={{ color: 'var(--accent-primary)' }}>
                      {dim.title}
                    </h5>
                    <p className="text-[1rem] leading-[1.8]" style={{ color: 'var(--text-primary)' }}>
                      {dim.desc}
                    </p>
                  </div>
                ))}
              </div>
              <SourceQuoteButton sources={activeValue.dimensionsSources} label="النص الأصلي (المجالات والضوابط)" />
            </div>
          )}

          {openSection === 'evidence' && (
            <div className="space-y-4">
              {activeValue.evidence.map((ev, i) => (
                <ScholarQuote key={i} text={ev} />
              ))}
              {activeValue.salafQuote && (
                <ScholarQuote text={activeValue.salafQuote.text} source={activeValue.salafQuote.author} />
              )}
              <SourceQuoteButton sources={activeValue.evidenceSources} label="النص الأصلي (توثيق الأدلة)" />
            </div>
          )}

          {openSection === 'impacts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="rounded-xl border p-5 space-y-3"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-primary)' }}>
                    أولاً: آثارها على الفرد
                  </h4>
                  <ul className="space-y-2.5">
                    {activeValue.individualImpacts.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 mt-1.5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ color: 'var(--text-primary)' }}>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="rounded-xl border p-5 space-y-3"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-gold)' }}>
                    ثانياً: آثارها على المجتمع والإنسانية
                  </h4>
                  <ul className="space-y-2.5">
                    {activeValue.societalImpacts.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 mt-1.5 shrink-0" style={{ color: 'var(--accent-gold)' }} />
                        <span style={{ color: 'var(--text-primary)' }}>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <SourceQuoteButton sources={activeValue.impactSources} label="النص الأصلي (الآثار والثمرات)" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. بطاقات المراجعة 3D (الوحدة السابعة)
// ==========================================
interface FlashcardDeckProps {
  cards: FlashcardItem[];
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[currentIdx];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          انقر على البطاقة لقلبها وعرض الإجابة النموذجية
        </span>
        <span className="font-mono tabular-nums font-medium">
          {currentIdx + 1} / {cards.length}
        </span>
      </div>

      <div className="perspective-1000">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="relative w-full min-h-[250px] text-right cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-700 preserve-3d transition-transform duration-500"
          style={{
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 backface-hidden rounded-2xl border p-6 md:p-8 flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <div className="flex items-center justify-between text-sm" style={{ color: 'var(--accent-primary)' }}>
              <span>{card.category} · {card.reference}</span>
              <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                <RotateCw className="w-3.5 h-3.5" />
                اقلب البطاقة
              </span>
            </div>
            <p
              className="font-display text-xl md:text-2xl font-semibold leading-relaxed my-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {card.question}
            </p>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              سؤال للمراجعة السريعة
            </span>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border p-6 md:p-8 flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--accent-soft)',
              borderColor: 'var(--accent-primary)',
            }}
          >
            <div className="flex items-center justify-between text-sm" style={{ color: 'var(--accent-primary)' }}>
              <span>الإجابة الموثقة ({card.reference})</span>
              <span className="inline-flex items-center gap-1.5 text-xs">
                <RotateCw className="w-3.5 h-3.5" />
                العودة للسؤال
              </span>
            </div>
            <p
              className="text-[1.15rem] md:text-[1.25rem] font-medium leading-[1.9] my-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {card.answer}
            </p>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
              {card.category}
            </span>
          </div>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
            }}
          >
            <ArrowRight className="w-4 h-4" />
            البطاقة السابقة
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
            }}
          >
            البطاقة التالية
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <SourceQuoteButton sources={card.sources} label="النص الأصلي للبطاقة" />
      </div>
    </div>
  );
};

// ==========================================
// 8. اختبار التقويم السريع (الوحدة السابعة)
// ==========================================
interface InteractiveQuizProps {
  questions: QuizQuestion[];
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = questions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-5">
      <div
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-3.5"
        style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
      >
        <span className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          اختبر فهمك للمقرر ({answeredCount} من {questions.length} أسئلة مجابة)
        </span>
        <span className="font-mono tabular-nums font-bold text-base" style={{ color: 'var(--accent-primary)' }}>
          النتيجة: {score} / {questions.length}
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((q, qIndex) => {
          const picked = selectedAnswers[q.id];
          const hasPicked = picked !== undefined;
          const isCorrect = picked === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-xl border p-5 space-y-3.5"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display font-semibold text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-mono tabular-nums ml-2" style={{ color: 'var(--accent-primary)' }}>
                    0{qIndex + 1}.
                  </span>
                  {q.question}
                </p>
                <span className="font-mono tabular-nums text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {q.pageRef}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisPicked = picked === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let borderCol = 'var(--border-hairline)';
                  let bgCol = 'var(--bg-canvas)';
                  if (hasPicked) {
                    if (isThisCorrect) {
                      borderCol = 'var(--accent-primary)';
                      bgCol = 'var(--accent-soft)';
                    } else if (isThisPicked && !isThisCorrect) {
                      borderCol = '#dc2626';
                      bgCol = 'rgba(220, 38, 38, 0.08)';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      className="flex items-center justify-between gap-3 text-right rounded-lg border px-4 py-3 text-[1rem] transition-colors cursor-pointer"
                      style={{
                        backgroundColor: bgCol,
                        borderColor: borderCol,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span>{opt}</span>
                      {hasPicked && isThisCorrect && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />}
                      {hasPicked && isThisPicked && !isThisCorrect && <XCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {hasPicked && (
                <div
                  className="rounded-lg border px-4 py-3 text-[0.98rem] leading-relaxed space-y-2"
                  style={{
                    backgroundColor: isCorrect ? 'var(--accent-soft)' : 'var(--accent-gold-soft)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div>
                    <strong>{isCorrect ? 'إجابة صحيحة — ' : 'توضيح المقرر — '}</strong>
                    {q.explanation}
                  </div>
                  <SourceQuoteButton sources={q.sources} label="النص الأصلي للإجابة" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 9. معمل استنباط القيم من النصوص (الوحدة السابعة · ص ١٠٩)
// ==========================================
interface IstinbathExerciseProps {
  items: IstinbathItem[];
  largeText?: boolean;
}

export const IstinbathExercise: React.FC<IstinbathExerciseProps> = ({ items, largeText }) => {
  const [selected, setSelected] = useState<Record<string, number>>({});

  const answered = Object.keys(selected).length;
  const correctCount = items.reduce(
    (sum, item) => sum + (selected[item.id] === item.correctIndex ? 1 : 0),
    0
  );

  return (
    <div className="space-y-5">
      <div
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-3.5"
        style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
      >
        <div className="space-y-0.5">
          <p className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            تدريب استنباط القيم من القرآن والسنة وآثار السلف (أهداف الوحدة ٧ · ص ١٠٩)
          </p>
          <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
            اقرأ النص الأصلي واستخرج القيمة الإسلامية المستنبطة منه ({answered} من {items.length})
          </p>
        </div>
        <span className="font-mono tabular-nums font-bold text-base" style={{ color: 'var(--accent-primary)' }}>
          الإصابات: {correctCount} / {items.length}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const picked = selected[item.id];
          const hasPicked = picked !== undefined;
          const isCorrect = picked === item.correctIndex;

          return (
            <div
              key={item.id}
              className="rounded-xl border p-5 space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
                <span className="font-display font-semibold" style={{ color: 'var(--accent-gold)' }}>
                  <span className="font-mono tabular-nums ml-2" style={{ color: 'var(--accent-primary)' }}>
                    0{idx + 1}
                  </span>
                  {item.sourceType}
                </span>
                <span className="font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
                  المرجع: {item.page}
                </span>
              </div>

              <blockquote
                className="rounded-xl border px-5 py-3.5"
                style={{ backgroundColor: 'var(--accent-gold-soft)', borderColor: 'var(--border-hairline)' }}
              >
                <p
                  className={`font-quran ${largeText ? 'text-[1.35rem]' : 'text-[1.22rem]'} leading-[1.95]`}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.verbatimText}
                </p>
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.options.map((opt, optIdx) => {
                  const isThisPicked = picked === optIdx;
                  const isThisCorrect = optIdx === item.correctIndex;

                  let borderCol = 'var(--border-hairline)';
                  let bgCol = 'var(--bg-canvas)';
                  if (hasPicked) {
                    if (isThisCorrect) {
                      borderCol = 'var(--accent-primary)';
                      bgCol = 'var(--accent-soft)';
                    } else if (isThisPicked && !isThisCorrect) {
                      borderCol = '#dc2626';
                      bgCol = 'rgba(220, 38, 38, 0.08)';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => setSelected((prev) => ({ ...prev, [item.id]: optIdx }))}
                      className="flex items-center justify-between gap-3 text-right rounded-lg border px-4 py-2.5 text-[1rem] transition-colors cursor-pointer"
                      style={{
                        backgroundColor: bgCol,
                        borderColor: borderCol,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span>{opt}</span>
                      {hasPicked && isThisCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />}
                      {hasPicked && isThisPicked && !isThisCorrect && <XCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {hasPicked && (
                <div
                  className="rounded-lg border px-4 py-3 text-[0.98rem] leading-relaxed space-y-2"
                  style={{
                    backgroundColor: isCorrect ? 'var(--accent-soft)' : 'var(--accent-gold-soft)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div>
                    <strong>{isCorrect ? 'استنباط صحيح — ' : 'وجه الاستنباط — '}</strong>
                    {item.analysis}
                  </div>
                  <SourceQuoteButton sources={item.sources} label="النص الأصلي في المقرر" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
