import React, { useState } from 'react';
import { ChevronDown, BookOpen, RotateCw, CheckCircle2, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { ValueItem, FlashcardItem, QuizQuestion } from '../data/presentationData';

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
      className="rounded-xl border transition-colors duration-200"
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
          className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200"
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

interface ValueExplorerProps {
  values: ValueItem[];
  largeText: boolean;
}

export const ValueExplorer: React.FC<ValueExplorerProps> = ({ values, largeText }) => {
  const [activeId, setActiveId] = useState<string>(values[0].id);
  const [openSection, setOpenSection] = useState<'definition' | 'dimensions' | 'evidence' | 'impacts'>('definition');

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
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-hairline)' }}>
          <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {activeValue.name}
          </h3>
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            المرجع في المقرر: {activeValue.pages}
          </span>
        </div>

        {/* Clickable Sub-navigation inside the value so content stays concise & neat */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { key: 'definition', label: 'التعريف والمعيار' },
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
                className="py-2.5 px-3.5 rounded-lg border text-sm md:text-base font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <div
                className="md:col-span-2 rounded-xl border p-5 space-y-2"
                style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
              >
                <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent-gold)' }}>
                  المعيار ومصدر الإلزام
                </h4>
                <p style={{ color: 'var(--text-primary)' }}>{activeValue.standardAndObligation}</p>
              </div>
            </div>
          )}

          {openSection === 'dimensions' && (
            <div className="space-y-3.5">
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
            </div>
          )}

          {openSection === 'impacts' && (
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                آثار القيمة على الفرد والمجتمع والإنسانية
              </h4>
              <ul className="space-y-3">
                {activeValue.impacts.map((imp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border p-4"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  >
                    <span
                      className="font-mono tabular-nums font-bold text-sm mt-1 shrink-0"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      0{i + 1}
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors"
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors"
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
    </div>
  );
};

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
              <p className="font-display font-semibold text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                <span className="font-mono tabular-nums ml-2" style={{ color: 'var(--accent-primary)' }}>
                  0{qIndex + 1}.
                </span>
                {q.question}
              </p>

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
                  className="rounded-lg border px-4 py-3 text-[0.98rem] leading-relaxed"
                  style={{
                    backgroundColor: isCorrect ? 'var(--accent-soft)' : 'var(--accent-gold-soft)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <strong>{isCorrect ? 'إجابة صحيحة — ' : 'توضيح المقرر — '}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
