'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
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
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-wider uppercase">
            04 &mdash; Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let&apos;s work
            <br />
            <span className="text-gray-500">together.</span>
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
              Have an idea, a project, or just want to say hello? I&apos;d love
              to hear from you. Drop me a message and I&apos;ll get back to you
              as soon as possible.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:hello@georgevalandis.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all duration-300">
                  <Mail size={18} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    hello@georgevalandis.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-300">Germany</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors duration-300"
                >
                  {platform}
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
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-400 mb-2 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-400 mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-400 mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="group w-full sm:w-auto px-8 py-4 bg-indigo-500 hover:bg-indigo-400 disabled:bg-emerald-500 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
