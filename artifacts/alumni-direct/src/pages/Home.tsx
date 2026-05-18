import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

// EASING
const ease = [0.22, 1, 0.36, 1];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const dashParallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground overflow-x-hidden">
      
      {/* 1. NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/20 blur-sm mix-blend-overlay"></div>
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-xl tracking-tight text-foreground">
              Alumni<span className="text-primary">Direct</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#platform" className="hover:text-primary transition-colors">Platform</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a>
            <a href="#enterprise" className="hover:text-primary transition-colors">Enterprise</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            <Button className="font-semibold shadow-lg shadow-primary/20">Request Demo</Button>
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AlumniDirect Enterprise v2.0
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6">
                Clinical infrastructure for the next decade.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                The unified healthcare product ecosystem designed for scale. We help leading health systems discover, deploy, and manage clinical tools with absolute precision.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 shadow-xl shadow-primary/20">
                  Request Enterprise Demo
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 border-border hover:bg-muted">
                  View Platform Architecture
                </Button>
              </div>
            </motion.div>

            {/* Abstract Floating Dashboard UI */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
              style={{ y: parallaxY }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-3xl"></div>
              
              <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                    <div className="w-3 h-3 rounded-full bg-accent/80"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">system_status: OK</div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 bg-muted/50 rounded-lg p-4 border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Active Integrations</div>
                      <div className="text-2xl font-display font-semibold">1,204</div>
                      <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-muted/50 rounded-lg p-4 border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Compliance Score</div>
                      <div className="text-2xl font-display font-semibold text-primary">99.8%</div>
                      <div className="mt-2 flex gap-1">
                        {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-1 flex-1 bg-primary rounded-full"></div>)}
                      </div>
                    </div>
                  </div>

                  <div className="h-32 bg-muted/30 rounded-lg border border-border/50 p-4 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent"></div>
                    {/* Fake Chart Lines */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <path d="M0 80 Q 50 60 100 70 T 200 40 T 300 50 T 400 20 L 400 100 L 0 100 Z" fill="hsl(var(--primary)/0.05)" />
                      <path d="M0 80 Q 50 60 100 70 T 200 40 T 300 50 T 400 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 -top-12 bg-card p-4 rounded-xl border border-border shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">SOC 2 Verified</div>
                    <div className="text-xs text-muted-foreground">Continuous monitoring</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 -bottom-8 bg-card p-4 rounded-xl border border-border shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">FHIR Sync Active</div>
                    <div className="text-xs text-muted-foreground">24ms latency</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="py-12 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            TRUSTED BY ENTERPRISE HEALTH SYSTEMS & COMPLIANT WITH
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { icon: ShieldCheck, label: "HIPAA Compliant" },
              { icon: Lock, label: "SOC 2 Type II" },
              { icon: Server, label: "HL7 FHIR" },
              { icon: CheckCircle, label: "ISO 27001" },
              { icon: FileCheck, label: "FDA 21 CFR" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-foreground" />
                <span className="font-semibold text-sm tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM OVERVIEW */}
      <section id="platform" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
              The intelligence layer for clinical adoption.
            </h2>
            <p className="text-lg text-muted-foreground">
              We replace fragmented vendor portals and manual compliance checks with a unified, 
              secure ecosystem that accelerates time-to-value for new healthcare products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
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
      <section className="py-20 overflow-hidden bg-foreground text-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-foreground to-foreground"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
            Command your clinical stack.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A singular pane of glass for CTOs and Medical Officers to govern every digital health asset.
          </p>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <motion.div 
            style={{ y: dashParallaxY }}
            className="relative w-full aspect-[16/9] bg-[#0A0A0B] rounded-2xl border border-border/20 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Fake Dashboard Header */}
            <div className="h-14 border-b border-white/10 flex items-center px-6 justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm font-semibold tracking-wide">Enterprise Command</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-white/50 px-3 py-1 rounded bg-white/5">System: Nominal</div>
                <div className="w-6 h-6 rounded-full bg-white/10"></div>
              </div>
            </div>
            
            {/* Fake Dashboard Body */}
            <div className="flex-1 p-6 grid grid-cols-12 gap-6">
              <div className="col-span-3 space-y-4">
                <div className="h-24 rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-white/50 mb-2">Total Deployments</div>
                  <div className="text-2xl font-semibold">48</div>
                </div>
                <div className="h-24 rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-white/50 mb-2">Active Users</div>
                  <div className="text-2xl font-semibold text-primary">12,492</div>
                </div>
                <div className="h-32 rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="text-xs text-white/50 mb-2">Risk Alerts</div>
                  <div className="text-2xl font-semibold text-accent">0</div>
                  <div className="text-xs text-white/30 mt-2">Last 30 days</div>
                </div>
              </div>
              
              <div className="col-span-9 flex flex-col gap-6">
                <div className="flex-1 rounded-lg bg-white/5 border border-white/10 p-4 relative overflow-hidden">
                  <div className="text-sm font-semibold mb-4">Utilization Trends</div>
                  <svg className="w-full h-32" preserveAspectRatio="none">
                    <path d="M0 100 L 0 50 Q 100 20 200 40 T 400 30 T 600 60 T 800 20 L 800 100 Z" fill="hsl(var(--primary)/0.2)" />
                    <path d="M0 50 Q 100 20 200 40 T 400 30 T 600 60 T 800 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
                  </svg>
                </div>
                
                <div className="h-40 rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="text-sm font-semibold mb-4">Recent Integrations</div>
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-white/10"></div>
                          <div>
                            <div className="font-medium text-white/80">Vendor_App_0{i}</div>
                            <div className="text-xs text-white/40">v2.4.1 connected</div>
                          </div>
                        </div>
                        <div className="text-primary text-xs bg-primary/20 px-2 py-1 rounded">Healthy</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. INTERACTIVE FEATURES */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                Capabilities designed for clinical reality.
              </h2>
              
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
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                      activeTab === i 
                        ? "bg-card border-primary/30 shadow-md ring-1 ring-primary/20" 
                        : "bg-transparent border-transparent hover:bg-card/50"
                    }`}
                  >
                    <h3 className={`text-xl font-semibold mb-2 ${activeTab === i ? "text-primary" : "text-foreground"}`}>
                      {tab.title}
                    </h3>
                    <AnimatePresence>
                      {activeTab === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-muted-foreground overflow-hidden"
                        >
                          {tab.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Visual */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-xl relative min-h-[400px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease }}
                  className="w-full"
                >
                  {activeTab === 0 && (
                    <div className="space-y-6">
                      <div className="flex items-end gap-4 h-40">
                        {[40, 70, 45, 90, 65, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group">
                            <div 
                              className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-700"
                              style={{ height: `${h}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-accent" />
                            <div className="font-medium text-sm">Vendor Policy Audit {i}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-xs text-primary font-semibold">Passed</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="relative h-64 border-2 border-dashed border-border rounded-xl flex items-center justify-center">
                      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary z-10 -translate-y-1/2">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent z-10 -translate-y-1/2">
                        <Database className="w-6 h-6" />
                      </div>
                      <div className="w-1/2 h-1 bg-gradient-to-r from-primary to-accent relative">
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-background border-2 border-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>

      {/* 7. CASE STUDIES */}
      <section id="case-studies" className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
                Proven at scale.
              </h2>
              <p className="text-lg text-muted-foreground">
                How leading health systems use AlumniDirect to modernize their clinical infrastructure.
              </p>
            </div>
            <Button variant="outline" className="hidden md:inline-flex">Read all case studies <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Pacific Health Alliance",
                metric: "34%",
                metricDesc: "Reduction in IT onboarding time",
                tag: "Deployment",
                desc: "Streamlined vendor credentialing and integration deployment across 42 hospitals."
              },
              {
                name: "MedCore Systems",
                metric: "$2.4M",
                metricDesc: "Annual software waste eliminated",
                tag: "Utilization",
                desc: "Identified overlapping toolsets and consolidated clinical vendor contracts."
              },
              {
                name: "Northeast Regional Health",
                metric: "100%",
                metricDesc: "Compliance audit pass rate",
                tag: "Security",
                desc: "Automated continuous SOC 2 and HIPAA verification for 150+ third-party clinical apps."
              }
            ].map((study, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="bg-card rounded-2xl border border-border p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-xs font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full inline-block mb-6">
                  {study.tag}
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-display font-semibold mb-2">{study.metric}</div>
                  <div className="text-sm font-medium text-muted-foreground">{study.metricDesc}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{study.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {study.desc}
                </p>
                <div className="text-primary font-semibold text-sm flex items-center group-hover:gap-2 transition-all">
                  Read Case Study <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECURITY & COMPLIANCE */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
                <Lock className="w-3 h-3" /> Zero-Trust Architecture
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
                Security is our foundation, not a feature.
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                We handle PHI and critical clinical data. Our infrastructure is built to exceed the requirements of the most stringent hospital IT and compliance teams. Data sovereignty, end-to-end encryption, and continuous monitoring are guaranteed.
              </p>
              
              <div className="space-y-6">
                {[
                  "SOC 2 Type II Certified with continuous monitoring",
                  "HIPAA Compliant BAA structure",
                  "End-to-End AES-256 Encryption (At rest and transit)",
                  "Granular Role-Based Access Controls (RBAC)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "SOC 2 Type II", icon: Lock },
                { label: "HIPAA Compliant", icon: ShieldCheck },
                { label: "ISO 27001", icon: CheckCircle },
                { label: "HITRUST CSF", icon: FileCheck }
              ].map((cert, i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors">
                  <cert.icon className="w-10 h-10 text-primary mb-4" />
                  <span className="font-semibold">{cert.label}</span>
                  <span className="text-xs text-white/50 mt-2">Verified Annually</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. ENTERPRISE CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-8 tracking-tight">
            Ready to scale your clinical innovation?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join the leading health systems using AlumniDirect to discover, deploy, and manage their clinical technology stack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-10 shadow-xl shadow-primary/20">
              Request Enterprise Demo
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-10 bg-card border-border">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-background border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-display font-semibold text-xl tracking-tight text-foreground">
                  AlumniDirect
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                The enterprise SaaS platform redefining how medical products are discovered, adopted, and scaled across health systems.
              </p>
              <div className="flex gap-4 text-muted-foreground">
                <Globe className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
                <Briefcase className="w-5 h-5 hover:text-foreground cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security Details</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">BAA Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AlumniDirect Inc. All rights reserved.</p>
            <p>Designed for Enterprise Healthcare</p>
          </div>
        </div>
      </footer>
    </div>
  );
}