import React, { useState } from 'react';
import { RED_FLAG_CHECKLIST, SCAM_IQ_QUIZ } from '../data/threatIntel';
import {
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const RedFlagQuizSection: React.FC = () => {
  // Checklist accordion state
  const [openChecklistId, setOpenChecklistId] = useState<string | null>('flag-1');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const toggleChecklist = (id: string) => {
    setOpenChecklistId((prev) => (prev === id ? null : id));
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return; // locked once submitted
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    SCAM_IQ_QUIZ.forEach((q) => {
      const selectedIndex = selectedAnswers[q.id];
      if (selectedIndex !== undefined && q.options[selectedIndex].isCorrect) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const totalQuestions = SCAM_IQ_QUIZ.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const score = calculateScore();

  return (
    <section
      id="security-checklist-section"
      className="w-full space-y-8 pt-4"
      aria-labelledby="heading-security-checklist"
    >
      {/* 1. Interactive 6-Point Red Flag Checklist */}
      <div className="w-full bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Standard Defense Guidelines</span>
            </div>
            <h2
              id="heading-security-checklist"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              Interactive 6-Point Red Flag Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Systematic 6-step evaluation framework to independently audit employment offers, courier texts, or rental agreements.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.08] self-start sm:self-auto">
            Manual Due Diligence
          </span>
        </div>

        {/* 6 Collapsible Checklist Items */}
        <div className="space-y-3 pt-5">
          {RED_FLAG_CHECKLIST.map((item, index) => {
            const isOpen = openChecklistId === item.id;
            return (
              <div
                key={item.id}
                id={`checklist-card-${item.id}`}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'bg-black/40 border-indigo-500/40 shadow-xl shadow-indigo-500/5'
                    : 'bg-black/25 border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                      0{index + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-white block">
                        {item.rule}
                      </span>
                      <span className="text-xs text-slate-400 truncate block mt-0.5">
                        {item.summary}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <span className="text-[10px] font-semibold text-slate-400 hidden md:inline px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                      {item.indicator}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/[0.06] text-xs text-slate-300 space-y-3 font-sans">
                    <p className="leading-relaxed bg-black/40 p-4 rounded-xl border border-white/[0.06] text-slate-300">
                      {item.details}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>Indicator Signature: <strong className="text-indigo-300">{item.indicator}</strong></span>
                      <span className="text-emerald-400 font-semibold">Verified Safe Practice</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Scam IQ Quiz */}
      <div
        id="scam-iq-quiz-section"
        className="w-full bg-[#111827]/70 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Threat Evaluation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Scam IQ Defense Simulator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              Test your ability to spot deceptive check reimbursements, courier smishing, and sight-unseen lease wire traps in realistic threat scenarios.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <span className="text-xs font-medium text-slate-300 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              Completed: {answeredCount} / {totalQuestions}
            </span>
            {showResults && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="space-y-6 pt-5">
          {SCAM_IQ_QUIZ.map((q) => {
            const selectedIdx = selectedAnswers[q.id];

            return (
              <article
                key={q.id}
                id={`quiz-question-${q.id}`}
                className="bg-black/25 border border-white/[0.06] rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    {q.prompt}
                  </span>
                  {showResults && selectedIdx !== undefined && (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        q.options[selectedIdx].isCorrect
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {q.options[selectedIdx].isCorrect ? 'Correct Decision' : 'Hazardous Decision'}
                    </span>
                  )}
                </div>

                <p className="text-sm text-white font-medium leading-relaxed">
                  {q.scenario}
                </p>

                {/* Option Buttons */}
                <div className="space-y-2.5 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedIdx === oIdx;
                    let optionStyle = 'bg-black/30 border-white/[0.06] text-slate-300 hover:border-white/[0.15] hover:text-white';

                    if (showResults) {
                      if (opt.isCorrect) {
                        optionStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200';
                      } else if (isSelected && !opt.isCorrect) {
                        optionStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-200';
                      } else {
                        optionStyle = 'bg-black/20 border-white/[0.04] text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-600/20 border-indigo-500/50 text-white shadow-md shadow-indigo-500/10';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        disabled={showResults}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-start space-x-3 transition-all cursor-pointer ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt.text}</span>
                        {showResults && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        )}
                        {showResults && isSelected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Show Results */}
                {showResults && selectedIdx !== undefined && (
                  <div className="mt-3 p-3.5 bg-black/40 rounded-xl border border-white/[0.08] text-xs text-slate-300 leading-relaxed font-sans">
                    <span className="font-semibold text-indigo-300 block mb-1">
                      Cyber Analysis & Defense:
                    </span>
                    {q.options[selectedIdx].explanation}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Submit Quiz Action Bar */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {!showResults ? (
              <span>Answer all scenarios to calculate your Scam Defense IQ.</span>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">
                  Score: {score} of {totalQuestions} Correct ({Math.round((score / totalQuestions) * 100)}%)
                </span>
              </div>
            )}
          </div>

          {!showResults ? (
            <button
              type="button"
              onClick={() => setShowResults(true)}
              disabled={answeredCount === 0}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg ${
                answeredCount === 0
                  ? 'bg-white/[0.04] text-slate-500 border border-white/[0.06] cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 hover:-translate-y-0.5'
              }`}
            >
              Submit & Verify Results
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetQuiz}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Retake Simulator</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
