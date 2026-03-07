'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

type ContactProps = {
  locale: SiteLocale;
};

export default function Contact({ locale }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const copy = getSiteCopy(locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('sending');
    setFeedbackMessage('');

    try {
      const response = await fetch('/contact/send.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          website: '',
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'send_failed');
      }

      setSubmissionState('success');
      setFeedbackMessage(copy.contact.form.submitted);
      setFormData({ name: '', email: '', message: '' });
      window.setTimeout(() => {
        setSubmissionState('idle');
        setFeedbackMessage('');
      }, 4000);
    } catch {
      setSubmissionState('error');
      setFeedbackMessage(copy.contact.form.error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-amber-400 font-mono text-sm mb-3 tracking-wider uppercase">
            {copy.contact.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {copy.contact.titleTop}
            <br />
            <span className="text-gray-500">{copy.contact.titleBottom}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              {copy.contact.description}
            </p>

            <div className="space-y-6">
              <a
                href="mailto:info@georgevalandis.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-all duration-300">
                  <Mail size={18} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{copy.contact.emailLabel}</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    info@georgevalandis.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{copy.contact.locationLabel}</p>
                  <p className="text-gray-300">{copy.contact.locationValue}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { label: 'X / Twitter', href: 'https://x.com/georgevalandis' },
                { label: 'Instagram', href: 'https://instagram.com/georgevalandis' },
                { label: 'Threads', href: 'https://threads.net/@georgevalandis' },
                { label: 'TikTok', href: 'https://tiktok.com/@georgevalandis' },
                { label: 'Bluesky', href: 'https://bsky.app/profile/georgevalandis.bsky.social' },
              ].map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors duration-300"
                >
                  {platform.label}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                  className="block text-sm text-gray-400 mb-2 font-medium"
                >
                    {copy.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={copy.contact.form.namePlaceholder}
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25 outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                  className="block text-sm text-gray-400 mb-2 font-medium"
                >
                    {copy.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={copy.contact.form.emailPlaceholder}
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-400 mb-2 font-medium"
                >
                  {copy.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={copy.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25 outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submissionState === 'sending' || submissionState === 'success'}
                className="group w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-emerald-500 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                {submissionState === 'success' ? (
                  copy.contact.form.submitted
                ) : submissionState === 'sending' ? (
                  copy.contact.form.sending
                ) : (
                  <>
                    {copy.contact.form.submit}
                    <Send
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </>
                )}
              </button>
              {feedbackMessage ? (
                <p
                  className={`text-sm ${
                    submissionState === 'error' ? 'text-rose-300' : 'text-emerald-300'
                  }`}
                >
                  {feedbackMessage}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
