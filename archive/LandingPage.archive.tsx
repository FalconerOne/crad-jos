'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { useSettings } from '@/lib/useSettings';
import {
  Phone,
  Mail,
  MapPin,
  Activity,
  Scan,
  Heart,
  Brain,
  Baby,
  Shield,
  Microscope,
  Zap,
  ChevronRight,
  Sparkles,
  ArrowUp,
} from 'lucide-react';

/* ─── CRAD Brand Colors ──────────────────────────────────────────────────
   Primary:     #A855F7 (vivid purple)
   Primary Light: #C084FC (light purple)
   Soft Purple:  #E9D5FF
   Deep Purple:  #7C3AED
   Dark Purple:  #6D28D9
   Violet:      #8B5CF6 (violet accent)
   Violet Light: #A78BFA
   Violet Pale:  #C4B5FD
   Violet Muted: #6366F1
   Near-black bg: #0A0A0F, #0D0D12, #12121A, #1A1A24
   Charcoal:    #2A2A36
   Dark Grey:   #3D3D50
   Medium Grey: #6B6B80
   Light Grey:  #B0B0C0
   Muted text:  #8E8EA0
   ─────────────────────────────────────────────────────────────────────────── */

/* ─── Service Data ──────────────────────────────────────────────────────── */

type ServiceCategory = 'imaging' | 'lab';

interface ServiceItem {
  name: string;
  icon: typeof Activity;
  description: string;
  category: ServiceCategory;
}

const services: ServiceItem[] = [
  { name: 'MRI', icon: Brain, description: 'Magnetic Resonance Imaging for detailed body scans', category: 'imaging' },
  { name: 'Digital Mammography', icon: Heart, description: 'Advanced breast imaging with digital precision', category: 'imaging' },
  { name: 'CT Scan', icon: Activity, description: 'Computed Tomography for cross-sectional imaging', category: 'imaging' },
  { name: 'Digital X-Ray', icon: Scan, description: 'High-resolution digital radiography services', category: 'imaging' },
  { name: 'Ultrasound Scan', icon: Baby, description: 'Real-time imaging using sound wave technology', category: 'imaging' },
  { name: 'X-Ray Imaging', icon: Shield, description: 'Comprehensive X-ray imaging solutions', category: 'imaging' },
  { name: 'X-Ray Special Procedures', icon: Zap, description: 'Specialized fluoroscopic and contrast studies', category: 'imaging' },
  { name: 'Laboratory Services', icon: Microscope, description: 'Full-range clinical pathology and diagnostics', category: 'lab' },
  { name: 'EEG', icon: Brain, description: 'Electroencephalography for brain activity monitoring', category: 'lab' },
  { name: 'ECG', icon: Heart, description: 'Electrocardiography for cardiac rhythm analysis', category: 'lab' },
  { name: 'Echocardiogram', icon: Activity, description: 'Ultrasound imaging of the heart structure and function', category: 'lab' },
];

const galleryItems = [
  { title: 'Mammography', icon: Scan, subtitle: 'Digital Breast Imaging' },
  { title: '4D Ultrasound', icon: Baby, subtitle: 'Real-Time 4D Imaging' },
  { title: 'X-Ray Room', icon: Shield, subtitle: 'Advanced Radiography Suite' },
  { title: 'MRI Room', icon: Activity, subtitle: 'High-Field MRI Suite' },
];

/* Floating particles for the hero — purple & violet mix */
const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.1 + 2) % 96}%`,
  top: `${(i * 6.2 + 8) % 88}%`,
  delay: `${i * 0.28}s`,
  duration: `${3 + (i % 5)}s`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
  color: i % 3 === 0 ? 'rgba(168, 85, 247, 0.55)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.5)' : 'rgba(233, 213, 255, 0.4)',
}));

/* ═══════════════════════════════════════════════════════════════════════════
   Landing Page — Purple/Grey/Black Premium Dark Theme
   ═══════════════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const navigate = useAppStore((s) => s.navigate);
  const settings = useSettings();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      setShowScrollTop(maxScroll > 0 && scrollTop >= maxScroll * 0.8);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0F' }}>

      {/* ═══════════════════════════════════════════════════════════════════
          Header — Dark Glass with Purple→Violet Accent Line
          ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-20 lp-header-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
              aria-label="Scroll to top"
            >
              <div
                className="w-10 h-10 rounded-xl overflow-hidden p-0.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(139,92,246,0.25))',
                  border: '1px solid rgba(168,85,247,0.2)',
                }}
              >
                <img
                  src={settings.companyLogo || '/icon-512.png'}
                  alt="CRAD"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: '#FFFFFF' }}>
                  Diagnostic Services
                </h1>
                <p
                  className="text-[10px] sm:text-[11px] mt-0.5 hidden sm:block tracking-wide uppercase"
                  style={{ color: '#6B6B80' }}
                >
                  Advanced Medical Imaging &amp; Laboratory Services
                </p>
              </div>
            </button>
          </div>
        </div>
        {/* Purple→Violet accent line */}
        <div
          className="h-[2px] w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #A855F7 15%, #8B5CF6 50%, #A855F7 85%, transparent 100%)' }}
        />
      </header>

      <main ref={mainRef} className="flex-1">

        {/* ═══════════════════════════════════════════════════════════════════
            Hero — Near-Black with Purple/Violet Radial Glows, Stars, Particles
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden flex items-center" style={{ minHeight: '100vh', background: '#0A0A0F' }}>

          {/* Star field background */}
          <div className="star-field" />

          {/* Animated purple/violet radial glow orbs */}
          <div
            className="lp-orb animate-orb-1"
            style={{
              width: '550px',
              height: '550px',
              top: '-12%',
              left: '-8%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)',
            }}
          />
          <div
            className="lp-orb animate-orb-2"
            style={{
              width: '450px',
              height: '450px',
              top: '25%',
              right: '-10%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 70%)',
              filter: 'blur(140px)',
            }}
          />
          <div
            className="lp-orb animate-orb-3"
            style={{
              width: '500px',
              height: '500px',
              bottom: '-8%',
              left: '25%',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)',
              filter: 'blur(150px)',
            }}
          />

          {/* Floating particles — purple & violet mix */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="lp-particle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                animation: `float-particle ${p.duration} ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}

          {/* Radial vignette center glow — purple/violet tinted */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center">

            {/* Small label — Purple/Violet */}
            <div className="animate-fade-up flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #A855F7)' }} />
              <span
                className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gradient-gold"
              >
                Premium Diagnostics
              </span>
              <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, #8B5CF6, transparent)' }} />
            </div>

            {/* Main headline — "Diagnostic Care" in gold-to-purple gradient */}
            <h2 className="animate-fade-up text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] max-w-4xl mx-auto tracking-tight">
              <span className="text-gradient-hero">
                State-of-the-Art
              </span>
              <br />
              <span className="text-gradient-hero">
                Diagnostic Care
              </span>{' '}
              <span style={{ color: '#FFFFFF' }}>
                You Can Trust
              </span>
            </h2>

            <p className="animate-fade-up-delay-1 mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8E8EA0' }}>
              Comprehensive medical imaging and laboratory services powered by cutting-edge
              technology and a team of experienced professionals dedicated to your health.
            </p>

            {/* Location badge — links to staff portal */}
            <button
              onClick={() => navigate('login')}
              className="animate-fade-up-delay-2 mt-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2 bg-transparent border-0 p-0 cursor-default"
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.12)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-glow-pulse" style={{ background: '#A855F7' }} />
              <span className="text-sm font-medium" style={{ color: '#B0B0C0' }}>
                Jos, Plateau State, Nigeria
              </span>
            </button>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('patient-login')}
                className="cta-glow group w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                  text-white font-semibold px-8 py-4 rounded-xl text-base"
              >
                <Sparkles className="w-5 h-5" />
                Visit Patient Portal
                <ChevronRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href="tel:08146844470"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                  font-medium px-8 py-4 rounded-xl text-base transition-all duration-300"
                style={{
                  background: 'rgba(34, 197, 94, 0.18)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  color: '#ECFDF5',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.28)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.12), 0 0 30px rgba(168, 85, 247, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.18)';
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>

            {/* Trust indicators with purple shimmer */}
            <div className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold shimmer-text">10+</p>
                <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: '#6B6B80' }}>
                  Years Experience
                </p>
              </div>
              <div className="w-px h-10 hidden sm:block" style={{ background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))' }} />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold shimmer-text">N5K+</p>
                <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: '#6B6B80' }}>
                  Patients Served
                </p>
              </div>
              <div className="w-px h-10 hidden sm:block" style={{ background: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))' }} />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold shimmer-text">11</p>
                <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: '#6B6B80' }}>
                  Diagnostic Services
                </p>
              </div>
            </div>
          </div>

          {/* Bottom gradient divider — smooth transition */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #0A0A0F, transparent)',
            }}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            Services — Dark Glassmorphism Glow Cards on #111118 (Purple Outlines)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 relative lp-mesh-bg">
          {/* Subtle purple orb accent */}
          <div
            className="lp-orb"
            style={{
              width: '350px',
              height: '350px',
              top: '10%',
              right: '-5%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lp-section-reveal">
              <span
                className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: '#A78BFA' }}
              >
                Our Services
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span style={{ color: '#FFFFFF' }}>Comprehensive Diagnostic </span>
                <span className="text-gradient-pink">Solutions</span>
              </h3>
              <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#8E8EA0' }}>
                We offer a full range of advanced medical imaging and laboratory services
                to support accurate diagnosis and effective treatment planning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lp-section-reveal lp-section-reveal-delay-1">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isLab = service.category === 'lab';
                return (
                  <div
                    key={service.name}
                    className="glow-card p-5 sm:p-6 cursor-default"
                    style={{ animationDelay: `${index * 0.07}s` }}
                  >
                    <div
                      className="lp-icon-container w-11 h-11 rounded-xl flex items-center justify-center mb-4
                        group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: isLab ? '#A78BFA' : '#C084FC' }}
                      />
                    </div>
                    <h4 className="font-semibold text-base mb-1.5" style={{ color: '#FFFFFF' }}>
                      {service.name}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#8E8EA0' }}>
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="lp-section-divider" />

        {/* ═══════════════════════════════════════════════════════════════════
            Gallery — Dark Glass Cards on #0D0D12
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 relative" style={{ background: '#0D0D12' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lp-section-reveal">
              <span
                className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: '#A78BFA' }}
              >
                Our Facilities
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span style={{ color: '#FFFFFF' }}>Modern </span>
                <span className="text-gradient-pink">Equipment &amp; Facilities</span>
              </h3>
              <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#8E8EA0' }}>
                Our diagnostic center is equipped with state-of-the-art medical imaging
                technology to ensure accurate and reliable results.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lp-section-reveal lp-section-reveal-delay-1">
            <div className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto scrollbar-hide pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
              {galleryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="lp-gallery-card flex-shrink-0 w-[280px] sm:w-[300px] lg:w-auto
                      relative aspect-[4/3] cursor-default snap-start"
                  >
                    <div className="relative h-full flex flex-col items-center justify-center p-6">
                      <div className="lp-icon-container w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300">
                        <Icon className="w-7 h-7" style={{ color: '#A78BFA' }} />
                      </div>
                      <h4 className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>
                        {item.title}
                      </h4>
                      <p className="text-sm mt-1" style={{ color: '#8E8EA0' }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="lp-section-divider" />

        {/* ═══════════════════════════════════════════════════════════════════
            Contact — Dark Glass Cards with Purple Glow on Hover
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 relative" style={{ background: '#0A0A0F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lp-section-reveal">
              <span
                className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ color: '#A78BFA' }}
              >
                Get In Touch
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span style={{ color: '#FFFFFF' }}>Contact </span>
                <span className="text-gradient-pink">Information</span>
              </h3>
              <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#8E8EA0' }}>
                Have questions or need to schedule an appointment? Reach out to us
                through any of the channels below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto lp-section-reveal lp-section-reveal-delay-1">
              {/* Phone */}
              <div className="lp-contact-card p-6 text-center">
                <div
                  className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '1px solid rgba(168, 85, 247, 0.08)',
                  }}
                >
                  <Phone className="w-5 h-5 transition-colors duration-300" style={{ color: '#6B6B80' }} />
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>Phone</h4>
                <a
                  href="tel:08146844470"
                  className="block text-sm transition-colors duration-300"
                  style={{ color: '#B0B0C0' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C084FC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#B0B0C0'; }}
                >
                  0814 684 4470
                </a>
                <a
                  href="tel:+2349032951828"
                  className="block text-sm mt-1 transition-colors duration-300"
                  style={{ color: '#B0B0C0' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C084FC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#B0B0C0'; }}
                >
                  +234 903 295 1828
                </a>
              </div>

              {/* Email */}
              <div className="lp-contact-card p-6 text-center">
                <div
                  className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '1px solid rgba(168, 85, 247, 0.08)',
                  }}
                >
                  <Mail className="w-5 h-5 transition-colors duration-300" style={{ color: '#6B6B80' }} />
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>Email</h4>
                <a
                  href="mailto:craddiagnostics@gmail.com"
                  className="break-all text-sm transition-colors duration-300"
                  style={{ color: '#B0B0C0' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C084FC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#B0B0C0'; }}
                >
                  craddiagnostics@gmail.com
                </a>
              </div>

              {/* Address */}
              <div className="lp-contact-card p-6 text-center">
                <div
                  className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '1px solid rgba(168, 85, 247, 0.08)',
                  }}
                >
                  <MapPin className="w-5 h-5 transition-colors duration-300" style={{ color: '#6B6B80' }} />
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>Address</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#8E8EA0' }}>
                  No. 3 Keana Road Off National Library,<br />
                  Jos, Plateau State,<br />
                  Nigeria
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          Footer — Deepest Black #0A0A0F
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="relative">
        {/* Purple→Violet gradient accent line */}
        <div
          className="h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #A855F7 20%, #8B5CF6 50%, #A855F7 80%, transparent 100%)' }}
        />

        <div style={{ background: '#0A0A0F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <Activity className="w-4 h-4" style={{ color: '#A855F7' }} />
              <span className="font-semibold text-sm" style={{ color: '#B0B0C0' }}>
                Diagnostic Services
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#6B6B80' }}>
              &copy; {new Date().getFullYear()} Diagnostic Services. Developed by{' '}
              <a href="https://falconerone.com.ng" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#E9D5FF' }}>FalconerOne Technologies</a>
            </p>
            <button
              type="button"
              onClick={() => navigate('login')}
              className="mt-2 text-xs transition-colors duration-300"
              style={{ color: '#6B6B80' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C084FC'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B80'; }}
            >
              Staff
            </button>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          Scroll-to-Top Button — Dark Glass with Purple Icon
          ═══════════════════════════════════════════════════════════════════ */}
      {showScrollTop && (
        <button
          onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-btn lp-scroll-top fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
            flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}