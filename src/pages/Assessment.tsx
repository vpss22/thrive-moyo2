import { useState } from 'react';
import { Link } from 'react-router';
import {
  Heart, Brain, Shield, AlertCircle, ArrowRight, RotateCcw,
  Phone, Check, ChevronRight, Info,
} from 'lucide-react';
import { PageHero, Section, Reveal } from '@/components/primitives';
import { SITE } from '@/lib/site-config';

type Question = {
  id: string;
  text: string;
  options: { value: number; label: string }[];
};

type Assessment = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: typeof Brain;
  color: string;
  disclaimer: string;
  questions: Question[];
  scores: { range: [number, number]; label: string; level: 'low' | 'mild' | 'moderate' | 'high' | 'critical'; guidance: string }[];
};

const ASSESSMENTS: Assessment[] = [
  {
    id: 'wellbeing',
    name: 'Mental Wellbeing Check-In',
    shortName: 'Wellbeing',
    description: 'A short 5-question check on how you have been feeling over the past 2 weeks. Not a diagnostic tool — just a starting point for self-awareness.',
    icon: Heart,
    color: 'bg-forest/8 text-forest border-forest/20',
    disclaimer: 'This check-in is for self-reflection only and does not constitute a diagnosis or medical advice. If you are in crisis, please call our 24/7 line at 0719 288 177.',
    questions: [
      {
        id: 'q1',
        text: 'Over the past 2 weeks, how often have you felt able to cope with the demands of daily life?',
        options: [
          { value: 4, label: 'All of the time' },
          { value: 3, label: 'Most of the time' },
          { value: 2, label: 'Some of the time' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' },
        ],
      },
      {
        id: 'q2',
        text: 'How often have you felt hopeful about the future?',
        options: [
          { value: 4, label: 'Always' },
          { value: 3, label: 'Often' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' },
        ],
      },
      {
        id: 'q3',
        text: 'Have you been able to enjoy activities you usually find meaningful?',
        options: [
          { value: 4, label: 'Yes, fully' },
          { value: 3, label: 'Mostly' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Not at all' },
        ],
      },
      {
        id: 'q4',
        text: 'How often have you felt connected to people who care about you?',
        options: [
          { value: 4, label: 'Always' },
          { value: 3, label: 'Often' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' },
        ],
      },
      {
        id: 'q5',
        text: 'Have you felt overwhelmed by worries or low mood?',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Often' },
          { value: 0, label: 'Almost always' },
        ],
      },
    ],
    scores: [
      { range: [0, 5], label: 'You may be going through a difficult time', level: 'critical', guidance: 'Please reach out to our 24/7 line at 0719 288 177. You deserve support and you don\'t have to face this alone. A counselor will listen — no pressure, no judgment.' },
      { range: [6, 10], label: 'You seem to be struggling with some aspects of wellbeing', level: 'high', guidance: 'Consider speaking with a mental health professional. We offer free initial counseling consultations — book one through our contact page or call us.' },
      { range: [11, 14], label: 'Your wellbeing feels a bit strained', level: 'moderate', guidance: 'Small things help. Try our weekly Mindfulness Monday drop-in sessions, read our resources on stress management, or talk with someone you trust.' },
      { range: [15, 17], label: 'You\'re doing well overall', level: 'mild', guidance: 'Keep up the practices that support your wellbeing. Stay connected with your support network and check in on those around you.' },
      { range: [18, 20], label: 'You\'re thriving', level: 'low', guidance: 'Wonderful. Your wellbeing can be a resource for others — consider volunteering, supporting a friend, or sharing what works for you.' },
    ],
  },
  {
    id: 'anxiety',
    name: 'Anxiety Self-Check (GAD-2 inspired)',
    shortName: 'Anxiety',
    description: 'Two quick questions based on the validated Generalized Anxiety Disorder 2-item screen. Recommended by the WHO for first-line anxiety screening.',
    icon: Brain,
    color: 'bg-terracotta/8 text-terracotta border-terracotta/20',
    disclaimer: 'This screen is for educational purposes only and is not a diagnosis. A score of 3 or more suggests you should discuss your symptoms with a healthcare provider. In crisis: 0719 288 177.',
    questions: [
      {
        id: 'q1',
        text: 'Over the past 2 weeks, how often have you been feeling nervous, anxious, or on edge?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q2',
        text: 'Over the past 2 weeks, how often have you found yourself unable to stop or control worrying?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
    ],
    scores: [
      { range: [0, 2], label: 'Low anxiety score', level: 'low', guidance: 'Your score suggests minimal anxiety symptoms. Continue with the practices that support your wellbeing.' },
      { range: [3, 6], label: 'Possible anxiety — consider professional support', level: 'moderate', guidance: 'A score of 3+ indicates you may benefit from a conversation with a mental health professional. Reach out via our contact page to book a free initial consultation, or call 0719 288 177.' },
    ],
  },
  {
    id: 'phq9',
    name: 'Depression Self-Check (PHQ-2 inspired)',
    shortName: 'Depression',
    description: 'Two questions from the Patient Health Questionnaire, validated globally for depression screening.',
    icon: Shield,
    color: 'bg-gold/15 text-gold border-gold/30',
    disclaimer: 'This is a screen, not a diagnosis. A score of 3 or more warrants professional follow-up. If you are having thoughts of suicide, please call Befrienders Kenya at 0722 178 177 or our 24/7 line at 0719 288 177.',
    questions: [
      {
        id: 'q1',
        text: 'Over the past 2 weeks, how often have you had little interest or pleasure in doing things?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q2',
        text: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
    ],
    scores: [
      { range: [0, 2], label: 'Low depression score', level: 'low', guidance: 'Your screen does not suggest significant depressive symptoms at this time. Continue to monitor how you feel and reach out if things change.' },
      { range: [3, 6], label: 'Possible depression — please follow up', level: 'moderate', guidance: 'A score of 3+ suggests you may be experiencing depression. Please consider speaking with a mental health professional — we offer free initial consultations. Call 0719 288 177 or book through our contact page.' },
    ],
  },
];

const LEVEL_STYLES: Record<string, { bg: string; text: string; ring: string; label: string }> = {
  low: { bg: 'bg-forest/8', text: 'text-forest', ring: 'ring-forest/20', label: 'Low risk' },
  mild: { bg: 'bg-sage/15', text: 'text-sage', ring: 'ring-sage/30', label: 'Mild' },
  moderate: { bg: 'bg-gold/15', text: 'text-gold', ring: 'ring-gold/30', label: 'Moderate' },
  high: { bg: 'bg-terracotta/10', text: 'text-terracotta', ring: 'ring-terracotta/30', label: 'High' },
  critical: { bg: 'bg-crisis/10', text: 'text-crisis', ring: 'ring-crisis/30', label: 'Urgent' },
};

export default function Assessment() {
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const startAssessment = (a: Assessment) => {
    setSelected(a);
    setAnswers({});
    setShowResults(false);
  };

  const totalScore = selected
    ? Object.values(answers).reduce((sum, v) => sum + v, 0)
    : 0;

  const maxScore = selected
    ? selected.questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.value)), 0)
    : 0;

  const result = selected?.scores.find((s) => totalScore >= s.range[0] && totalScore <= s.range[1]);

  const allAnswered = selected && selected.questions.every((q) => answers[q.id] !== undefined);

  return (
    <>
      <PageHero
        label="Self-Assessment"
        title={<>A moment to <span className="text-gold">check in with yourself</span></>}
        subtitle="These validated screens take 2–5 minutes and are completely anonymous. They are not a diagnosis, but they can help you decide whether to reach out for support."
        bgImage="/about-community2.jpg"
      />

      {/* Disclaimer banner */}
      <section className="bg-crisis/8 border-y border-crisis/15 py-6 px-6">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-crisis shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-body text-sm text-charcoal">
              <strong className="font-semibold">Important:</strong> These tools are for self-reflection and screening only. They do not replace a professional assessment. If you are in crisis, please call <a href="tel:+254719288177" className="text-crisis font-semibold underline">0719 288 177</a> right now.
            </p>
          </div>
          <a
            href="tel:+254719288177"
            className="shrink-0 inline-flex items-center gap-2 bg-crisis text-white font-body font-semibold text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-crisis/90 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            I'm in crisis
          </a>
        </div>
      </section>

      {!selected ? (
        /* Assessment selection */
        <Section bg="cream">
          <Reveal>
            <span className="section-label text-gold">Choose a Check-In</span>
            <h2 className="mt-6 font-display text-display-md text-forest-dark">
              Three free, anonymous screens
            </h2>
            <p className="mt-4 font-body text-body-lg text-charcoal-light max-w-2xl">
              Pick the one that resonates. Each takes 2–5 minutes. Your answers stay in your browser — we do not collect, store, or transmit anything.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {ASSESSMENTS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.1}>
                <button
                  onClick={() => startAssessment(a)}
                  className="group w-full text-left h-full rounded-2xl bg-white border border-forest/10 p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl border ${a.color}`}>
                    <a.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-forest-dark">{a.shortName}</h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-wider text-gold">{a.questions.length} questions · 2 min</p>
                  <p className="mt-3 font-body text-sm text-charcoal-light leading-relaxed">{a.description}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-forest group-hover:text-gold transition-colors">
                    Begin check-in
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : (
        /* Active assessment */
        <Section bg="cream">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${selected.color}`}>
                  <selected.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-charcoal-light">Self-Assessment</p>
                  <h2 className="font-display text-2xl text-forest-dark">{selected.name}</h2>
                </div>
              </div>
              <button
                onClick={() => { setSelected(null); setAnswers({}); setShowResults(false); }}
                className="font-body text-xs uppercase tracking-wider text-charcoal-light hover:text-forest transition-colors"
              >
                Exit
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mb-8 rounded-lg bg-cream-dark border border-forest/10 p-4">
              <p className="font-body text-xs text-charcoal-light leading-relaxed">
                <Info className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-gold" aria-hidden="true" />
                {selected.disclaimer}
              </p>
            </div>

            {!showResults ? (
              /* Questions */
              <div className="space-y-8">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-xs uppercase tracking-wider text-charcoal-light">
                      Question {Object.keys(answers).length + (allAnswered ? 1 : 1)} of {selected.questions.length}
                    </span>
                    <span className="font-body text-xs text-charcoal-light">
                      {Math.round((Object.keys(answers).length / selected.questions.length) * 100)}% complete
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-forest/10 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-forest to-gold transition-all duration-500"
                      style={{ width: `${(Object.keys(answers).length / selected.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {selected.questions.map((q, idx) => (
                  <fieldset key={q.id} className="space-y-3">
                    <legend className="font-display text-lg text-forest-dark">
                      <span className="text-gold mr-2">{idx + 1}.</span> {q.text}
                    </legend>
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isSelected = answers[q.id] === opt.value;
                        return (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-gold bg-gold/5'
                                : 'border-forest/10 bg-white hover:border-forest/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt.value}
                              checked={isSelected}
                              onChange={() => {
                                setAnswers((prev) => ({ ...prev, [q.id]: opt.value }));
                              }}
                              className="sr-only"
                            />
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                              isSelected ? 'border-gold bg-gold text-forest-dark' : 'border-forest/30'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" aria-hidden="true" />}
                            </span>
                            <span className="font-body text-sm text-charcoal">{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}

                <button
                  onClick={() => setShowResults(true)}
                  disabled={!allAnswered}
                  className="w-full bg-forest text-white font-body font-semibold uppercase tracking-wider text-sm px-6 py-4 rounded-lg hover:bg-forest-light transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  See my results →
                </button>
                {!allAnswered && (
                  <p className="text-center text-xs text-charcoal-light/70 font-body">
                    Please answer all questions to see your results.
                  </p>
                )}
              </div>
            ) : (
              /* Results */
              <div className="space-y-6">
                {result && (
                  <>
                    <div className={`rounded-2xl p-8 ${LEVEL_STYLES[result.level].bg} ${LEVEL_STYLES[result.level].ring} ring-2`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs uppercase tracking-widest font-semibold ${LEVEL_STYLES[result.level].text}`}>
                          {LEVEL_STYLES[result.level].label}
                        </span>
                        <span className="font-body text-xs text-charcoal-light">·</span>
                        <span className="font-body text-xs text-charcoal-light">
                          Score: {totalScore} / {maxScore}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl text-forest-dark leading-tight">
                        {result.label}
                      </h3>
                      <p className="mt-4 font-body text-base text-charcoal leading-relaxed">
                        {result.guidance}
                      </p>
                    </div>

                    {/* Score visualization */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-xs uppercase tracking-wider text-charcoal-light">Your score</span>
                        <span className="font-display text-2xl text-forest-dark">{totalScore}</span>
                      </div>
                      <div className="relative h-3 rounded-full bg-gradient-to-r from-forest via-gold to-crisis overflow-hidden">
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-forest-dark rounded-full shadow-lg"
                          style={{ left: `${(totalScore / maxScore) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex justify-between mt-1 font-body text-[10px] text-charcoal-light/70">
                        <span>Thriving</span>
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>High</span>
                        <span>Critical</span>
                      </div>
                    </div>

                    {/* Next steps */}
                    <div className="rounded-xl bg-white border border-forest/10 p-6">
                      <h4 className="font-display text-lg text-forest-dark mb-4">What you can do next</h4>
                      <ul className="space-y-3">
                        {[
                          { label: 'Read related resources', desc: 'Articles and guides matched to your screen', href: '/resources', cta: 'Browse Resources' },
                          { label: 'Talk to a counselor', desc: 'Free initial consultation — no commitment', href: '/contact', cta: 'Book a Call' },
                          { label: 'Join a support group', desc: 'Connect with others who understand', href: '/events', cta: 'View Events' },
                        ].map((step) => (
                          <li key={step.label}>
                            <Link
                              to={step.href}
                              className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-cream transition-colors group"
                            >
                              <div>
                                <p className="font-body text-sm font-semibold text-charcoal">{step.label}</p>
                                <p className="font-body text-xs text-charcoal-light">{step.desc}</p>
                              </div>
                              <span className="inline-flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wider text-gold group-hover:translate-x-1 transition-transform">
                                {step.cta}
                                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Crisis CTA if high/critical */}
                    {(result.level === 'high' || result.level === 'critical') && (
                      <div className="rounded-xl bg-crisis/8 border border-crisis/30 p-6 text-center">
                        <AlertCircle className="w-8 h-8 text-crisis mx-auto mb-3" aria-hidden="true" />
                        <h4 className="font-display text-xl text-forest-dark">Please reach out</h4>
                        <p className="mt-2 font-body text-sm text-charcoal">
                          You don't have to navigate this alone. Our crisis line is staffed 24/7 by trained counselors.
                        </p>
                        <a
                          href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
                          className="mt-4 inline-flex items-center gap-2 bg-crisis text-white font-body font-semibold uppercase tracking-wider text-sm px-6 py-3 rounded-lg hover:bg-crisis/90 transition-all hover:-translate-y-0.5"
                        >
                          <Phone className="w-4 h-4" aria-hidden="true" />
                          Call 0719 288 177
                        </a>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => { setAnswers({}); setShowResults(false); }}
                        className="inline-flex items-center justify-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-forest border border-forest/20 px-5 py-3 rounded-lg hover:bg-cream-dark transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        Retake this check-in
                      </button>
                      <button
                        onClick={() => { setSelected(null); setAnswers({}); setShowResults(false); }}
                        className="inline-flex items-center justify-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
                      >
                        Try a different check-in
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Reassurance */}
      <Section bg="forest-dark" className="text-center">
        <Reveal>
          <Shield className="w-12 h-12 text-gold mx-auto mb-6" aria-hidden="true" />
          <h2 className="font-display text-display-md text-white max-w-2xl mx-auto">
            Your privacy is protected
          </h2>
          <p className="mt-6 font-body text-body-lg text-white/70 max-w-xl mx-auto">
            These assessments run entirely in your browser. We do not collect, store, or transmit your answers. Nothing you do here is sent to our servers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/resources" className="btn-gold inline-flex items-center gap-2">
              Read Mental Health Articles
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/crisis-resources" className="btn-outline-white">
              Crisis Resources
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
