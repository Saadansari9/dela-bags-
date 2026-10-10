'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check (if filled by bot, silently return)
    if (honeypot.length > 0) {
      console.warn('Spam submission detected by honeypot.');
      return;
    }

    if (!form.firstName || !form.email || !form.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Trigger Google Analytics key event if available
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (event: string, action: string, data: Record<string, unknown>) => void }).gtag) {
        (window as unknown as { gtag: (event: string, action: string, data: Record<string, unknown>) => void }).gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'Message Submitted',
        });
      }
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 uppercase">Contact Us</h1>
        <div className="h-0.5 w-16 bg-black mx-auto mt-2 mb-4"></div>
        <p className="text-neutral-600 text-sm max-w-2xl mx-auto font-light">
          We&apos;re here to assist you with order inquiries, wholesale, or product styling advice. Send us a message and our atelier team will respond promptly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6 font-heading uppercase text-black">Send a Message</h2>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-500 p-8 text-center space-y-4 animate-in fade-in duration-300">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="font-heading text-xl font-bold text-green-900 uppercase">Thank You For Reaching Out!</h3>
              <p className="text-xs text-green-800 leading-relaxed max-w-sm mx-auto">
                Your message has been received. Our team will get back to you within 24 hours at <strong>{form.email}</strong>.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                }}
                variant="outline"
                className="rounded-none border-green-700 text-green-900 text-xs font-bold uppercase"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Spam Protection Honeypot Field (Hidden) */}
              <div className="hidden" aria-hidden="true">
                <Input
                  type="text"
                  name="website_url_hp"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-xs uppercase font-bold text-neutral-700">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="e.g. Ananya"
                    className="rounded-none border-neutral-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-xs uppercase font-bold text-neutral-700">Last Name</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="e.g. Sharma"
                    className="rounded-none border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs uppercase font-bold text-neutral-700">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ananya@example.com"
                  className="rounded-none border-neutral-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs uppercase font-bold text-neutral-700">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="rounded-none border-neutral-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs uppercase font-bold text-neutral-700">Message *</Label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-neutral-300 bg-white p-3 text-xs focus:outline-none focus:border-black rounded-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-xs font-bold uppercase tracking-[0.2em]"
              >
                {loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-green-700" />
                <span>Protected against spam. Your email stays 100% private.</span>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-[#FAF9F6] p-8 lg:p-12 border border-neutral-200">
          <h2 className="text-2xl font-bold mb-8 font-heading uppercase text-black">Contact Information</h2>
          <div className="space-y-6 text-xs text-neutral-700">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 border border-neutral-200">
                <MapPin className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase text-black">Our Atelier / Store</h3>
                <p className="text-neutral-500 mt-0.5">Haji Chawl, Morland Road,<br />Mumbai Central, Mumbai - 400008, Maharashtra, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white p-3 border border-neutral-200">
                <Phone className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase text-black">Phone & WhatsApp Support</h3>
                <p className="text-neutral-500 mt-0.5">Phone: +91 84258 45342<br />WhatsApp: +91 99300 09639</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white p-3 border border-neutral-200">
                <Mail className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase text-black">Email Address</h3>
                <p className="text-neutral-500 mt-0.5">DELAbags.service@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white p-3 border border-neutral-200">
                <Clock className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase text-black">Operating Hours</h3>
                <p className="text-neutral-500 mt-0.5">Monday - Saturday: 9:00 AM - 9:00 PM IST<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
