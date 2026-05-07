import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function LandingPage() {
  const dummyCode = `function calculateTotal(items) {
  let total = 0;
  for(let i = 0; i <= items.length; i++) {
    // BUG: Off-by-one error leading to undefined
    total += items[i].price; 
  }
  return total;
}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 selection:bg-indigo-500/30 font-sans">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium tracking-tight text-xl">Refyn</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          </div>
          <Link href="/analyze" className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-md border border-white/10 shadow-sm">
            Try Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Refyn 1.0 is live
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              Ship better code <br />
              with <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">AI context.</span>
            </h1>
            <p className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-lg">
              Instantly detect bugs, identify security vulnerabilities, and generate cleaner refactors. Your personal expert senior engineer, available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/analyze" className="w-full sm:w-auto px-8 py-3 bg-white text-black hover:bg-neutral-200 transition-colors rounded-md font-medium text-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Start Analyzing
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-md font-medium transition-colors text-center">
                Working
              </a>
            </div>
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 shadow-2xl overflow-hidden relative">
              <div className="h-10 bg-[#1A1A1A] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs font-mono text-neutral-500">calculateTotal.js</span>
              </div>
              <div className="p-4 text-sm relative">
                <SyntaxHighlighter style={atomOneDark} language="javascript" customStyle={{background:'transparent'}}>
                  {dummyCode}
                </SyntaxHighlighter>
                
                {/* Floating Issue Badge */}
                <div className="absolute top-12 right-4 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-xs font-medium flex items-start gap-2 shadow-lg backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mt-0.5" />
                    <div>
                      <p className="font-bold text-red-300">Critical Error</p>
                      <p className="text-red-400/80 mt-0.5">Off-by-one error causes TypeError</p>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-black relative border-t border-white/5">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">Deep insights for every line</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Everything you need to write secure, scalable, and maintainable software without slowing down your workflow.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center mb-6 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Critical Bug Detection</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Uncover hidden runtime errors, syntax mistakes, and edge cases before they make it to production.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">AI Refactoring</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Get cleaner, more idiomatic code generation. We rewrite messy functions into elegant, optimized solutions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Security Auditing</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Spot injection vulnerabilities, insecure memory access, and common CVE patterns with severity-based classification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5 relative bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">How it works</h2>
            <p className="text-neutral-400">From messy code to production-ready in seconds.</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono shrink-0">1</div>
              <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex-1">
                <h3 className="text-white font-medium mb-2">Paste your code</h3>
                <p className="text-neutral-400 text-sm">Drop your messy, buggy, or unoptimized code into our secure editor interface.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono shrink-0">2</div>
              <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex-1">
                <h3 className="text-white font-medium mb-2">Analyze with AI</h3>
                <p className="text-neutral-400 text-sm">Our models scan your logic, identifying bugs, security holes, and code smells instantly.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono shrink-0">3</div>
              <div className="bg-[#111] border border-indigo-500/20 p-6 rounded-xl flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L6.643 12.8 10.823 17l8.534-8.533-1.415-1.414-7.119 7.086z"/></svg>
                </div>
                <h3 className="text-white font-medium mb-2 relative z-10">Review & Copy fixes</h3>
                <p className="text-neutral-400 text-sm relative z-10">Get categorized issue reports, detailed explanations, and copy-paste ready refactored code.</p>
                <div className="mt-6 relative z-10">
                    <Link href="/analyze" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 group">
                      Try it out now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm">Refyn</span>
          </div>
          <p className="text-neutral-500 text-sm">
            Built for developers. Ship with confidence.
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}