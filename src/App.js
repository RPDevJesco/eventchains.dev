import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Zap, Shield, GitBranch, BarChart3, BookOpen, Github, Menu, X } from 'lucide-react';

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

const EventChainsWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animateFlow, setAnimateFlow] = useState(false);

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

            {/* Desktop Navigation */}
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
                href="https://github.com/RPDevJesco"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white flex items-center space-x-1"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
                href="https://github.com/RPDevJesco"
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
                onClick={() => scrollToSection('examples')}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              >
                <span>View Examples</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('pattern')}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold border border-blue-500/30 transition-colors"
              >
                Learn the Pattern
              </button>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="max-w-5xl mx-auto">
            <DiagramSVG className="w-full h-auto" />
            <div className="mt-6 text-center text-sm text-gray-400">
              Sequential execution with composable middleware wrapping each event
            </div>
          </div>

          {/* Three Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Maintainable</h3>
              <p className="text-gray-400">
                Clear separation of concerns keeps business logic pure and infrastructure code isolated in middleware
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Composable</h3>
              <p className="text-gray-400">
                Mix and match events and middleware to create new workflows without duplicating code
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Deterministic</h3>
              <p className="text-gray-400">
                Same input always produces the same execution path, making testing and debugging straightforward
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pattern Section */}
      <section id="pattern" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">The Pattern</h2>
          
          <div className="space-y-12">
            {/* Intent */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Intent</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                EventChains orchestrates sequential execution of discrete units of work (events) through a configurable 
                pipeline of cross-cutting concerns (middleware). It solves the problem of maintaining complex workflows 
                where business logic becomes entangled with infrastructure code like logging, error handling, and timing.
              </p>
            </div>

            {/* Structure */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Structure</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 text-cyan-400">Core Components</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>EventContext:</strong> Shared state container that flows through the chain</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>ChainableEvent:</strong> Discrete unit of business logic</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Middleware:</strong> Wraps event execution with cross-cutting concerns</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>EventChain:</strong> Orchestrates sequential flow and error handling</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-cyan-400">Execution Flow</h4>
                  <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-gray-300 space-y-1">
                    <div>1. Chain.Execute() called</div>
                    <div>2. Build middleware pipeline</div>
                    <div className="pl-4">↓ For each event:</div>
                    <div className="pl-8">↓ Middleware wraps event</div>
                    <div className="pl-12">↓ Event executes</div>
                    <div className="pl-8">↓ Middleware post-process</div>
                    <div className="pl-4">↓ Check error handling mode</div>
                    <div>3. Return final result + context</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicability */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-green-500/20">
                <h3 className="text-xl font-bold mb-4 text-green-400">When to Use</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Sequential processing where order matters</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Multiple cross-cutting concerns needed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Workflows need to be composable and reusable</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Testing isolation is important</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Business logic changes frequently</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-bold mb-4 text-red-400">When NOT to Use</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Simple CRUD operations with no processing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Parallel workflows without dependencies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Real-time streaming with latency concerns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Fire-and-forget with no result tracking</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20 overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Pattern Comparison</h3>
              <table className="w-full text-left">
                <thead className="border-b border-blue-500/30">
                  <tr className="text-gray-400">
                    <th className="pb-3 pr-4">Pattern</th>
                    <th className="pb-3 pr-4">Structure</th>
                    <th className="pb-3 pr-4">Best For</th>
                    <th className="pb-3">Key Difference</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-bold text-blue-400">EventChains</td>
                    <td className="py-3 pr-4">Fixed sequence + middleware</td>
                    <td className="py-3 pr-4">Predictable workflows</td>
                    <td className="py-3">Built-in cross-cutting concerns</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">Chain of Responsibility</td>
                    <td className="py-3 pr-4">Dynamic handler selection</td>
                    <td className="py-3 pr-4">Request routing</td>
                    <td className="py-3">Handler determines if it processes</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">Pipeline</td>
                    <td className="py-3 pr-4">Simple transformation chain</td>
                    <td className="py-3 pr-4">Data transformation</td>
                    <td className="py-3">No built-in middleware support</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold">Saga</td>
                    <td className="py-3 pr-4">Distributed transactions</td>
                    <td className="py-3 pr-4">Microservices coordination</td>
                    <td className="py-3">Cross-service with compensation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* C# Example */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">C# / .NET</h3>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300">Object-Oriented</span>
              </div>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-300">{`var chain = new EventChain();

// Add middleware (LIFO order)
chain.UseMiddleware(new LoggingMiddleware());
chain.UseMiddleware(new TimingMiddleware());

// Add events
chain.AddEvent(new ValidateOrderEvent());
chain.AddEvent(new ProcessPaymentEvent());
chain.AddEvent(new SendConfirmationEvent());

// Execute
var result = await chain.ExecuteAsync();`}</code>
              </pre>
            </div>

            {/* Rust Example */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">Rust</h3>
                <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300">Systems</span>
              </div>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-300">{`let mut chain = EventChain::new();

// Add middleware
chain.use_middleware(LoggingMiddleware::new());
chain.use_middleware(TimingMiddleware::new());

// Add events
chain.add_event(ValidateOrderEvent);
chain.add_event(ProcessPaymentEvent);
chain.add_event(SendConfirmationEvent);

// Execute
let result = chain.execute()?;`}</code>
              </pre>
            </div>

            {/* C Example */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">C</h3>
                <span className="px-3 py-1 bg-gray-500/20 rounded-full text-sm text-gray-300">Embedded</span>
              </div>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-300">{`EventChain* chain = eventchain_create();

// Add middleware
eventchain_use_middleware(chain, 
  logging_middleware);
eventchain_use_middleware(chain,
  timing_middleware);

// Add events
eventchain_add_event(chain,
  validate_order_event);
eventchain_add_event(chain,
  process_payment_event);

// Execute
Result result = eventchain_execute(chain);`}</code>
              </pre>
            </div>

            {/* Apex (Salesforce) Example */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">Apex / Salesforce</h3>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300">Enterprise</span>
              </div>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-300">{`EventChain chain = new EventChain();

// Add middleware
chain.useMiddleware(
  new LoggingMiddleware());
chain.useMiddleware(
  new GovernorLimitsMiddleware());

// Add events
chain.addEvent(new ValidateAccountsEvent());
chain.addEvent(new CalculateMetricsEvent());
chain.addEvent(new UpdateAccountsEvent());

// Execute
ChainResult result = chain.execute();`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              The pattern adapts idiomatically to each language while maintaining core concepts
            </p>
            <a
              href="https://github.com/RPDevJesco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-blue-500/30 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View More Examples on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section id="benchmarks" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Performance Benchmarks</h2>
          
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-4">
              Multi-tier benchmarking across platforms demonstrates EventChains' minimal overhead
            </p>
            <p className="text-gray-400">
              Tests measure framework cost, abstraction overhead, middleware scaling, and real-world performance
            </p>
          </div>

          {/* Benchmark Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <div className="text-sm text-gray-400 mb-2">Tier 1: Framework Overhead</div>
              <div className="text-3xl font-bold text-blue-400 mb-1">5-7μs</div>
              <div className="text-sm text-gray-500">per operation</div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/20">
              <div className="text-sm text-gray-400 mb-2">Tier 2: Abstraction Cost</div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">5-7μs</div>
              <div className="text-sm text-gray-500">vs manual code</div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20">
              <div className="text-sm text-gray-400 mb-2">Tier 3: Middleware Scaling</div>
              <div className="text-3xl font-bold text-purple-400 mb-1">~0.2μs</div>
              <div className="text-sm text-gray-500">per layer</div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-green-500/20">
              <div className="text-sm text-gray-400 mb-2">Tier 4: Real-World</div>
              <div className="text-3xl font-bold text-green-400 mb-1">6-7μs</div>
              <div className="text-sm text-gray-500">production overhead</div>
            </div>
          </div>

          {/* Cross-Platform Results */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Cross-Platform Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-blue-500/30">
                  <tr className="text-gray-400">
                    <th className="pb-3 pr-4">Language</th>
                    <th className="pb-3 pr-4">Platform</th>
                    <th className="pb-3 pr-4">Framework Overhead</th>
                    <th className="pb-3 pr-4">Middleware/Layer</th>
                    <th className="pb-3">Verdict</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">C#</td>
                    <td className="py-3 pr-4">Windows (Ryzen 9)</td>
                    <td className="py-3 pr-4">7.06μs</td>
                    <td className="py-3 pr-4">0.20μs</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">✓ Excellent</span></td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">C#</td>
                    <td className="py-3 pr-4">macOS (M4)</td>
                    <td className="py-3 pr-4">5.62μs</td>
                    <td className="py-3 pr-4">-0.62μs</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">✓ Excellent</span></td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">C</td>
                    <td className="py-3 pr-4">macOS (M4)</td>
                    <td className="py-3 pr-4">0.15μs</td>
                    <td className="py-3 pr-4">0.02μs</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">✓ Minimal</span></td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">C</td>
                    <td className="py-3 pr-4">Windows (Ryzen 9)</td>
                    <td className="py-3 pr-4">0.22μs</td>
                    <td className="py-3 pr-4">0.03μs</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">✓ Minimal</span></td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold">Rust</td>
                    <td className="py-3 pr-4">macOS (M4)</td>
                    <td className="py-3 pr-4">7.27%</td>
                    <td className="py-3 pr-4">1.66μs</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">✓ Good</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold">Apex</td>
                    <td className="py-3 pr-4">Salesforce</td>
                    <td className="py-3 pr-4">1-2ms CPU</td>
                    <td className="py-3 pr-4">0-1ms</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">✓ Production Ready</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Context Box */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
            <h4 className="font-bold text-blue-400 mb-3">Performance in Context</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">EventChains overhead:</div>
                <div className="text-white font-semibold">~7μs</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Database query:</div>
                <div className="text-white font-semibold">1,000-10,000μs</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Network API call:</div>
                <div className="text-white font-semibold">10,000-100,000μs</div>
              </div>
            </div>
            <div className="mt-4 text-gray-300">
              → EventChains overhead is <strong className="text-blue-400">negligible</strong> compared to typical I/O operations
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Full benchmark methodology and detailed results available on GitHub
            </p>
          </div>
        </div>
      </section>

      {/* Docs Section */}
      <section id="docs" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Documentation</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core Concepts */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Core Concepts</h3>
              <p className="text-gray-400 mb-4">
                Understand Events, Context, Middleware, and Chains
              </p>
              <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                <span>Read more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Lifecycle */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Execution Lifecycle</h3>
              <p className="text-gray-400 mb-4">
                How events flow through the middleware pipeline
              </p>
              <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                <span>Read more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Middleware Guide */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Middleware Guide</h3>
              <p className="text-gray-400 mb-4">
                Create reusable cross-cutting concerns
              </p>
              <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                <span>Read more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Error Handling */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Error Handling</h3>
              <p className="text-gray-400 mb-4">
                Fault tolerance modes and error strategies
              </p>
              <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                <span>Read more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Advanced Patterns */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Patterns</h3>
              <p className="text-gray-400 mb-4">
                Branching, composition, and async chains
              </p>
              <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                <span>Read more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Testing Guide */}
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
            {/* FAQ Item 1 */}
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

            {/* FAQ Item 2 */}
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

            {/* FAQ Item 3 */}
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

            {/* FAQ Item 4 */}
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

            {/* FAQ Item 5 */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
              <h3 className="text-xl font-bold mb-3 text-blue-400">
                What's the performance overhead?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Minimal. Benchmarks show 5-7 microseconds per operation for the framework itself, plus ~0.2μs per 
                middleware layer. Compared to typical I/O operations (database queries at 1-10ms, API calls at 10-100ms), 
                this overhead is negligible. See the Benchmarks section for detailed cross-platform results.
              </p>
            </div>

            {/* FAQ Item 6 */}
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
                  <a href="https://github.com/RPDevJesco" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
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