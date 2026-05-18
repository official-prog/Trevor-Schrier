import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useVelocity, useSpring, LayoutGroup } from "framer-motion";
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
  Briefcase
} from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Core motion values
  const { scrollYProgress } = useScroll();
  const scrollY = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const blurAmount = useTransform(smoothVelocity, [-3000, 0, 3000], [4, 0, 4]);

  // Section Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

  // Parallax transforms per section
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "-20%"]);
  const heroMidY = useTransform(heroProgress, [0, 1], ["0%", "-10%"]);
  const heroFgY = useTransform(heroProgress, [0, 1], ["0%", "-5%"]);

  const { scrollYProgress: showcaseProgress } = useScroll({ target: showcaseRef, offset: ["start end", "end start"] });
  const showcaseDashY = useTransform(showcaseProgress, [0, 1], ["0%", "-15%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x / (rect.width / 2), y: y / (rect.height / 2) });
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    }));
  }, []);

  const heroWords = "Clinical infrastructure for the next decade.".split(" ");

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* 1. NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group" data-testid="nav-home">
            <img src="/logo-mark.svg" alt="AlumniDirect" className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
            <span className="font-display font-semibold text-xl tracking-tight">
              Alumni<span className="text-primary">Direct</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#platform" className="hover:text-primary transition-colors" data-testid="nav-platform">Platform</a>
            <a href="#showcase" className="hover:text-primary transition-colors" data-testid="nav-solutions">Solutions</a>
            <a href="#case-studies" className="hover:text-primary transition-colors" data-testid="nav-cases">Case Studies</a>
            <a href="#enterprise" className="hover:text-primary transition-colors" data-testid="nav-enterprise">Enterprise</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex hover:bg-primary/5" data-testid="btn-signin">Sign In</Button>
            <Button className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" data-testid="btn-demo">
              Request Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-screen flex items-center mask-fade-bottom" style={{ perspective: "1200px" }}>
        
        {/* Layer 0: Background */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none depth-bg"
          style={{ 
            y: heroBgY, 
            filter: useTransform(blurAmount, (v) => `blur(${Math.max(2, (v as number)) }px)`),
            translateZ: "-80px", 
            scale: 1.08 
          }}
        >
          <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-[100px] mix-blend-screen"></div>
        </motion.div>

        {/* Layer 1: Midground */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none depth-mid"
          style={{ 
            y: heroMidY,
            filter: useTransform(blurAmount, (v) => `blur(${(v as number)}px)`)
          }}
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/grid-pattern.svg')" }}></div>
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
        </motion.div>

        {/* Layer 2: Foreground Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease }}
              style={{ y: heroFgY, translateZ: "40px" }}
              className="max-w-2xl depth-fg"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AlumniDirect Enterprise v2.0
              </motion.div>
              
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5rem] font-semibold tracking-tight text-foreground leading-[1.05] mb-8">
                {heroWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease }}
                className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl"
              >
                The unified healthcare product ecosystem designed for scale. We help leading health systems discover, deploy, and manage clinical tools with absolute precision.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 shadow-xl shadow-primary/20 group" data-testid="hero-cta-demo">
                  Request Enterprise Demo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 border-border hover:bg-muted" data-testid="hero-cta-arch">
                  View Platform Architecture
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard Visual (Layer 2b) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease, delay: 0.4 }}
              style={{ y: heroFgY, translateZ: "40px" }}
              className="relative hidden lg:block depth-fg perspective-[1000px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-primary/20 rounded-2xl blur-[80px]"></div>
              
              <motion.div 
                animate={{ rotateY: -8, rotateX: 3 }}
                className="relative bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-6 overflow-hidden text-white transform-gpu"
              >
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-xs font-mono text-white/50">sys.status // SECURE</div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white/5 rounded-lg p-4 border border-white/5">
                      <div className="text-xs text-white/50 mb-1">Active FHIR Nodes</div>
                      <div className="text-2xl font-display font-semibold">1,204</div>
                      <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5, delay: 1, ease }}
                          className="h-full bg-cyan-400"
                        ></motion.div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-lg p-4 border border-white/5">
                      <div className="text-xs text-white/50 mb-1">Compliance Score</div>
                      <div className="text-2xl font-display font-semibold text-primary">99.8%</div>
                      <div className="mt-2 flex gap-1">
                        {[1,2,3,4,5,6,7].map(i => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + i*0.1 }}
                            className="h-1 flex-1 bg-primary rounded-full"
                          ></motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="h-40 bg-white/5 rounded-lg border border-white/5 p-4 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.5, ease }}
                        d="M0 100 Q 50 80 100 90 T 200 60 T 300 70 T 400 30 L 400 150 L 0 150 Z" 
                        fill="hsl(var(--primary)/0.1)" 
                      />
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.5, ease }}
                        d="M0 100 Q 50 80 100 90 T 200 60 T 300 70 T 400 30" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="2" 
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating Chips */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-2xl z-20 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">SOC 2 Verified</div>
                    <div className="text-[10px] text-white/50">Live sync</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-6 bottom-16 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-2xl z-20 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Epic Connected</div>
                    <div className="text-[10px] text-white/50">12ms latency</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="py-12 border-y border-border/50 bg-muted/30 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground mb-8">
            TRUSTED BY ENTERPRISE HEALTH SYSTEMS & COMPLIANT WITH
          </p>
        </div>
        <div className="marquee-wrapper w-full">
          <div className="marquee-track gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 items-center">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex gap-16 md:gap-24 items-center">
                {[
                  { icon: ShieldCheck, label: "HIPAA Compliant" },
                  { icon: Lock, label: "SOC 2 Type II" },
                  { icon: Server, label: "HL7 FHIR" },
                  { icon: CheckCircle, label: "ISO 27001" },
                  { icon: FileCheck, label: "FDA 21 CFR" },
                  { icon: Globe, label: "GDPR Ready" },
                ].map((item, i) => (
                  <div key={`${j}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
                    <item.icon className="w-5 h-5 text-foreground" />
                    <span className="font-display font-semibold text-sm tracking-wide">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM OVERVIEW */}
      <section id="platform" ref={platformRef} className="py-32 relative mask-fade-both overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "url('/grid-pattern.svg')" }}
        ></motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-semibold mb-6 tracking-tight"
            >
              The intelligence layer for clinical adoption.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              We replace fragmented vendor portals and manual compliance checks with a unified, 
              secure ecosystem that accelerates time-to-value for new healthcare products.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 perspective-[1000px]">
            {[
              {
                icon: Activity,
                title: "Clinical Workflow Intelligence",
                desc: "Map, analyze, and optimize product deployment across clinical departments with real-time utilization telemetry."
              },
              {
                icon: ShieldCheck,
                title: "Enterprise-Grade Security",
                desc: "Zero-trust architecture with automated compliance verification, ensuring every integrated tool meets strict hospital standards."
              },
              {
                icon: Database,
                title: "Seamless EHR Integration",
                desc: "Native bidrectional sync with Epic, Cerner, and Meditech via secure FHIR endpoints and SMART on FHIR."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(37,99,235,0.15)" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="bg-card p-8 rounded-2xl border border-border transition-all duration-300 transform-gpu group"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6"
                  whileHover={{ scale: 1.15 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section id="showcase" ref={showcaseRef} className="py-32 overflow-hidden bg-[#050810] text-white relative">
        {/* Atmospheric fog */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050810] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050810] to-transparent z-10 pointer-events-none"></div>
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[#050810] to-[#050810] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-20 text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-semibold mb-6 tracking-tight"
          >
            Command your clinical stack.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            A singular pane of glass for CTOs and Medical Officers to govern every digital health asset.
          </motion.p>
        </div>

        <div className="container mx-auto px-6 relative z-20 max-w-6xl perspective-[1200px]">
          <motion.div 
            initial={{ scale: 0.88, opacity: 0, rotateX: 8 }}
            whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: showcaseDashY, boxShadow: "0 0 120px rgba(37,99,235,0.2)" }}
            className="relative w-full aspect-[16/9] bg-[#0A0B0E] rounded-2xl border border-white/10 overflow-hidden flex transform-gpu"
          >
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 bg-white/[0.02] flex flex-col hidden md:flex">
              <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div className="font-semibold tracking-wide">Enterprise</div>
              </div>
              <div className="p-4 space-y-2 flex-1">
                {[
                  { icon: BarChart, label: "Overview", active: true },
                  { icon: Users, label: "Clinicians" },
                  { icon: ShieldCheck, label: "Compliance" },
                  { icon: Settings, label: "Settings" }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-primary/20 text-primary font-medium' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <div className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-white/5">
                <div className="text-sm font-medium text-white/80">Command Center / Overview</div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-green-400 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    System Nominal
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10"></div>
                </div>
              </div>
              
              <div className="flex-1 p-8 grid grid-cols-12 gap-6 overflow-y-auto">
                <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-6 relative overflow-hidden flex-1 min-h-[300px]">
                    <div className="text-sm font-semibold mb-6 text-white/80">Platform Utilization Telemetry</div>
                    <svg className="w-full h-full absolute inset-0 pt-16 px-6 pb-6" preserveAspectRatio="none">
                      <path d="M0 100 L 0 50 Q 100 20 200 40 T 400 30 T 600 60 T 800 20 L 800 100 Z" fill="hsl(var(--primary)/0.15)" />
                      <path d="M0 50 Q 100 20 200 40 T 400 30 T 600 60 T 800 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
                
                <div className="col-span-12 md:col-span-4 space-y-6">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                    <div className="text-xs text-white/50 mb-2 font-medium uppercase tracking-wider">Total Deployments</div>
                    <div className="text-4xl font-display font-semibold">48</div>
                    <div className="text-xs text-green-400 mt-2">+12% vs last month</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                    <div className="text-xs text-white/50 mb-2 font-medium uppercase tracking-wider">Active Clinicians</div>
                    <div className="text-4xl font-display font-semibold text-primary">12,492</div>
                    <div className="text-xs text-white/40 mt-2">Across 14 departments</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                    <div className="text-xs text-white/50 mb-2 font-medium uppercase tracking-wider">Risk Alerts</div>
                    <div className="text-4xl font-display font-semibold">0</div>
                    <div className="text-xs text-white/40 mt-2">All systems compliant</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Status Chips */}
            {[
              { top: "20%", left: "-2%", label: "FHIR Stream", delay: 0.1 },
              { top: "60%", right: "-2%", label: "Auth Sync", delay: 0.3 },
              { bottom: "10%", left: "10%", label: "Audit Log", delay: 0.5 }
            ].map((chip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + chip.delay, duration: 0.5 }}
                style={{ top: chip.top, left: chip.left, right: chip.right, bottom: chip.bottom }}
                className="absolute bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-xs font-medium shadow-xl"
              >
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i }}>
                  {chip.label}
                </motion.div>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>

      {/* 6. INTERACTIVE FEATURES */}
      <section id="features" ref={featuresRef} className="py-32 bg-background relative mask-fade-both">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl font-semibold mb-10 tracking-tight"
              >
                Capabilities designed for clinical reality.
              </motion.h2>
              
              <LayoutGroup>
                <div className="space-y-4">
                  {[
                    {
                      title: "Patient Outcome Analytics",
                      desc: "Correlate tool utilization with patient health metrics in real-time. Prove ROI on digital health spend instantly."
                    },
                    {
                      title: "Compliance Automation",
                      desc: "Automated BAA generation, SOC 2 tracking, and continuous penetration test monitoring for all integrated vendors."
                    },
                    {
                      title: "Clinical Workflow Orchestration",
                      desc: "Embed third-party applications directly into the clinician's natural EHR workflow without disruptive context switching."
                    }
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className="w-full text-left p-6 rounded-xl border border-transparent relative group"
                      data-testid={`feature-tab-${i}`}
                    >
                      {activeTab === i && (
                        <motion.div 
                          layoutId="activeTab" 
                          className="absolute inset-0 bg-muted/50 rounded-xl border border-border shadow-sm"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className="relative z-10">
                        <h3 className={`text-xl font-semibold mb-2 transition-colors ${activeTab === i ? "text-primary" : "text-foreground group-hover:text-primary/70"}`}>
                          {tab.title}
                        </h3>
                        <AnimatePresence initial={false}>
                          {activeTab === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-muted-foreground pt-2 leading-relaxed">
                                {tab.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </div>

            {/* Feature Visual */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl relative min-h-[450px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease }}
                  className="w-full max-w-sm"
                >
                  {activeTab === 0 && (
                    <div className="space-y-6">
                      <div className="flex items-end gap-3 h-48 border-b border-border pb-2">
                        {[40, 70, 45, 90, 65, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-muted rounded-t-sm relative group overflow-hidden">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1, ease }}
                              className="absolute bottom-0 w-full bg-primary rounded-t-sm"
                            ></motion.div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex items-center justify-between p-5 bg-background rounded-lg border border-border shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-accent/10">
                              <ShieldCheck className="w-5 h-5 text-accent" />
                            </div>
                            <div className="font-medium text-sm">Vendor Security Audit 0{i}</div>
                          </div>
                          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-xs text-primary font-semibold tracking-wide uppercase">Passed</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="relative h-64 border-2 border-dashed border-border rounded-xl flex items-center justify-center bg-background/50">
                      <div className="absolute top-1/2 left-[15%] w-14 h-14 bg-card border border-border shadow-md rounded-2xl flex items-center justify-center text-primary z-10 -translate-y-1/2">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="absolute top-1/2 right-[15%] w-14 h-14 bg-card border border-border shadow-md rounded-2xl flex items-center justify-center text-accent z-10 -translate-y-1/2">
                        <Database className="w-6 h-6" />
                      </div>
                      
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                          initial={{ strokeDashoffset: 1000 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                          strokeDasharray="10 10"
                          d="M 25% 50% L 75% 50%"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      
                      <motion.div 
                        animate={{ x: [-50, 50] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_hsl(var(--primary))]"
                      ></motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CASE STUDIES (3D Tilt Cards) */}
      <section id="case-studies" ref={caseStudiesRef} className="py-32 bg-muted/20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Proven at Scale.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">See how leading institutions transformed their clinical operations.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 perspective-[1000px]">
            {[
              { name: "Mount Sinai", metric: "40%", label: "Faster Deployment Time", color: "from-blue-500/20 to-cyan-500/20" },
              { name: "Mayo Clinic", metric: "100%", label: "Compliance Automation", color: "from-indigo-500/20 to-purple-500/20" }
            ].map((study, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
                style={{
                  rotateX: mousePos.y * -8,
                  rotateY: mousePos.x * 8,
                  transformStyle: "preserve-3d"
                }}
                className="bg-card p-10 rounded-3xl border border-border shadow-xl relative overflow-hidden group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10 transform-gpu" style={{ translateZ: "50px" }}>
                  <div className="text-sm font-semibold text-muted-foreground mb-4 tracking-wider uppercase">{study.name}</div>
                  <div className="text-6xl font-display font-bold text-foreground mb-2">{study.metric}</div>
                  <div className="text-lg text-muted-foreground mb-8">{study.label}</div>
                  <div className="flex items-center text-primary font-medium group-hover:underline underline-offset-4">
                    Read full case study <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECURITY SECTION */}
      <section ref={securityRef} className="py-32 relative overflow-hidden bg-background text-foreground border-y border-border">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url('/grid-pattern.svg')" }}></div>
        <div className="scan-line"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
                <Lock className="w-3 h-3" /> Zero-Trust Architecture
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Security is our foundation, not a feature.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We meet the most stringent data protection requirements in healthcare. Every API call, every data sync, and every user action is encrypted, authenticated, and audited.
              </p>
              
              <ul className="space-y-4">
                {["End-to-end encryption (AES-256)", "Granular RBAC & Audit Logging", "Continuous Penetration Testing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6 perspective-[800px]">
              {[{ icon: Lock, title: "SOC 2 Type II" }, { icon: FileCheck, title: "HIPAA Compliant" }, { icon: ShieldCheck, title: "HITRUST CSF" }, { icon: Globe, title: "GDPR Ready" }].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <badge.icon className="w-8 h-8 text-primary mb-4" />
                  <div className="font-semibold text-sm">{badge.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. ENTERPRISE CTA */}
      <section id="enterprise" className="py-32 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
              style={{ left: p.x + "%", top: p.y + "%" }}
              animate={{ y: [0, -30, 0], opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold mb-8"
          >
            Ready to upgrade your clinical infrastructure?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 mb-10"
          >
            Join the leading health systems standardizing on AlumniDirect Enterprise.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base h-14 px-8" data-testid="cta-demo-bottom">
              Schedule Enterprise Demo
            </Button>
            <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-transparent border-border hover:bg-white/10 text-white" data-testid="cta-contact-sales">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-background py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <img src="/logo-mark.svg" alt="AlumniDirect" className="w-6 h-6" />
                <span className="font-display font-semibold text-lg">AlumniDirect</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The operating system for clinical product deployment, management, and compliance.
              </p>
            </div>
            
            {[
              { title: "Platform", links: ["Command Center", "Integration Hub", "Compliance Engine", "Analytics", "Security"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Case Studies", "Blog", "Webinars"] },
              { title: "Company", links: ["About Us", "Careers", "Press", "Contact", "Partners Partners"] }
            ].map((col, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="font-semibold mb-6">{col.title}</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} AlumniDirect, Inc. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}