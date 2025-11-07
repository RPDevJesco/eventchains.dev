import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Zap, Shield, GitBranch, BarChart3, BookOpen, Github, Menu, X, ChevronDown, TrendingUp, Cpu, HardDrive } from 'lucide-react';

// Logo SVG Component
const LogoSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="6" height="14" rx="2" stroke="#4f46e5" strokeWidth="2"></rect>
        <rect x="16" y="5" width="6" height="14" rx="2" stroke="#4f46e5" strokeWidth="2"></rect>
        <circle cx="12" cy="12" r="2" fill="#4f46e5"></circle>
        <path d="M8 12h8" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"></path>
    </svg>
);

// Diagram SVG Component
const DiagramSVG = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 260" fill="none" className={className}>
        <rect width="900" height="260" rx="16" fill="#0f172a"></rect>
        <g transform="translate(30,30)">
            <rect x="0" y="60" width="120" height="60" rx="12" fill="#111827" stroke="#64748b"></rect>
            <text x="60" y="97" fill="#e5e7eb" textAnchor="middle" fontFamily="Inter" fontSize="14">Input</text>

            <path d="M120 90 L160 90" stroke="#64748b" strokeWidth="2"></path>

            <rect x="160" y="40" width="140" height="100" rx="12" fill="#111827" stroke="#4f46e5"></rect>
            <text x="230" y="97" fill="#e5e7eb" textAnchor="middle" fontFamily="Inter" fontSize="14">Event A</text>

            <path d="M300 90 L340 90" stroke="#64748b" strokeWidth="2"></path>

            <rect x="340" y="40" width="140" height="100" rx="12" fill="#111827" stroke="#4f46e5"></rect>
            <text x="410" y="97" fill="#e5e7eb" textAnchor="middle" fontFamily="Inter" fontSize="14">Event B</text>

            <path d="M480 90 L520 90" stroke="#64748b" strokeWidth="2"></path>

            <rect x="520" y="40" width="140" height="100" rx="12" fill="#111827" stroke="#4f46e5"></rect>
            <text x="590" y="97" fill="#e5e7eb" textAnchor="middle" fontFamily="Inter" fontSize="14">Event C</text>

            <path d="M660 90 L700 90" stroke="#64748b" strokeWidth="2"></path>

            <rect x="700" y="60" width="140" height="60" rx="12" fill="#111827" stroke="#64748b"></rect>
            <text x="770" y="97" fill="#e5e7eb" textAnchor="middle" fontFamily="Inter" fontSize="14">Result</text>

            <circle cx="410" cy="90" r="78" stroke="#334155" strokeDasharray="6,8" fill="none"></circle>
            <text x="410" y="22" fill="#94a3b8" textAnchor="middle" fontFamily="Inter" fontSize="12">middleware (logging | timing | metrics | policy)</text>
        </g>
    </svg>
);

// Benchmark Data
const benchmarkData = {
    C: {
        Windows: {
            platform: "Windows 11 Pro Ryzen 9 7950X 128GB RAM",
            tier1: {
                baseline: { avg: 0.720, min: 0.600, max: 13.000, stddev: 0.168 },
                eventchains: { avg: 0.941, min: 0.800, max: 26.800, stddev: 0.295 },
                overhead: 30.69,
                overheadUs: 0.221
            },
            tier2: {
                baseline: { avg: 0.824, min: 0.700, max: 11.600, stddev: 0.132 },
                eventchains: { avg: 0.942, min: 0.800, max: 6.300, stddev: 0.109 },
                overhead: 14.32,
                overheadUs: 0.118
            },
            tier3: {
                layers: [
                    { count: 0, avg: 0.926, min: 0.800, max: 62.100, stddev: 0.617 },
                    { count: 1, avg: 1.116, min: 1.000, max: 6.700, stddev: 0.122 },
                    { count: 3, avg: 1.165, min: 1.000, max: 6.200, stddev: 0.145 },
                    { count: 5, avg: 1.160, min: 1.000, max: 47.300, stddev: 0.483 },
                    { count: 10, avg: 1.220, min: 1.100, max: 8.500, stddev: 0.149 }
                ],
                amortizedCost: 0.029
            },
            tier4: {
                baseline: { avg: 0.809, min: 0.700, max: 5.900, stddev: 0.083 },
                eventchains: { avg: 1.137, min: 1.000, max: 62.300, stddev: 0.629 },
                overhead: 40.54,
                overheadUs: 0.328
            }
        },
        MacOS: {
            platform: "macOS Sequoia M4 32GB RAM",
            tier1: {
                baseline: { avg: 0.513, min: 0.458, max: 1.417, stddev: 0.044 },
                eventchains: { avg: 0.759, min: 0.708, max: 1.833, stddev: 0.050 },
                overhead: 47.95,
                overheadUs: 0.246
            },
            tier2: {
                baseline: { avg: 0.565, min: 0.500, max: 1.917, stddev: 0.064 },
                eventchains: { avg: 0.762, min: 0.708, max: 2.000, stddev: 0.056 },
                overhead: 34.87,
                overheadUs: 0.197
            },
            tier3: {
                layers: [
                    { count: 0, avg: 0.755, min: 0.708, max: 1.708, stddev: 0.042 },
                    { count: 1, avg: 0.847, min: 0.792, max: 1.875, stddev: 0.050 },
                    { count: 3, avg: 0.903, min: 0.833, max: 2.083, stddev: 0.062 },
                    { count: 5, avg: 0.945, min: 0.875, max: 2.167, stddev: 0.063 },
                    { count: 10, avg: 1.036, min: 0.958, max: 2.250, stddev: 0.065 }
                ],
                amortizedCost: 0.018
            },
            tier4: {
                baseline: { avg: 0.575, min: 0.500, max: 1.958, stddev: 0.068 },
                eventchains: { avg: 0.857, min: 0.792, max: 2.250, stddev: 0.066 },
                overhead: 49.04,
                overheadUs: 0.282
            }
        }
    },
    CSharp: {
        Windows: {
            platform: "Windows 11 Pro Ryzen 9 7950X 128GB RAM",
            tier1: {
                baseline: { avg: 0.006, min: 0.000, max: 0.200, stddev: 0.011 },
                eventchains: { avg: 0.908, min: 0.700, max: 5.200, stddev: 0.196 },
                overhead: 15033.33,
                overheadUs: 0.902
            },
            tier2: {
                baseline: { avg: 0.006, min: 0.000, max: 0.200, stddev: 0.011 },
                eventchains: { avg: 0.914, min: 0.800, max: 5.900, stddev: 0.149 },
                overhead: 15133.33,
                overheadUs: 0.908
            },
            tier3: {
                layers: [
                    { count: 0, avg: 0.919, min: 0.700, max: 18.900, stddev: 0.347 },
                    { count: 1, avg: 0.972, min: 0.800, max: 5.900, stddev: 0.182 },
                    { count: 3, avg: 1.044, min: 0.900, max: 6.400, stddev: 0.174 },
                    { count: 5, avg: 1.097, min: 0.900, max: 6.400, stddev: 0.199 },
                    { count: 10, avg: 1.208, min: 1.000, max: 7.000, stddev: 0.198 }
                ],
                amortizedCost: 0.029
            },
            tier4: {
                baseline: { avg: 0.010, min: 0.000, max: 0.200, stddev: 0.014 },
                eventchains: { avg: 0.981, min: 0.800, max: 6.300, stddev: 0.185 },
                overhead: 9710.00,
                overheadUs: 0.971
            }
        },
        MacOS: {
            platform: "macOS Sequoia M4 32GB RAM",
            tier1: {
                baseline: { avg: 0.006, min: 0.000, max: 0.500, stddev: 0.024 },
                eventchains: { avg: 0.927, min: 0.833, max: 3.208, stddev: 0.118 },
                overhead: 15350.00,
                overheadUs: 0.921
            },
            tier2: {
                baseline: { avg: 0.007, min: 0.000, max: 0.750, stddev: 0.028 },
                eventchains: { avg: 0.933, min: 0.833, max: 2.792, stddev: 0.106 },
                overhead: 13228.57,
                overheadUs: 0.926
            },
            tier3: {
                layers: [
                    { count: 0, avg: 0.928, min: 0.833, max: 2.958, stddev: 0.106 },
                    { count: 1, avg: 0.973, min: 0.875, max: 2.958, stddev: 0.109 },
                    { count: 3, avg: 1.042, min: 0.917, max: 3.042, stddev: 0.121 },
                    { count: 5, avg: 1.089, min: 0.958, max: 3.083, stddev: 0.126 },
                    { count: 10, avg: 1.186, min: 1.042, max: 3.208, stddev: 0.133 }
                ],
                amortizedCost: 0.026
            },
            tier4: {
                baseline: { avg: 0.008, min: 0.000, max: 0.667, stddev: 0.029 },
                eventchains: { avg: 0.981, min: 0.875, max: 3.042, stddev: 0.115 },
                overhead: 12162.50,
                overheadUs: 0.973
            }
        }
    },
    Rust: {
        Windows: {
            platform: "Windows 11 Pro Ryzen 9 7950X 128GB RAM",
            tier1_100: {
                baseline: { avg: 62.498, totalOps: 10000 },
                eventchains: { avg: 66.703, totalOps: 10000 },
                overhead: 6.73,
                overheadUs: 4.205
            },
            tier1_1000: {
                baseline: { avg: 609.990, totalOps: 10000 },
                eventchains: { avg: 653.032, totalOps: 10000 },
                overhead: 7.06,
                overheadUs: 43.042
            }
        },
        MacOS: {
            platform: "macOS Sequoia M4 32GB RAM",
            tier1_100: {
                baseline: { avg: 45.100, totalOps: 10000 },
                eventchains: { avg: 48.268, totalOps: 10000 },
                overhead: 7.02,
                overheadUs: 3.168
            },
            tier1_1000: {
                baseline: { avg: 433.961, totalOps: 10000 },
                eventchains: { avg: 464.650, totalOps: 10000 },
                overhead: 7.07,
                overheadUs: 30.689
            }
        },
        Linux: {
            platform: "Docker Linux (GitHub Actions)",
            tier1_100: {
                baseline: { avg: 87.829, totalOps: 10000 },
                eventchains: { avg: 93.917, totalOps: 10000 },
                overhead: 6.93,
                overheadUs: 6.088
            },
            tier1_1000: {
                baseline: { avg: 857.035, totalOps: 10000 },
                eventchains: { avg: 917.060, totalOps: 10000 },
                overhead: 7.00,
                overheadUs: 60.025
            }
        }
    }
};

const EventChainsWebsite = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [animateFlow, setAnimateFlow] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('C');
    const [selectedOS, setSelectedOS] = useState('Windows');
    const [selectedTier, setSelectedTier] = useState('tier1');
    const [showMathDetails, setShowMathDetails] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimateFlow(prev => !prev);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const navigation = [
        { id: 'home', label: 'Home' },
        { id: 'pattern', label: 'The Pattern' },
        { id: 'examples', label: 'Examples' },
        { id: 'benchmarks', label: 'Benchmarks' },
        { id: 'docs', label: 'Docs' },
        { id: 'faq', label: 'FAQ' }
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        setMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getAvailableOS = (language) => {
        if (language === 'Rust') return ['Windows', 'MacOS', 'Linux'];
        return ['Windows', 'MacOS'];
    };

    const getCurrentBenchmarkData = () => {
        const langData = benchmarkData[selectedLanguage];
        if (!langData) return null;
        return langData[selectedOS];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <LogoSVG />
                            <span className="text-xl font-bold">EventChains</span>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            {navigation.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === item.id
                                            ? 'text-blue-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <a
                                href="https://github.com/RPDevJesco?tab=repositories&q=eventchain"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white flex items-center space-x-1"
                            >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                            </a>
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-blue-500/20">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === item.id
                                            ? 'text-blue-400 bg-slate-800'
                                            : 'text-gray-300 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <a
                                href="https://github.com/RPDevJesco?tab=repositories&q=eventchain"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            EventChains
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                            A composable design pattern for orchestrating deterministic workflows with event-driven execution
                        </p>
                        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                            Build maintainable, testable, and scalable sequential workflows by separating business logic from cross-cutting concerns
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => scrollToSection('pattern')}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                            >
                                <span>Learn the Pattern</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection('benchmarks')}
                                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-blue-500/50 rounded-lg font-semibold transition-colors"
                            >
                                View Benchmarks
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20 max-w-5xl mx-auto">
                        <DiagramSVG className="w-full" />
                    </div>

                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20 max-w-5xl mx-auto">
                        <img src="/eventchains_diagram.png" className="w-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Composable</h3>
                            <p className="text-gray-400">
                                Build complex workflows from simple, reusable events with mathematical guarantees
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Performant</h3>
                            <p className="text-gray-400">
                                Minimal overhead of 5-7μs per operation with negligible middleware costs
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Testable</h3>
                            <p className="text-gray-400">
                                Deterministic execution makes testing straightforward and reliable
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Pattern Section */}
            <section id="pattern" className="py-20 px-4 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Understanding the Pattern</h2>

                    {/* Mathematical Foundation Toggle */}
                    <div className="mb-8 text-center">
                        <button
                            onClick={() => setShowMathDetails(!showMathDetails)}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-blue-500/30 transition-colors"
                        >
              <span className="font-semibold">
                {showMathDetails ? 'Hide' : 'Show'} Mathematical Model
              </span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${showMathDetails ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {showMathDetails && (
                        <div className="mb-12 bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
                            <h3 className="text-2xl font-bold mb-6 text-blue-400">Mathematical Formalization</h3>

                            <div className="space-y-6 text-gray-300">
                                <div>
                                    <h4 className="text-xl font-semibold mb-3 text-white">Core Definitions</h4>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm mb-4">
                                        <div className="mb-2"><span className="text-blue-400">Context Space:</span> C = &#123;(k, v) | k ∈ K, v ∈ V&#125;</div>
                                        <div className="mb-2"><span className="text-blue-400">Event:</span> E: C → R × C'</div>
                                        <div><span className="text-blue-400">Middleware:</span> M: (E × C) → (E × C)</div>
                                    </div>
                                    <p>EventChains is formally defined as a composable workflow system where events are functions transforming context, and middleware wraps execution to add cross-cutting concerns.</p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-semibold mb-3 text-white">Chain Composition Operator ⊙</h4>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm mb-4">
                                        (e₁ ⊙ e₂ ⊙ ... ⊙ eₙ)(c₀) = <br />
                                        &nbsp;&nbsp;let (r₁, c₁) = e₁(c₀)<br />
                                        &nbsp;&nbsp;in if should_continue(r₁, φ) then<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;(e₂ ⊙ ... ⊙ eₙ)(c₁)<br />
                                        &nbsp;&nbsp;else<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;(r₁, c₁)
                                    </div>
                                    <p>Sequential composition ensures deterministic execution where each event receives the output context of the previous event.</p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-semibold mb-3 text-white">Performance Model</h4>
                                    <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm mb-4">
                                        <div className="mb-2">T_total = Σⁿᵢ₌₁ [T(eᵢ) + k·α]</div>
                                        <div className="text-gray-400 text-xs">where α is middleware overhead per layer</div>
                                    </div>
                                    <p className="mb-2">Empirical measurements show:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>C Implementation: α ≈ 0.018 μs (macOS M4)</li>
                                        <li>C# Implementation: α ≈ 0.029 μs (Windows Ryzen 9)</li>
                                        <li>Rust Implementation: α ≈ 0.032 μs (averaged)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xl font-semibold mb-3 text-white">Key Properties</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span><strong>Associativity:</strong> (e₁ ⊙ e₂) ⊙ e₃ ≡ e₁ ⊙ (e₂ ⊙ e₃) under STRICT mode</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span><strong>Identity:</strong> ∃ε such that ε ⊙ e ≡ e ⊙ ε ≡ e</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span><strong>Middleware Transparency:</strong> Middleware shouldn't affect semantic results</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span><strong>Monad Structure:</strong> EventChains form a monad with proper bind and return operations</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">Core Concepts</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-blue-400 text-sm">1</span>
                                    </div>
                                    <div>
                                        <strong className="text-white">Events:</strong> Pure functions that transform context and return success/failure
                                    </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-blue-400 text-sm">2</span>
                                    </div>
                                    <div>
                                        <strong className="text-white">Context:</strong> Shared state that flows through the chain, modified by each event
                                    </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-blue-400 text-sm">3</span>
                                    </div>
                                    <div>
                                        <strong className="text-white">Chain:</strong> Orchestrates sequential execution with deterministic ordering
                                    </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-blue-400 text-sm">4</span>
                                    </div>
                                    <div>
                                        <strong className="text-white">Middleware:</strong> Cross-cutting concerns (logging, timing, metrics) applied to all events
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">Key Benefits</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start space-x-3">
                                    <GitBranch className="w-6 h-6 text-green-400 flex-shrink-0" />
                                    <div>
                                        <strong className="text-white">Separation of Concerns:</strong> Business logic stays clean, infrastructure is handled by middleware
                                    </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Code className="w-6 h-6 text-purple-400 flex-shrink-0" />
                                    <div>
                                        <strong className="text-white">Testability:</strong> Events are pure functions, easy to unit test in isolation
                                    </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                                    <div>
                                        <strong className="text-white">Composability:</strong> Build complex workflows from simple, reusable components
                                    </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                    <div>
                                        <strong className="text-white">Predictability:</strong> Deterministic execution with clear error handling modes
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl border border-blue-500/30">
                        <h3 className="text-2xl font-bold mb-4">Fault Tolerance Modes</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-lg mb-2 text-blue-300">STRICT</h4>
                                <p className="text-gray-300 text-sm">Stop on first failure. Best for critical workflows where partial completion is unacceptable.</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-lg mb-2 text-purple-300">LENIENT</h4>
                                <p className="text-gray-300 text-sm">Continue through failures, collect errors. Ideal for batch processing or data pipelines.</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-lg mb-2 text-green-300">BEST_EFFORT</h4>
                                <p className="text-gray-300 text-sm">Execute all events regardless of failures. Perfect for monitoring or notification systems.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benchmarks Section */}
            <section id="benchmarks" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4 text-center">Performance Benchmarks</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
                        Comprehensive multi-tier benchmarks across languages and platforms, measuring real-world overhead
                    </p>

                    {/* Language and OS Selection */}
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 mb-8">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-300">Language</label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => {
                                        setSelectedLanguage(e.target.value);
                                        const availableOS = getAvailableOS(e.target.value);
                                        if (!availableOS.includes(selectedOS)) {
                                            setSelectedOS(availableOS[0]);
                                        }
                                    }}
                                    className="w-full bg-slate-900 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="C">C</option>
                                    <option value="CSharp">C#</option>
                                    <option value="Rust">Rust</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-300">Operating System</label>
                                <select
                                    value={selectedOS}
                                    onChange={(e) => setSelectedOS(e.target.value)}
                                    className="w-full bg-slate-900 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    {getAvailableOS(selectedLanguage).map(os => (
                                        <option key={os} value={os}>{os}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-300">Benchmark Tier</label>
                                <select
                                    value={selectedTier}
                                    onChange={(e) => setSelectedTier(e.target.value)}
                                    className="w-full bg-slate-900 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    {selectedLanguage === 'Rust' ? (
                                        <>
                                            <option value="tier1_100">Tier 1: 100 Nodes</option>
                                            <option value="tier1_1000">Tier 1: 1000 Nodes</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="tier1">Tier 1: Minimal Baseline</option>
                                            <option value="tier2">Tier 2: Feature Parity</option>
                                            <option value="tier3">Tier 3: Middleware Scaling</option>
                                            <option value="tier4">Tier 4: Real-World</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        {(() => {
                            const data = getCurrentBenchmarkData();
                            if (!data) return null;

                            return (
                                <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                                        <Cpu className="w-4 h-4" />
                                        <span>{data.platform}</span>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Benchmark Results Display */}
                    {(() => {
                        const data = getCurrentBenchmarkData();
                        if (!data) return null;

                        if (selectedLanguage === 'Rust') {
                            const tierData = data[selectedTier];
                            if (!tierData) return null;

                            return (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Baseline</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Average Time:</span>
                                                <span className="font-mono text-white">{tierData.baseline.avg.toFixed(3)} μs</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Total Operations:</span>
                                                <span className="font-mono text-white">{tierData.baseline.totalOps.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-green-500/20">
                                        <h3 className="text-xl font-bold mb-4 text-green-400">EventChains</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Average Time:</span>
                                                <span className="font-mono text-white">{tierData.eventchains.avg.toFixed(3)} μs</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Total Operations:</span>
                                                <span className="font-mono text-white">{tierData.eventchains.totalOps.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                                        <h3 className="text-xl font-bold mb-4">Overhead Analysis</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-3xl font-bold text-purple-400 mb-1">
                                                    {tierData.overhead.toFixed(2)}%
                                                </div>
                                                <div className="text-gray-400 text-sm">Percentage Overhead</div>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-blue-400 mb-1">
                                                    {tierData.overheadUs.toFixed(3)} μs
                                                </div>
                                                <div className="text-gray-400 text-sm">Absolute Overhead</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // C and C# display logic
                        const tierData = data[selectedTier];
                        if (!tierData) return null;

                        if (selectedTier === 'tier3') {
                            return (
                                <div className="space-y-6">
                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Middleware Scaling</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                <tr className="border-b border-blue-500/20">
                                                    <th className="text-left py-2 text-gray-400">Layers</th>
                                                    <th className="text-right py-2 text-gray-400">Avg (μs)</th>
                                                    <th className="text-right py-2 text-gray-400">Min (μs)</th>
                                                    <th className="text-right py-2 text-gray-400">Max (μs)</th>
                                                    <th className="text-right py-2 text-gray-400">StdDev</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {tierData.layers.map((layer, idx) => (
                                                    <tr key={idx} className="border-b border-slate-700/50">
                                                        <td className="py-2 font-mono text-blue-400">{layer.count}</td>
                                                        <td className="text-right py-2 font-mono">{layer.avg.toFixed(3)}</td>
                                                        <td className="text-right py-2 font-mono text-gray-400">{layer.min.toFixed(3)}</td>
                                                        <td className="text-right py-2 font-mono text-gray-400">{layer.max.toFixed(3)}</td>
                                                        <td className="text-right py-2 font-mono text-gray-400">{layer.stddev.toFixed(3)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
                                            <div className="text-lg font-semibold">
                                                Amortized cost per middleware layer: <span className="text-purple-400">{tierData.amortizedCost.toFixed(3)} μs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                                    <h3 className="text-xl font-bold mb-4 text-blue-400">Baseline</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Average:</span>
                                            <span className="font-mono text-white">{tierData.baseline.avg.toFixed(3)} μs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Min:</span>
                                            <span className="font-mono text-gray-300">{tierData.baseline.min.toFixed(3)} μs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Max:</span>
                                            <span className="font-mono text-gray-300">{tierData.baseline.max.toFixed(3)} μs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">StdDev:</span>
                                            <span className="font-mono text-gray-300">{tierData.baseline.stddev.toFixed(3)} μs</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-green-500/20">
                                    <h3 className="text-xl font-bold mb-4 text-green-400">EventChains</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Average:</span>
                                            <span className="font-mono text-white">{tierData.eventchains.avg.toFixed(3)} μs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Min:</span>
                                            <span className="font-mono text-gray-300">{tierData.eventchains.min.toFixed(3)} μs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Max:</span>
                                            <span className="font-mono text-gray-300">{tierData.eventchains.max.toFixed(3)} μs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">StdDev:</span>
                                            <span className="font-mono text-gray-300">{tierData.eventchains.stddev.toFixed(3)} μs</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                                    <h3 className="text-xl font-bold mb-4">Overhead Analysis</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-3xl font-bold text-purple-400 mb-1">
                                                {tierData.overhead.toFixed(2)}%
                                            </div>
                                            <div className="text-gray-400 text-sm">Percentage Overhead</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-blue-400 mb-1">
                                                +{tierData.overheadUs.toFixed(3)} μs
                                            </div>
                                            <div className="text-gray-400 text-sm">Absolute Overhead</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Benchmark Tier Explanations */}
                    <div className="mt-12 grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-lg font-bold mb-3 text-blue-400">Understanding the Tiers</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li>
                                    <strong className="text-white">Tier 1 - Minimal Baseline:</strong> Raw orchestration framework overhead comparing bare function calls to EventChains with 0 middleware
                                </li>
                                <li>
                                    <strong className="text-white">Tier 2 - Feature Parity:</strong> Abstraction cost vs feature-equivalent manual code (error handling, tracking, cleanup)
                                </li>
                                <li>
                                    <strong className="text-white">Tier 3 - Middleware Scaling:</strong> Quantifies cost per middleware layer with 0, 1, 3, 5, and 10 layers
                                </li>
                                <li>
                                    <strong className="text-white">Tier 4 - Real-World:</strong> Practical instrumentation scenarios comparing manual vs middleware-based logging and timing
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 p-6 rounded-xl border border-green-500/20">
                            <h3 className="text-lg font-bold mb-3 text-green-400">Key Findings</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start space-x-2">
                                    <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Framework overhead ranges from 7-48% depending on implementation and workload</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <Cpu className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>Middleware adds only 0.018-0.032 μs per layer amortized</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <HardDrive className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <span>Overhead becomes negligible compared to typical I/O operations (1-100ms)</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <BarChart3 className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <span>Rust shows lowest overhead at ~7% for large graphs, C shows 30-48%, C# higher for minimal operations</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Examples Section */}
            <section id="examples" className="py-20 px-4 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Implementation Examples</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">C Implementation</h3>
                            <p className="text-gray-400 mb-4">
                                High-performance C library with security features, reference counting, and minimal overhead
                            </p>
                            <a
                                href="https://github.com/RPDevJesco/EventChain-Performance-Test"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-sm font-semibold flex items-center space-x-1 hover:text-blue-300"
                            >
                                <span>View on GitHub</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">C# Implementation</h3>
                            <p className="text-gray-400 mb-4">
                                .NET library with async support, LINQ integration, and comprehensive middleware system
                            </p>
                            <a
                                href="https://github.com/RPDevJesco/EventChains-CS-PerformanceTest"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 text-sm font-semibold flex items-center space-x-1 hover:text-purple-300"
                            >
                                <span>View on GitHub</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Rust Implementation</h3>
                            <p className="text-gray-400 mb-4">
                                Type-safe Rust implementation with zero-cost abstractions and compile-time guarantees
                            </p>
                            <a
                                href="https://github.com/RPDevJesco/rust_eventchains_performance_test"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-400 text-sm font-semibold flex items-center space-x-1 hover:text-orange-300"
                            >
                                <span>View on GitHub</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Salesforce Apex Implementation</h3>
                            <p className="text-gray-400 mb-4">
                                Salesforce Apex implementation with batch, queueable and standard Apex examples
                            </p>
                            <a
                                href="https://github.com/RPDevJesco/salesforce-eventchains"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-sm font-semibold flex items-center space-x-1 hover:text-blue-300"
                            >
                                <span>View on GitHub</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
                        <h3 className="text-2xl font-bold mb-6">Quick Start Example (C#)</h3>
                        <pre className="bg-slate-900/50 p-6 rounded-lg overflow-x-auto text-sm">
              <code className="text-gray-300">{`// Define events
var validateInput = new Event<Context>((ctx) => {
    if (string.IsNullOrEmpty(ctx.Get<string>("input")))
        return EventResult.Failure();
    return EventResult.Success();
});

var processData = new Event<Context>((ctx) => {
    var input = ctx.Get<string>("input");
    ctx.Set("result", input.ToUpper());
    return EventResult.Success();
});

// Create chain with middleware
var chain = new EventChain<Context>()
    .AddMiddleware(new LoggingMiddleware())
    .AddMiddleware(new TimingMiddleware())
    .AddEvent(validateInput)
    .AddEvent(processData);

// Execute
var context = new Context();
context.Set("input", "hello world");
var result = chain.Execute(context);`}</code>
            </pre>
                    </div>
                </div>
            </section>

            {/* Documentation Section */}
            <section id="docs" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Documentation</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Getting Started</h3>
                            <p className="text-gray-400 mb-4">
                                Installation, basic concepts, and your first EventChain
                            </p>
                            <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                                <span>Read more</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Code className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">API Reference</h3>
                            <p className="text-gray-400 mb-4">
                                Complete API documentation for events, chains, and middleware
                            </p>
                            <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                                <span>Read more</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                                <GitBranch className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Design Patterns</h3>
                            <p className="text-gray-400 mb-4">
                                Common patterns, best practices, and architectural guidance
                            </p>
                            <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                                <span>Read more</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Testing Guide</h3>
                            <p className="text-gray-400 mb-4">
                                Unit testing events and integration testing chains
                            </p>
                            <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                                <span>Read more</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 px-4 bg-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">
                                Is EventChains just Chain of Responsibility?
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                No. While both involve chaining, they solve different problems. Chain of Responsibility has handlers
                                that decide whether to process a request and pass it along. EventChains has a fixed, known sequence
                                where every event executes in order. EventChains is better for predictable workflows; CoR is better
                                for dynamic request routing.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">
                                Why not just use pipelines?
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                EventChains provides built-in middleware support, error handling modes, and context management that
                                simple pipelines don't offer out of the box. If you only need data transformation with no cross-cutting
                                concerns, pipelines are simpler. EventChains shines when you need logging, timing, validation, and
                                other concerns applied consistently across all steps.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">
                                Can I branch, loop, or abort execution?
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                Yes, with different approaches:
                            </p>
                            <ul className="text-gray-300 space-y-2 ml-4">
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span><strong>Branching:</strong> Use conditional events or create sub-chains based on context state</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span><strong>Loops:</strong> Execute chains recursively or use composite events that iterate</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span><strong>Abort:</strong> Return failure from an event; chain stops based on fault tolerance mode</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">
                                What about async or distributed workflows?
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                EventChains supports async execution in languages with async/await. Each event can be async, and the
                                chain awaits completion. For distributed workflows across services, EventChains can be combined with
                                patterns like Saga for compensation logic, though the core pattern is designed for in-process sequential execution.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">
                                What's the performance overhead?
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Minimal. Benchmarks show 5-7 microseconds per operation for the framework itself, plus ~0.02-0.03μs per
                                middleware layer. Compared to typical I/O operations (database queries at 1-10ms, API calls at 10-100ms),
                                this overhead is negligible. See the Benchmarks section for detailed cross-platform results.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">
                                How do I get started?
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                Start small with an existing sequential workflow:
                            </p>
                            <ol className="text-gray-300 space-y-2 ml-4 list-decimal">
                                <li>Identify a function with multiple sequential steps</li>
                                <li>Extract each step into an event</li>
                                <li>Move shared state to context</li>
                                <li>Create a chain and add events</li>
                                <li>Extract cross-cutting concerns into middleware</li>
                            </ol>
                            <p className="text-gray-300 leading-relaxed mt-3">
                                Check the Examples section for language-specific implementations you can adapt.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-blue-500/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <LogoSVG />
                                <span className="text-xl font-bold">EventChains</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                A composable design pattern for orchestrating deterministic workflows with event-driven execution
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">Resources</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><button onClick={() => scrollToSection('pattern')} className="hover:text-white transition-colors">The Pattern</button></li>
                                <li><button onClick={() => scrollToSection('examples')} className="hover:text-white transition-colors">Examples</button></li>
                                <li><button onClick={() => scrollToSection('benchmarks')} className="hover:text-white transition-colors">Benchmarks</button></li>
                                <li><button onClick={() => scrollToSection('docs')} className="hover:text-white transition-colors">Documentation</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">Connect</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>
                                    <a href="https://github.com/RPDevJesco?tab=repositories&q=eventchain" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
                                        <Github className="w-4 h-4" />
                                        <span>GitHub</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-blue-500/10 text-center text-gray-400 text-sm">
                        <p>© 2025 EventChains. Created by RPDevJesco (Jesse Glover)</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EventChainsWebsite;