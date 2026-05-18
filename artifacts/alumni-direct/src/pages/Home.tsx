import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useSpring,
  LayoutGroup,
  MotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ShieldCheck,
  Lock,
  Activity,
  Server,
  FileCheck,
  CheckCircle,
  BarChart,
  Users,
  Settings,
  ArrowRight,
  Database,
  Globe,
  Briefcase,
  Zap,
} from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Individual tilt card component so each card has its own mouse state
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (cy / (rect.height / 2)) * -6, y: (cx / (rect.width / 2)) * 6 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Ambient orb that drifts continuously
function DriftOrb({ x, y, size, color, delay }: { x: string; y: string; size: string; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
        scale: [1, 1.08, 0.95, 1.05, 1],
        opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
      }}
      transition={{ duration: 18 + delay * 4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ── Motion values ──────────────────────────────────────────────
  const scrollY = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 300 });

  // Pre-compute blur filters (never call useTransform inside JSX render)
  const bgBlurFilter = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    ["blur(4px)", "blur(1.5px)", "blur(4px)"]
  );
  const midBlurFilter = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    ["blur(2px)", "blur(0px)", "blur(2px)"]
  );

  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const heroBgMX = useTransform(smoothMouseX, [-1, 1], ["-20px", "20px"]);
  const heroBgMY = useTransform(smoothMouseY, [-1, 1], ["-12px", "12px"]);
  const heroMidMX = useTransform(smoothMouseX, [-1, 1], ["-10px", "10px"]);
  const heroMidMY = useTransform(smoothMouseY, [-1, 1], ["-8px", "8px"]);
  const heroFgMX = useTransform(smoothMouseX, [-1, 1], ["-5px", "5px"]);
  const heroFgMY = useTransform(smoothMouseY, [-1, 1], ["-4px", "4px"]);

  // ── Section refs ──────────────────────────────────────────────
  const heroRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── Scroll progress per section ───────────────────────────────
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: platformProgress } = useScroll({ target: platformRef, offset: ["start end", "end start"] });
  const { scrollYProgress: showcaseProgress } = useScroll({ target: showcaseRef, offset: ["start end", "end start"] });
  const { scrollYProgress: featuresProgress } = useScroll({ target: featuresRef, offset: ["start end", "end start"] });
  const { scrollYProgress: caseProgress } = useScroll({ target: caseStudiesRef, offset: ["start end", "end start"] });
  const { scrollYProgress: securityProgress } = useScroll({ target: securityRef, offset: ["start end", "end start"] });
  const { scrollYProgress: ctaProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });

  // ── Parallax transforms ───────────────────────────────────────
  // Hero (3 depths)
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "-25%"]);
  const heroMidY = useTransform(heroProgress, [0, 1], ["0%", "-12%"]);
  const heroFgY = useTransform(heroProgress, [0, 1], ["0%", "-6%"]);
  const heroDashY = useTransform(heroProgress, [0, 1], ["0%", "-10%"]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.96]);

  // Platform
  const platformBgY = useTransform(platformProgress, [0, 1], ["5%", "-10%"]);
  const platformContentY = useTransform(platformProgress, [0, 0.5], ["20px", "0px"]);

  // Showcase
  const showcaseDashY = useTransform(showcaseProgress, [0.1, 0.9], ["4%", "-8%"]);
  const showcaseBgY = useTransform(showcaseProgress, [0, 1], ["0%", "-20%"]);

  // Features
  const featuresBgY = useTransform(featuresProgress, [0, 1], ["5%", "-8%"]);

  // Case studies
  const caseBgY = useTransform(caseProgress, [0, 1], ["5%", "-10%"]);

  // Security
  const securityBgY = useTransform(securityProgress, [0, 1], ["5%", "-8%"]);
  const securityContentY = useTransform(securityProgress, [0.1, 0.6], ["30px", "0px"]);

  // CTA
  const ctaBgY = useTransform(ctaProgress, [0, 1], ["5%", "-15%"]);

  // ── Effects ───────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseX.set((e.clientX / w - 0.5) * 2);
    mouseY.set((e.clientY / h - 0.5) * 2);
  }, [mouseX, mouseY, isMobile]);

  const particles = useMemo(() =>
    Array.from({ length: 28 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 5,
      size: Math.random() > 0.5 ? 1.5 : 1,
    })), []);

  const heroWords = "Clinical infrastructure for the next decade.".split(" ");

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/30">

      {/* ── 1. NAV ────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-border/60 py-3 shadow-sm shadow-border/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group" data-testid="nav-home">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-xl tracking-tight">
              Alumni<span className="text-primary">Direct</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#platform" className="hover:text-primary transition-colors duration-200" data-testid="nav-platform">Platform</a>
            <a href="#showcase" className="hover:text-primary transition-colors duration-200" data-testid="nav-solutions">Solutions</a>
            <a href="#case-studies" className="hover:text-primary transition-colors duration-200" data-testid="nav-cases">Case Studies</a>
            <a href="#enterprise" className="hover:text-primary transition-colors duration-200" data-testid="nav-enterprise">Enterprise</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex hover:bg-primary/5 text-sm" data-testid="btn-signin">
              Sign In
            </Button>
            <Button className="font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/45 hover:scale-105 transition-all duration-300 text-sm" data-testid="btn-demo">
              Request Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO ───────────────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ scale: heroScale }}
      >
        {/* Layer 0 – Background glow orbs, slowest, blurred */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ y: heroBgY, x: isMobile ? 0 : heroBgMX, filter: bgBlurFilter, willChange: "transform" }}
        >
          <div className="absolute top-[5%] left-[5%] w-[45rem] h-[45rem] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(212 80% 45% / 0.12) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(195 85% 55% / 0.10) 0%, transparent 70%)" }} />
          <div className="absolute top-[50%] left-[40%] w-[25rem] h-[25rem] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(212 80% 45% / 0.06) 0%, transparent 70%)" }} />

          {/* Pulsing rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute top-[20%] right-[15%] rounded-full border border-primary/10"
              style={{ width: `${i * 120}px`, height: `${i * 120}px`, marginLeft: `-${i * 60}px`, marginTop: `-${i * 60}px` }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* Layer 1 – Midground grid */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ y: heroMidY, x: isMobile ? 0 : heroMidMX, filter: midBlurFilter, willChange: "transform" }}
        >
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "url('/grid-pattern.svg')", backgroundSize: "20px 20px" }} />
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30" />
          {/* Drifting ambient orbs */}
          <DriftOrb x="15%" y="60%" size="180px" color="radial-gradient(circle, hsl(195 85% 55% / 0.07) 0%, transparent 70%)" delay={0} />
          <DriftOrb x="70%" y="20%" size="140px" color="radial-gradient(circle, hsl(212 80% 45% / 0.06) 0%, transparent 70%)" delay={3} />
        </motion.div>

        {/* Layer 2 – Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-28 pb-20 md:pt-40 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <motion.div
              style={{ y: heroFgY, x: isMobile ? 0 : heroFgMX, willChange: "transform" }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                AlumniDirect Enterprise v2.0
              </motion.div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-foreground leading-[1.02] mb-8">
                {heroWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease }}
                    className="inline-block mr-[0.22em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1, ease }}
                className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl"
              >
                The unified healthcare product ecosystem designed for scale. We help leading health systems discover, deploy, and manage clinical tools with absolute precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <Button size="lg" className="text-base h-14 px-8 shadow-xl shadow-primary/25 hover:shadow-primary/45 hover:scale-[1.02] transition-all duration-300 group" data-testid="hero-cta-demo">
                  Request Enterprise Demo
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </motion.span>
                </Button>
                <Button size="lg" variant="outline" className="text-base h-14 px-8 border-border hover:bg-muted hover:border-primary/30 transition-all duration-300" data-testid="hero-cta-arch">
                  View Platform Architecture
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease, delay: 0.5 }}
              style={{ y: heroDashY, willChange: "transform" }}
              className="relative hidden lg:block"
            >
              {/* Glow aura */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-primary/15 to-transparent rounded-3xl blur-[60px] scale-110" />

              <motion.div
                animate={{ rotateY: -8, rotateX: 3 }}
                transition={{ type: "spring", damping: 30 }}
                className="relative bg-[#09090c]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_48px_100px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)] p-6 overflow-hidden text-white transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Scanline */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none z-30"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                <div className="flex items-center justify-between mb-6 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[10px] font-mono text-white/40 tracking-widest">SYS.STATUS // SECURE</div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 mb-1 uppercase tracking-wider">Active FHIR Nodes</div>
                      <div className="text-2xl font-display font-semibold tracking-tight">1,204</div>
                      <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: "0%" }} animate={{ width: "85%" }} transition={{ duration: 1.8, delay: 1.2, ease }} className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 mb-1 uppercase tracking-wider">Compliance Score</div>
                      <div className="text-2xl font-display font-semibold text-cyan-400 tracking-tight">99.8%</div>
                      <div className="mt-3 flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map(i => (
                          <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.2 + i * 0.08, ease }} className="h-2 flex-1 bg-gradient-to-t from-primary to-cyan-400 rounded-full origin-bottom" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="h-36 bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 relative overflow-hidden">
                    <div className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">Utilization Telemetry</div>
                    <svg className="absolute inset-x-0 bottom-0 w-full h-[calc(100%-24px)]" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(212 80% 45%)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="hsl(212 80% 45%)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 80 Q 60 50 120 65 T 240 40 T 360 55 T 480 20 L 480 110 L 0 110 Z" fill="url(#chartGrad)" />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.2, delay: 1.5, ease }}
                        d="M0 80 Q 60 50 120 65 T 240 40 T 360 55 T 480 20"
                        fill="none" stroke="hsl(212 80% 45%)" strokeWidth="2.5" strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating chips */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-8 bg-black/70 backdrop-blur-xl p-3 rounded-2xl border border-white/[0.12] shadow-2xl z-20 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-emerald-400" /></div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">SOC 2 Verified</div>
                    <div className="text-[10px] text-white/40">Continuous sync</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-4 bottom-12 bg-black/70 backdrop-blur-xl p-3 rounded-2xl border border-white/[0.12] shadow-2xl z-20 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center"><Database className="w-4 h-4 text-cyan-400" /></div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">Epic Connected</div>
                    <div className="text-[10px] text-white/40">12ms latency</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-5, 10, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-2 top-1/3 bg-black/70 backdrop-blur-xl p-3 rounded-2xl border border-white/[0.12] shadow-2xl z-20 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Zap className="w-4 h-4 text-primary" /></div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">HL7 FHIR</div>
                    <div className="text-[10px] text-white/40">R4 compliant</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Bottom mask */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </motion.section>

      {/* ── 3. TRUST STRIP ───────────────────────────────────── */}
      <section className="py-12 border-y border-border/60 bg-muted/20 overflow-hidden relative">
        <p className="text-center text-[10px] font-semibold tracking-[0.2em] text-muted-foreground mb-8 uppercase">
          Trusted by enterprise health systems & compliant with
        </p>
        <div className="marquee-wrapper w-full">
          <div className="marquee-track gap-16 md:gap-24">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex gap-16 md:gap-24 items-center opacity-50 hover:opacity-80 transition-opacity duration-500">
                {[
                  { icon: ShieldCheck, label: "HIPAA Compliant" },
                  { icon: Lock, label: "SOC 2 Type II" },
                  { icon: Server, label: "HL7 FHIR" },
                  { icon: CheckCircle, label: "ISO 27001" },
                  { icon: FileCheck, label: "FDA 21 CFR" },
                  { icon: Globe, label: "GDPR Ready" },
                  { icon: Zap, label: "HITRUST CSF" },
                ].map((item, i) => (
                  <div key={`${j}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
                    <item.icon className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="font-display font-semibold text-sm tracking-wide">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PLATFORM OVERVIEW ─────────────────────────────── */}
      <section id="platform" ref={platformRef} className="py-24 md:py-36 relative overflow-hidden">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ y: platformBgY, willChange: "transform", backgroundImage: "url('/grid-pattern.svg')", backgroundSize: "20px 20px" }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: platformBgY, willChange: "transform" }}
        >
          <DriftOrb x="80%" y="10%" size="300px" color="radial-gradient(circle, hsl(212 80% 45% / 0.06) 0%, transparent 70%)" delay={1} />
          <DriftOrb x="5%" y="50%" size="250px" color="radial-gradient(circle, hsl(195 85% 55% / 0.05) 0%, transparent 70%)" delay={2} />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="max-w-3xl mx-auto text-center mb-20 md:mb-28"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight leading-[1.05]">
              The intelligence layer for clinical adoption.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We replace fragmented vendor portals and manual compliance checks with a unified, secure ecosystem that accelerates time-to-value for new healthcare products.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Activity, title: "Clinical Workflow Intelligence", desc: "Map, analyze, and optimize product deployment across clinical departments with real-time utilization telemetry." },
              { icon: ShieldCheck, title: "Enterprise-Grade Security", desc: "Zero-trust architecture with automated compliance verification, ensuring every integrated tool meets strict hospital standards." },
              { icon: Database, title: "Seamless EHR Integration", desc: "Native bidirectional sync with Epic, Cerner, and Meditech via secure FHIR endpoints and SMART on FHIR." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -10, boxShadow: "0 32px 64px rgba(37,99,235,0.12)" }}
                transition={{ duration: 0.85, delay: i * 0.12, ease }}
                className="bg-card p-8 rounded-2xl border border-border transition-shadow duration-300 transform-gpu group"
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/15 transition-colors duration-300"
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 font-display leading-snug">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRODUCT SHOWCASE ──────────────────────────────── */}
      <section id="showcase" ref={showcaseRef} className="py-24 md:py-36 overflow-hidden bg-[#050810] text-white relative">
        {/* Layered fog */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#050810] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050810] to-transparent z-20 pointer-events-none" />

        {/* Drifting bg orbs */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: showcaseBgY, willChange: "transform" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] rounded-full"
            style={{ background: "radial-gradient(ellipse, hsl(212 80% 45% / 0.12) 0%, transparent 60%)" }} />
          <DriftOrb x="10%" y="20%" size="200px" color="radial-gradient(circle, hsl(195 85% 55% / 0.06) 0%, transparent 70%)" delay={0} />
          <DriftOrb x="75%" y="65%" size="160px" color="radial-gradient(circle, hsl(212 80% 45% / 0.06) 0%, transparent 70%)" delay={2} />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight"
          >
            Command your clinical stack.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.8, ease }}
            className="text-base md:text-lg text-white/50 max-w-2xl mx-auto"
          >
            A singular pane of glass for CTOs and Medical Officers to govern every digital health asset.
          </motion.p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <motion.div
            initial={{ scale: 0.86, opacity: 0, rotateX: 10, y: 40 }}
            whileInView={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.3, ease }}
            viewport={{ once: true, margin: "-80px" }}
            style={{ y: showcaseDashY, boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 0 100px rgba(37,99,235,0.2), 0 60px 120px rgba(0,0,0,0.5)", willChange: "transform" }}
            className="relative w-full aspect-[16/9] bg-[#0A0B0E] rounded-2xl overflow-hidden flex transform-gpu"
          >
            {/* Sidebar */}
            <div className="w-56 border-r border-white/[0.06] bg-white/[0.015] hidden md:flex flex-col flex-shrink-0">
              <div className="p-5 border-b border-white/[0.06] flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-primary/20 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="text-sm font-semibold tracking-wide">Enterprise</div>
              </div>
              <div className="p-3 space-y-1 flex-1">
                {[{ icon: BarChart, label: "Overview", active: true }, { icon: Users, label: "Clinicians" }, { icon: ShieldCheck, label: "Compliance" }, { icon: Settings, label: "Settings" }].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors ${item.active ? "bg-primary/20 text-primary font-medium" : "text-white/40 hover:bg-white/5 hover:text-white"}`}>
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="h-14 border-b border-white/[0.06] flex items-center px-5 justify-between bg-white/[0.02] flex-shrink-0">
                <div className="text-xs font-medium text-white/60 truncate">Command Center / Overview</div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-[10px] text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />System Nominal
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="flex-1 p-5 grid grid-cols-12 gap-4 overflow-hidden">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                  <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 relative overflow-hidden">
                    <div className="text-xs font-semibold text-white/50 mb-4 uppercase tracking-wider">Platform Utilization Telemetry</div>
                    <svg className="absolute inset-x-0 bottom-0 w-full h-[75%]" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(212 80% 45%)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="hsl(212 80% 45%)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 90 L 0 50 Q 100 20 200 38 T 400 28 T 600 55 T 800 18 L 800 90 Z" fill="url(#dash-grad)" />
                      <path d="M0 50 Q 100 20 200 38 T 400 28 T 600 55 T 800 18" fill="none" stroke="hsl(212 80% 45%)" strokeWidth="2.5" />
                    </svg>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-row lg:flex-col gap-4">
                  {[
                    { label: "Deployments", value: "48", sub: "+12% vs last month", color: "text-white" },
                    { label: "Clinicians", value: "12,492", sub: "Across 14 depts", color: "text-primary" },
                    { label: "Risk Alerts", value: "0", sub: "All systems clear", color: "text-emerald-400" },
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <div className="text-[10px] text-white/40 mb-1.5 uppercase tracking-wider">{stat.label}</div>
                      <div className={`text-3xl font-display font-semibold ${stat.color} leading-none`}>{stat.value}</div>
                      <div className="text-[10px] text-white/30 mt-1.5">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating status chips */}
            {[
              { pos: { top: "22%", left: "-1%" }, label: "FHIR Stream", delay: 1.0 },
              { pos: { top: "58%", right: "-1%" }, label: "Auth Sync", delay: 1.2 },
              { pos: { bottom: "12%", left: "12%" }, label: "Audit Log", delay: 1.4 },
            ].map((chip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: chip.delay, duration: 0.5, ease }}
                style={chip.pos}
                className="absolute bg-white/[0.08] backdrop-blur-md border border-white/[0.15] px-3 py-1.5 rounded-xl text-[11px] font-medium shadow-2xl z-30 hidden lg:block"
              >
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />{chip.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE FEATURES ─────────────────────────── */}
      <section id="features" ref={featuresRef} className="py-24 md:py-36 bg-background relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: featuresBgY, willChange: "transform" }}
        >
          <DriftOrb x="85%" y="30%" size="320px" color="radial-gradient(circle, hsl(212 80% 45% / 0.04) 0%, transparent 70%)" delay={1} />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-semibold mb-10 tracking-tight leading-[1.05]"
              >
                Capabilities designed for clinical reality.
              </motion.h2>

              <LayoutGroup>
                <div className="space-y-3">
                  {[
                    { title: "Patient Outcome Analytics", desc: "Correlate tool utilization with patient health metrics in real-time. Prove ROI on digital health spend instantly." },
                    { title: "Compliance Automation", desc: "Automated BAA generation, SOC 2 tracking, and continuous penetration test monitoring for all integrated vendors." },
                    { title: "Clinical Workflow Orchestration", desc: "Embed third-party applications directly into the clinician's natural EHR workflow without disruptive context switching." },
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className="w-full text-left p-6 rounded-2xl relative group focus:outline-none"
                      data-testid={`feature-tab-${i}`}
                    >
                      {activeTab === i && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-muted/60 rounded-2xl border border-border/80 shadow-sm"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.55 }}
                        />
                      )}
                      <div className="relative z-10">
                        <h3 className={`text-lg md:text-xl font-semibold mb-0 transition-colors duration-200 ${activeTab === i ? "text-primary" : "text-foreground group-hover:text-primary/70"}`}>
                          {tab.title}
                        </h3>
                        <AnimatePresence initial={false}>
                          {activeTab === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease }}
                              className="overflow-hidden"
                            >
                              <p className="text-muted-foreground pt-2 leading-relaxed text-sm md:text-base">{tab.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-2xl relative min-h-[420px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease }}
                  className="w-full max-w-xs relative z-10"
                >
                  {activeTab === 0 && (
                    <div className="space-y-6">
                      <div className="flex items-end gap-3 h-48 border-b border-border pb-2">
                        {[40, 70, 45, 90, 65, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-muted rounded-t-sm relative overflow-hidden">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.9, delay: i * 0.09, ease }}
                              className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-cyan-400 rounded-t-sm"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                        {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <span key={m}>{m}</span>)}
                      </div>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.12, ease }}
                          className="flex items-center justify-between p-5 bg-background rounded-xl border border-border shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-accent/10"><ShieldCheck className="w-5 h-5 text-accent" /></div>
                            <div className="font-medium text-sm">Vendor Audit 0{i}</div>
                          </div>
                          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[11px] text-primary font-semibold tracking-wide uppercase">Passed</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className="relative h-64 border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-background/50">
                      <div className="absolute top-1/2 left-[12%] w-14 h-14 bg-card border border-border shadow-lg rounded-2xl flex items-center justify-center text-primary z-10 -translate-y-1/2">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="absolute top-1/2 right-[12%] w-14 h-14 bg-card border border-border shadow-lg rounded-2xl flex items-center justify-center text-accent z-10 -translate-y-1/2">
                        <Database className="w-6 h-6" />
                      </div>
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.line
                          x1="26%" y1="50%" x2="74%" y2="50%"
                          stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>
                      <motion.div
                        animate={{ x: [-48, 48, -48] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_12px_hsl(var(--primary))]"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CASE STUDIES ─────────────────────────────────── */}
      <section id="case-studies" ref={caseStudiesRef} className="py-24 md:py-36 bg-muted/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: caseBgY, willChange: "transform" }}
        >
          <DriftOrb x="60%" y="5%" size="400px" color="radial-gradient(circle, hsl(212 80% 45% / 0.04) 0%, transparent 70%)" delay={0} />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight">Proven at Scale.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">See how leading institutions transformed their clinical operations.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Pacific Health Alliance", metric: "34%", label: "Reduction in Admin Burden", color: "from-blue-500/10 to-cyan-500/10", border: "group-hover:border-blue-500/30" },
              { name: "MedCore Systems", metric: "100%", label: "Compliance Automation", color: "from-indigo-500/10 to-primary/10", border: "group-hover:border-indigo-500/30" },
              { name: "Northeast Regional Health", metric: "2.4×", label: "Faster Product Deployment", color: "from-cyan-500/10 to-teal-500/10", border: "group-hover:border-cyan-500/30" },
            ].map((study, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.85, ease }}
              >
                <TiltCard className={`bg-card p-8 md:p-10 rounded-3xl border border-border shadow-lg hover:shadow-2xl relative overflow-hidden group cursor-pointer h-full transition-colors duration-500 ${study.border}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="text-xs font-semibold text-muted-foreground mb-5 tracking-widest uppercase">{study.name}</div>
                    <div className="text-6xl md:text-7xl font-display font-bold text-foreground mb-2 leading-none">{study.metric}</div>
                    <div className="text-base text-muted-foreground mb-8 leading-snug">{study.label}</div>
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                      Read case study <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SECURITY ─────────────────────────────────────── */}
      <section ref={securityRef} className="py-24 md:py-36 relative overflow-hidden bg-background border-y border-border">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url('/grid-pattern.svg')", backgroundSize: "20px 20px" }} />
        <div className="scan-line" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: securityBgY, willChange: "transform" }}
        >
          <DriftOrb x="5%" y="20%" size="350px" color="radial-gradient(circle, hsl(195 85% 55% / 0.05) 0%, transparent 70%)" delay={0} />
        </motion.div>

        <motion.div
          className="container mx-auto px-4 sm:px-6 relative z-10"
          style={{ y: securityContentY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
                <Lock className="w-3 h-3" /> Zero-Trust Architecture
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-semibold mb-6 tracking-tight leading-[1.05]">
                Security is our foundation, not a feature.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We meet the most stringent data protection requirements in healthcare. Every API call, every data sync, and every user action is encrypted, authenticated, and audited.
              </p>
              <ul className="space-y-4">
                {["End-to-end encryption (AES-256)", "Granular RBAC & Audit Logging", "Continuous Penetration Testing", "Data Residency Guarantees"].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, ease }}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: Lock, title: "SOC 2 Type II" },
                { icon: FileCheck, title: "HIPAA Compliant" },
                { icon: ShieldCheck, title: "HITRUST CSF" },
                { icon: Globe, title: "GDPR Ready" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,99,235,0.1)" }}
                  transition={{ delay: i * 0.1, type: "spring", damping: 18 }}
                  className="bg-card border border-border p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 cursor-default"
                >
                  <badge.icon className="w-8 h-8 text-primary mb-4" />
                  <div className="font-semibold text-sm">{badge.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 9. ENTERPRISE CTA ───────────────────────────────── */}
      <section id="enterprise" ref={ctaRef} className="py-28 md:py-40 relative overflow-hidden bg-primary text-primary-foreground">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: ctaBgY, willChange: "transform" }}>
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] rounded-full bg-white/10 blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-white/8 blur-[80px] translate-y-1/2 -translate-x-1/4" />
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/25"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size * 5}px`, height: `${p.size * 5}px` }}
              animate={{ y: [0, -35, 0], x: [0, (i % 2 === 0 ? 10 : -10), 0], opacity: [0.1, 0.55, 0.1] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.05] tracking-tight"
          >
            Ready to upgrade your clinical infrastructure?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.9, ease }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-12"
          >
            Join the leading health systems standardizing on AlumniDirect Enterprise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.9, ease }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
          >
            <Button size="lg" variant="secondary" className="text-base h-14 px-10 shadow-xl hover:scale-105 transition-transform duration-300 font-semibold" data-testid="cta-demo-bottom">
              Schedule Enterprise Demo
            </Button>
            <Button size="lg" className="text-base h-14 px-10 bg-transparent border border-white/30 hover:bg-white/10 text-white hover:border-white/60 transition-all duration-300" data-testid="cta-contact-sales">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── 10. FOOTER ──────────────────────────────────────── */}
      <footer className="bg-background py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-display font-semibold text-lg">AlumniDirect</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The operating system for clinical product deployment, management, and enterprise-grade compliance.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Command Center", "Integration Hub", "Compliance Engine", "Analytics", "Security"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Case Studies", "Blog", "Webinars"] },
              { title: "Company", links: ["About Us", "Careers", "Press", "Contact", "Partners"] },
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease }}
              >
                <h4 className="font-semibold mb-5 text-sm">{col.title}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="hover:text-primary transition-colors duration-200">{link}</a></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs text-muted-foreground gap-4">
            <div>© {new Date().getFullYear()} AlumniDirect, Inc. All rights reserved.</div>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Security"].map(link => (
                <a key={link} href="#" className="hover:text-foreground transition-colors duration-200">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
