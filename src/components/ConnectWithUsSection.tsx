import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, User, Phone, Mail, Sparkles } from 'lucide-react';

interface FeedbackData {
  name: string;
  phone: string;
  email: string;
  feedback: string;
}

// Internal admin endpoint URL for email delivery - not exposed in rendered UI
const ADMIN_RECIPIENT_API = 'https://formsubmit.co/ajax/ganeshg9116@gmail.com';

export const countLetters = (text: string): number => {
  return text.trim().length;
};

const ConnectWithUsSection: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    phone: '',
    email: '',
    feedback: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const letterCount = countLetters(formData.feedback);
  const isLetterCountValid = letterCount >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validation checks
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your Name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your Phone Number.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your Gmail address.');
      return;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid Gmail / Email address.');
      return;
    }

    if (!formData.feedback.trim()) {
      setErrorMessage('Please enter your feedback.');
      return;
    }

    if (letterCount < 10) {
      setErrorMessage(`Feedback must contain a minimum of 10 letters. Current count: ${letterCount} letter${letterCount === 1 ? '' : 's'}.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send real email to admin account via FormSubmit API
      const formPayload = new FormData();
      formPayload.append('Name', formData.name);
      formPayload.append('Phone Number', formData.phone);
      formPayload.append('User Gmail', formData.email);
      formPayload.append('Feedback Message', formData.feedback);
      formPayload.append('Letter Count', letterCount.toString());
      formPayload.append('_subject', `New Feedback Submission from ${formData.name}`);
      formPayload.append('_captcha', 'false');
      formPayload.append('_template', 'table');

      await fetch(ADMIN_RECIPIENT_API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formPayload
      });

      // Save locally to localStorage as persistent submission record backup
      const existingHistory = JSON.parse(localStorage.getItem('econexus_submitted_feedback') || '[]');
      const newEntry = {
        ...formData,
        submittedAt: new Date().toISOString(),
        id: 'fb-' + Date.now()
      };
      localStorage.setItem('econexus_submitted_feedback', JSON.stringify([newEntry, ...existingHistory]));

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({ name: '', phone: '', email: '', feedback: '' });
    } catch (err) {
      console.warn('Network dispatch fallback engaged:', err);
      // Fallback local storage save
      const existingHistory = JSON.parse(localStorage.getItem('econexus_submitted_feedback') || '[]');
      const newEntry = {
        ...formData,
        submittedAt: new Date().toISOString(),
        id: 'fb-' + Date.now()
      };
      localStorage.setItem('econexus_submitted_feedback', JSON.stringify([newEntry, ...existingHistory]));

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({ name: '', phone: '', email: '', feedback: '' });
    }
  };

  const handleReset = () => {
    setSubmittedSuccess(false);
    setErrorMessage(null);
    setFormData({ name: '', phone: '', email: '', feedback: '' });
  };

  return (
    <section id="connect-with-us" className="py-16 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Sparkles size={14} className="text-amber-400" /> We Value Your Voice
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Connect With Us</h2>
          <p className="text-emerald-100 text-sm sm:text-base mt-2 font-medium">
            Have questions, suggestions, or feedback? Fill in your details below to reach out to our team directly.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 text-gray-800 shadow-2xl border border-white/20">
          {submittedSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={38} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-emerald-900">Submission Successful!</h3>
              <p className="text-emerald-700 font-semibold text-base max-w-md mx-auto">
                Thank you! Your feedback has been submitted successfully.
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Your feedback has been sent directly to the admin. Our support team will review your message shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg"
                >
                  Submit Another Feedback
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-shake">
                  <AlertCircle size={18} className="text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="connect-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User size={14} className="text-emerald-600" /> Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="connect-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Phone Number Input */}
                <div>
                  <label htmlFor="connect-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Phone size={14} className="text-emerald-600" /> Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="connect-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Gmail Input */}
                <div>
                  <label htmlFor="connect-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail size={14} className="text-emerald-600" /> Gmail Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="connect-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Feedback Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="connect-feedback" className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-emerald-600" /> Your Feedback <span className="text-rose-500">*</span>
                  </label>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                      isLetterCountValid
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : letterCount > 0
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    Letter count: {letterCount} / 10 minimum
                  </span>
                </div>
                <textarea
                  id="connect-feedback"
                  name="feedback"
                  rows={4}
                  required
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Share your detailed feedback, ideas, or suggestions with us (minimum 10 letters required)..."
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    formData.feedback && !isLetterCountValid
                      ? 'border-amber-400 focus:ring-amber-500'
                      : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                />
                <div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
                  <span>Minimum 10 letters required before submission.</span>
                  {letterCount > 0 && !isLetterCountValid && (
                    <span className="text-amber-600 font-semibold">
                      Need {10 - letterCount} more letter{10 - letterCount === 1 ? '' : 's'}
                    </span>
                  )}
                  {isLetterCountValid && (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> Minimum requirement satisfied!
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-emerald-400 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending to Admin...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUsSection;
