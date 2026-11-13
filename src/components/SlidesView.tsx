import React, { useState } from 'react';
import { ArrowLeft, BookMarked, Layers, Compass, Scale, HeartHandshake, Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';
import {
  SLIDES,
  UNIT1_LINGUISTIC_MEANINGS,
  UNIT1_TERM_COMPARISON,
  UNIT2_SOURCES,
  MORAL_VALUES,
  CIVILIZATIONAL_VALUES,
  ECONOMIC_VALUES,
  SOCIAL_VALUES,
  PSYCHOLOGICAL_VALUES,
  UNIT4_CHARACTERISTICS,
  UNIT5_FOUNDATIONS,
  UNIT6_IMPORTANCE,
  UNIT7_COMPARISON_ROWS,
  FLASHCARDS,
  QUICK_QUIZ,
} from '../data/presentationData';
import {
  ExpandablePanel,
  ScholarQuote,
  ValueExplorer,
  FlashcardDeck,
  InteractiveQuiz,
} from './SlideComponents';

interface SlidesViewProps {
  currentSlide: number;
  onSelectSlide: (index: number) => void;
  largeText: boolean;
}

export const SlidesView: React.FC<SlidesViewProps> = ({
  currentSlide,
  onSelectSlide,
  largeText,
}) => {
  // Interactive local states for specific slides
  const [unit1Tab, setUnit1Tab] = useState<'islamic' | 'western'>('islamic');
  const [unit2ActiveSource, setUnit2ActiveSource] = useState<string>('quran');
  const [unit4ActiveTrait, setUnit4ActiveTrait] = useState<string>('rabbaniyyah');
  const [unit6ActiveView, setUnit6ActiveView] = useState<'individual' | 'society'>('individual');
  const [unit7ActiveTab, setUnit7ActiveTab] = useState<'compare' | 'flashcards' | 'quiz'>('compare');

  const bodyClass = largeText ? 'text-[1.22rem] leading-[1.95]' : 'text-[1.08rem] leading-[1.85]';

  // SLIDE 0: COVER & ROADMAP
  if (currentSlide === 0) {
    const roadmapUnits = [
      { unit: 'الوحدة الأولى', title: 'مفهوم القيم لغة واصطلاحاً', slideIdx: 1, icon: BookMarked, desc: 'معاني (قَوَمَ) ومقارنة الفكر الغربي بالمنظور الإسلامي' },
      { unit: 'الوحدة الثانية', title: 'مصادر القيم الإسلامية', slideIdx: 2, icon: Layers, desc: 'القرآن الكريم، السنة المطهرة، الإجماع، والقياس' },
      { unit: 'الوحدة الثالثة', title: 'أنواع القيم الإسلامية', slideIdx: 3, icon: Scale, desc: '١٤ قيمة خلقية وحضارية واقتصادية واجتماعية ونفسية' },
      { unit: 'الوحدة الرابعة', title: 'خصائص القيم الإسلامية', slideIdx: 8, icon: Compass, desc: 'الربانية، الوسطية، العالمية، السماحة، الشمولية والواقعية' },
      { unit: 'الوحدة الخامسة', title: 'أسس القيم الإسلامية', slideIdx: 9, icon: ShieldCheck, desc: 'الوحي، الجانب النظري والعملي، الفطرة، الثبات، والجزاء' },
      { unit: 'الوحدة السادسة', title: 'أهمية القيم للفرد والمجتمع', slideIdx: 10, icon: HeartHandshake, desc: 'بناء الشخصية المتوازنة وحفظ الضرورات الخمس' },
      { unit: 'الوحدة السابعة', title: 'التطبيق والمراجعة الشاملة', slideIdx: 11, icon: GraduationCap, desc: 'مقارنة تطبيقية، بطاقات استذكار 3D، واختبار تفاعلي' },
    ];

    return (
      <div className="space-y-8">
        <div
          className="rounded-2xl border p-7 md:p-10 space-y-5"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
        >
          <p className="text-sm md:text-base font-medium" style={{ color: 'var(--accent-primary)' }}>
            ملخص أكاديمي شامل · الجامعة الإسلامية بالمدينة المنورة · ١٠٩ صفحات في ١٢ شريحة تفاعلية
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-5xl leading-[1.35]"
            style={{ color: 'var(--text-primary)' }}
          >
            مقرر القيم الإسلامية
          </h2>
          <p className={`${bodyClass} max-w-3xl`} style={{ color: 'var(--text-secondary)' }}>
            عرض تقديمي تفاعلي يلخّص جميع الوحدات السبع بدقة علمية، مع تقسيم المحتوى إلى أقسام قابلة للنقر والتوسيع لتيسير العرض والقراءة المريحة.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onSelectSlide(1)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-display font-semibold text-base text-white cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              ابدأ العرض من الوحدة الأولى
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectSlide(11)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-display font-medium text-base cursor-pointer transition-colors"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
              }}
            >
              بطاقات المراجعة والاختبار
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
            خريطة الوحدات السبع (انقر للانتقال المباشر)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {roadmapUnits.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.unit}
                  type="button"
                  onClick={() => onSelectSlide(item.slideIdx)}
                  className="group text-right rounded-xl border p-5 transition-colors duration-150 cursor-pointer flex flex-col justify-between gap-3 hover:border-emerald-700/60"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs md:text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                      {item.unit}
                    </span>
                    <IconComp className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <p className="text-[0.95rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 1: UNIT 1 — CONCEPT OF ISLAMIC VALUES
  if (currentSlide === 1) {
    const activeComparison = UNIT1_TERM_COMPARISON[unit1Tab];
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Right 1: Linguistic Meanings (Accordion) */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              أولاً: المعاني اللغوية لمادة «قَوَمَ» (ص ١ - ٢)
            </h3>
            <p className="text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
              انقر على كل معنى لعرض الشاهد القرآني والدلالة المعجمية
            </p>
          </div>
          <div className="space-y-2.5">
            {UNIT1_LINGUISTIC_MEANINGS.map((m) => (
              <ExpandablePanel
                key={m.id}
                indexLabel={m.num}
                title={m.title + (m.isHighlighted ? ' (الأقرب لموضوعنا)' : '')}
                subtitle={m.summary}
                defaultOpen={Boolean(m.isHighlighted)}
              >
                <p className={bodyClass} style={{ color: 'var(--text-primary)' }}>
                  {m.summary}
                </p>
                <p className={`mt-2 ${bodyClass}`} style={{ color: 'var(--text-secondary)' }}>
                  {m.detail}
                </p>
              </ExpandablePanel>
            ))}
          </div>
        </div>

        {/* Right/Left 2: Terminology Comparison (Clickable Tabs) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              ثانياً: القيم في الاصطلاح (ص ٢ - ٣)
            </h3>
            <p className="text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
              بدّل بين المنظور الإسلامي والفكر الغربي لمقارنة الأسس والتعريفات
            </p>
          </div>

          <div
            className="flex items-center gap-1.5 p-1.5 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
          >
            <button
              type="button"
              onClick={() => setUnit1Tab('islamic')}
              className="flex-1 py-2.5 px-4 rounded-lg font-display font-semibold text-base cursor-pointer transition-colors"
              style={{
                backgroundColor: unit1Tab === 'islamic' ? 'var(--bg-surface)' : 'transparent',
                color: unit1Tab === 'islamic' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              المنظور الإسلامي
            </button>
            <button
              type="button"
              onClick={() => setUnit1Tab('western')}
              className="flex-1 py-2.5 px-4 rounded-lg font-display font-semibold text-base cursor-pointer transition-colors"
              style={{
                backgroundColor: unit1Tab === 'western' ? 'var(--bg-surface)' : 'transparent',
                color: unit1Tab === 'western' ? 'var(--accent-gold)' : 'var(--text-secondary)',
              }}
            >
              الفكر الغربي ونقده
            </button>
          </div>

          <div
            className="rounded-2xl border p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
          >
            <h4 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              {activeComparison.title}
            </h4>
            <div className="space-y-4">
              {activeComparison.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-4 space-y-1.5"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <p className="font-display font-semibold text-sm md:text-base" style={{ color: 'var(--accent-primary)' }}>
                    {item.label}
                  </p>
                  <p className={bodyClass} style={{ color: 'var(--text-primary)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 2: UNIT 2 — FOUR SOURCES OF ISLAMIC VALUES
  if (currentSlide === 2) {
    const activeSource = UNIT2_SOURCES.find((s) => s.id === unit2ActiveSource) || UNIT2_SOURCES[0];

    return (
      <div className="space-y-6">
        {/* Clickable 4-Source Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {UNIT2_SOURCES.map((src, idx) => {
            const selected = src.id === activeSource.id;
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => setUnit2ActiveSource(src.id)}
                className="text-right rounded-xl border p-4 cursor-pointer transition-colors duration-150"
                style={{
                  backgroundColor: selected ? 'var(--accent-soft)' : 'var(--bg-surface)',
                  borderColor: selected ? 'var(--accent-primary)' : 'var(--border-hairline)',
                }}
              >
                <span
                  className="font-mono tabular-nums text-xs font-semibold block mb-1"
                  style={{ color: selected ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                >
                  0{idx + 1} · {src.order}
                </span>
                <span className="font-display font-bold text-lg md:text-xl block" style={{ color: 'var(--text-primary)' }}>
                  {src.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Source Detail Stage */}
        <div
          className="rounded-2xl border p-6 md:p-8 space-y-6"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
        >
          <div className="space-y-2 border-b pb-5" style={{ borderColor: 'var(--border-hairline)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
              {activeSource.order} من مصادر القيم الإسلامية
            </span>
            <h3 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-primary)' }}>
              {activeSource.title}
            </h3>
            <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
              {activeSource.definition}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeSource.keyPoints.map((kp, i) => (
              <div
                key={i}
                className="rounded-xl border p-5 space-y-2"
                style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
              >
                <h4 className="font-display font-semibold text-lg" style={{ color: 'var(--accent-primary)' }}>
                  {kp.heading}
                </h4>
                <p className={bodyClass} style={{ color: 'var(--text-primary)' }}>
                  {kp.body}
                </p>
              </div>
            ))}
          </div>

          <ScholarQuote text={activeSource.evidence} source={activeSource.summaryNote} />
        </div>
      </div>
    );
  }

  // SLIDES 3–7: UNIT 3 — FIVE CATEGORIES OF ISLAMIC VALUES
  if (currentSlide === 3) {
    return (
      <div className="space-y-4">
        <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
          صُنّفت القيم الإسلامية وفق محتواها ومضمونها إلى خمسة أنواع (ص ١٠). ونستعرض هنا النوع الأول: <strong>القيم الخلقية</strong> (الحق، العدل، الإحسان).
        </p>
        <ValueExplorer values={MORAL_VALUES} largeText={largeText} />
      </div>
    );
  }

  if (currentSlide === 4) {
    return (
      <div className="space-y-4">
        <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
          النوع الثاني من أنواع القيم الإسلامية: <strong>القيم الحضارية</strong> التي تبني الأمم وترسخ التعايش الإنساني (العلم، الاستخلاف، السلام).
        </p>
        <ValueExplorer values={CIVILIZATIONAL_VALUES} largeText={largeText} />
      </div>
    );
  }

  if (currentSlide === 5) {
    return (
      <div className="space-y-4">
        <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
          النوع الثالث: <strong>القيم الاقتصادية وما يتصل بها من استغناء النفس</strong> (القناعة، الرضا، العفة) لصيانة الفرد من الطمع والاضطراب.
        </p>
        <ValueExplorer values={ECONOMIC_VALUES} largeText={largeText} />
      </div>
    );
  }

  if (currentSlide === 6) {
    return (
      <div className="space-y-4">
        <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
          النوع الرابع: <strong>القيم الاجتماعية</strong> التي تصون وحدة المجتمع وتقضي على الأنانية والفرقة (لزوم الجماعة، التكافل، التعاون).
        </p>
        <ValueExplorer values={SOCIAL_VALUES} largeText={largeText} />
      </div>
    );
  }

  if (currentSlide === 7) {
    return (
      <div className="space-y-4">
        <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
          النوع الخامس: <strong>القيم النفسية</strong> التي تزكي القلب وتصحح النية وتهذب السلوك الباطني (الإخلاص، التواضع).
        </p>
        <ValueExplorer values={PSYCHOLOGICAL_VALUES} largeText={largeText} />
      </div>
    );
  }

  // SLIDE 8: UNIT 4 — CHARACTERISTICS OF ISLAMIC VALUES
  if (currentSlide === 8) {
    const activeTrait = UNIT4_CHARACTERISTICS.find((t) => t.id === unit4ActiveTrait) || UNIT4_CHARACTERISTICS[0];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Selector Column */}
        <div className="lg:col-span-4 space-y-2.5">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
            اختر خاصية لعرض تفاصيلها العلمية:
          </p>
          {UNIT4_CHARACTERISTICS.map((trait) => {
            const active = trait.id === activeTrait.id;
            return (
              <button
                key={trait.id}
                type="button"
                onClick={() => setUnit4ActiveTrait(trait.id)}
                className="w-full text-right rounded-xl border px-5 py-4 cursor-pointer transition-colors flex items-center justify-between gap-3"
                style={{
                  backgroundColor: active ? 'var(--accent-soft)' : 'var(--bg-surface)',
                  borderColor: active ? 'var(--accent-primary)' : 'var(--border-hairline)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono tabular-nums font-bold text-sm"
                    style={{ color: active ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                  >
                    {trait.num}
                  </span>
                  <span className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    {trait.title}
                  </span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {trait.pages}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trait Detail Stage */}
        <div
          className="lg:col-span-8 rounded-2xl border p-6 md:p-8 space-y-6"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
        >
          <div className="border-b pb-4 space-y-2" style={{ borderColor: 'var(--border-hairline)' }}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-primary)' }}>
                {activeTrait.num}. {activeTrait.title}
              </h3>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {activeTrait.pages}
              </span>
            </div>
            <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
              <strong>المفهوم اللغوي: </strong>
              {activeTrait.linguistic}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-lg" style={{ color: 'var(--accent-primary)' }}>
              المحاور والأبعاد الأساسية
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {activeTrait.pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border p-4 space-y-1"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                >
                  <h5 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                    {p.label}
                  </h5>
                  <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-display font-semibold text-lg" style={{ color: 'var(--accent-gold)' }}>
              الأثر والاعتبارات المترتبة
            </h4>
            <ul className="space-y-2">
              {activeTrait.implications.map((imp, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 ${bodyClass}`}
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Sparkles className="w-4 h-4 mt-2 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 9: UNIT 5 — SIX FOUNDATIONS
  if (currentSlide === 9) {
    return (
      <div className="space-y-5">
        <p className={bodyClass} style={{ color: 'var(--text-secondary)' }}>
          ترتكز المنظومة القيمية الإسلامية على ستة أسس متكاملة تمنحها التماسك والخلود. انقر على أي أساس لاستعراض تفصيله وأدلته:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {UNIT5_FOUNDATIONS.map((f, idx) => (
            <ExpandablePanel
              key={f.id}
              indexLabel={f.num}
              title={f.title}
              subtitle={`${f.page} · ${f.summary}`}
              defaultOpen={idx < 2}
            >
              <p className={`font-medium mb-3 ${bodyClass}`} style={{ color: 'var(--text-primary)' }}>
                {f.summary}
              </p>
              <ul className="space-y-2">
                {f.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[1.02rem] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-mono text-xs mt-1.5" style={{ color: 'var(--accent-primary)' }}>●</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </ExpandablePanel>
          ))}
        </div>
      </div>
    );
  }

  // SLIDE 10: UNIT 6 — IMPORTANCE FOR INDIVIDUAL & SOCIETY
  if (currentSlide === 10) {
    return (
      <div className="space-y-6">
        <div
          className="flex items-center gap-2 p-1.5 rounded-xl border max-w-xl"
          style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
        >
          <button
            type="button"
            onClick={() => setUnit6ActiveView('individual')}
            className="flex-1 py-2.5 px-4 rounded-lg font-display font-semibold text-base cursor-pointer transition-colors whitespace-nowrap"
            style={{
              backgroundColor: unit6ActiveView === 'individual' ? 'var(--bg-surface)' : 'transparent',
              color: unit6ActiveView === 'individual' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            }}
          >
            أولاً: أهميتها للفرد (٥ محاور)
          </button>
          <button
            type="button"
            onClick={() => setUnit6ActiveView('society')}
            className="flex-1 py-2.5 px-4 rounded-lg font-display font-semibold text-base cursor-pointer transition-colors whitespace-nowrap"
            style={{
              backgroundColor: unit6ActiveView === 'society' ? 'var(--bg-surface)' : 'transparent',
              color: unit6ActiveView === 'society' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            }}
          >
            ثانياً: أهميتها للجماعة والضرورات الخمس
          </button>
        </div>

        {unit6ActiveView === 'individual' ? (
          <div className="space-y-3">
            {UNIT6_IMPORTANCE.individual.map((item, idx) => (
              <ExpandablePanel
                key={item.num}
                indexLabel={item.num}
                title={item.title}
                subtitle={item.desc}
                defaultOpen={idx === 0 || idx === 1}
              >
                <p className={bodyClass} style={{ color: 'var(--text-primary)' }}>
                  {item.desc}
                </p>
              </ExpandablePanel>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              {UNIT6_IMPORTANCE.society.map((item, idx) => (
                <ExpandablePanel
                  key={item.num}
                  indexLabel={item.num}
                  title={item.title}
                  subtitle={item.desc}
                  defaultOpen={idx === 2}
                >
                  <p className={bodyClass} style={{ color: 'var(--text-primary)' }}>
                    {item.desc}
                  </p>
                </ExpandablePanel>
              ))}
            </div>

            <div
              className="rounded-2xl border p-6 space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
            >
              <h4 className="font-display font-bold text-xl" style={{ color: 'var(--accent-primary)' }}>
                الضرورات الخمس التي تحفظها القيم الإسلامية في المجتمع (ص ١٠٦ - ١٠٧)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {UNIT6_IMPORTANCE.fiveNecessities.map((nec, i) => (
                  <div
                    key={nec}
                    className="rounded-xl border p-4 text-center space-y-1"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hairline)' }}
                  >
                    <span className="font-mono tabular-nums text-xs font-bold block" style={{ color: 'var(--accent-gold)' }}>
                      0{i + 1}
                    </span>
                    <span className="font-display font-bold text-lg block" style={{ color: 'var(--text-primary)' }}>
                      {nec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // SLIDE 11: UNIT 7 — APPLIED COMPARISON, 3D FLASHCARDS & QUIZ
  return (
    <div className="space-y-6">
      <div
        className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border max-w-2xl"
        style={{ backgroundColor: 'var(--bg-surface-muted)', borderColor: 'var(--border-hairline)' }}
      >
        {[
          { key: 'compare', label: '١. المقارنة مع الفكر الغربي' },
          { key: 'flashcards', label: '٢. بطاقات المراجعة (3D)' },
          { key: 'quiz', label: '٣. اختبار التقويم السريع' },
        ].map((tab) => {
          const active = unit7ActiveTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setUnit7ActiveTab(tab.key as typeof unit7ActiveTab)}
              className="flex-1 min-w-[160px] py-2.5 px-4 rounded-lg font-display font-semibold text-base cursor-pointer transition-colors whitespace-nowrap"
              style={{
                backgroundColor: active ? 'var(--bg-surface)' : 'transparent',
                color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {unit7ActiveTab === 'compare' && (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-hairline)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-surface-muted)' }}>
                  <th className="p-4 md:p-5 font-display font-bold text-base border-b" style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-primary)' }}>
                    وجه المقارنة
                  </th>
                  <th className="p-4 md:p-5 font-display font-bold text-base border-b" style={{ borderColor: 'var(--border-hairline)', color: 'var(--accent-primary)' }}>
                    القيم في الشريعة الإسلامية
                  </th>
                  <th className="p-4 md:p-5 font-display font-bold text-base border-b" style={{ borderColor: 'var(--border-hairline)', color: 'var(--accent-gold)' }}>
                    القيم في الفكر الغربي
                  </th>
                </tr>
              </thead>
              <tbody>
                {UNIT7_COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0"
                    style={{ borderColor: 'var(--border-hairline)' }}
                  >
                    <td className="p-4 md:p-5 font-display font-semibold text-base align-top whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                      {row.axis}
                    </td>
                    <td className={`p-4 md:p-5 align-top ${bodyClass}`} style={{ color: 'var(--text-primary)' }}>
                      {row.islamic}
                    </td>
                    <td className={`p-4 md:p-5 align-top ${bodyClass}`} style={{ color: 'var(--text-secondary)' }}>
                      {row.western}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {unit7ActiveTab === 'flashcards' && <FlashcardDeck cards={FLASHCARDS} />}

      {unit7ActiveTab === 'quiz' && <InteractiveQuiz questions={QUICK_QUIZ} />}
    </div>
  );
};

export { SLIDES };
