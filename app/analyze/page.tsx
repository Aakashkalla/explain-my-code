"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Link from "next/link";

type CodeResponse = {
    issues: {
        critical: string[];
        major: string[];
        minor: string[];
    };
    explanation: string;
    improved_code: string;
};

export default function AnalyzePage() {
    const [response, setResponse] = useState<CodeResponse | null>(null);
    const [code, setCode] = useState("");
    const [copynotif, setCopyNotif] = useState(false);
    const [loading, setLoading] = useState(false);

    async function codeReviewCall() {
        if (!code.trim()) return;
        setCopyNotif(false);
        setResponse(null);
        setLoading(true);
        try {
        const res = await fetch("/api/analyze", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            code,
            }),
        });

        const data = await res.json();
        console.log(data.message);
        const cleaned = data.message.replace(/```json|```/g, "");
        const parsed = JSON.parse(cleaned);
        console.log("Valid JSON", parsed);
        setResponse(parsed);
        } catch (e) {
        console.error("Parsing Failed", e);
        } finally {
        setLoading(false);
        }
    }

    async function handleCopy() {
        try {
        if (response?.improved_code) {
            await navigator.clipboard.writeText(response.improved_code);
            setCopyNotif(true);
            setTimeout(() => setCopyNotif(false), 2000);
        }
        } catch (e) {
        console.log(e);
        }
    }

    return (
        <main className="h-screen bg-[#0E0E10] text-neutral-300 font-sans flex flex-col overflow-hidden selection:bg-indigo-500/30">
        {/* Header */}
        <header className="h-14 border-b border-white/10 bg-[#161618] flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-white font-medium tracking-tight text-xl">Refyn</span>
            </Link>
            <div className="flex text-xs text-neutral-500 gap-4">
                <Link href="/" className="hover:text-neutral-300 transition-colors">Home</Link>
                <a href="/" className="hover:text-neutral-300 transition-colors">GitHub</a>
            </div>
        </header>

        {/* Main Split Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            
            {/* Left Panel: Editor */}
            <section className="flex-1 flex flex-col border-r border-white/10 bg-[#0E0E10] relative z-10 lg:max-w-[50vw]">
            <div className="h-12 bg-[#161618] border-b border-white/5 flex items-center px-4 shrink-0 justify-between">
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Input source code
                </span>
            </div>
            
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste your React, Python, or TypeScript code here for review..."
                className="flex-1 w-full bg-transparent p-6 text-sm font-mono text-neutral-300 focus:outline-none resize-none placeholder-neutral-700/50"
                spellCheck={false}
            />
            
            <div className="p-4 border-t border-white/10 bg-[#161618] shrink-0 flex justify-between items-center sm:sticky sm:bottom-0">
                <span className="text-xs text-neutral-500 font-mono hidden sm:inline-block">
                {code.split('\n').length} lines
                </span>
                <button 
                onClick={codeReviewCall} 
                disabled={loading || !code.trim()} 
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-sm font-medium rounded-md disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                {loading ? (
                    <>
                    <svg className="animate-spin h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                    </>
                ) : (
                    <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Run Analysis
                    </>
                )}
                </button>
            </div>
            </section>

        {/* Right Panel: Results */}
            <section className="flex-1 flex flex-col bg-[#111113] overflow-hidden lg:max-w-[50vw]">
            <div className="h-12 bg-[#161618] border-b border-white/5 flex items-center px-4 shrink-0 justify-between">
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Analysis Report
                </span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                {!response && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-600">
                    <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.774-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p className="text-sm font-medium">Ready to analyze</p>
                    <p className="text-xs mt-1">Paste your code and run the analysis to get started.</p>
                </div>
                )}

            {loading && (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500">
                    <div className="flex space-x-2 mb-4">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <p className="text-sm animate-pulse">Running static review & AI models...</p>
                </div>
            )}

                {response && (
                <div className="flex flex-col gap-6 pb-20 sm:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Explanation Card */}
                    <div className="bg-[#161618] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">AI Explanation</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                        {response.explanation}
                    </p>
                    </div>

                {/* Categorized Issues List */}
                    <div className="flex flex-col gap-3">
                    {response.issues.critical.length === 0 && response.issues.major.length === 0 && response.issues.minor.length === 0 ? (
                        <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="text-emerald-400 text-sm font-medium">Code is looking clean!</h4>
                            <p className="text-emerald-400/70 text-xs mt-1">No critical, major, or minor issues found in the analysis.</p>
                        </div>
                        </div>
                    ) : null}

                    {response.issues.critical.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <h4 className="text-red-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                            Critical Issues ({response.issues.critical.length})
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {response.issues.critical.map((issue, i) => (
                            <li key={i} className="text-sm text-neutral-300 flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-red-500/10">
                                <span className="text-red-500 mt-0.5">⊗</span>
                                <span className="leading-relaxed">{issue}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}

                    {response.issues.major.length > 0 && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                            Major Issues ({response.issues.major.length})
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {response.issues.major.map((issue, i) => (
                            <li key={i} className="text-sm text-neutral-300 flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-amber-500/10">
                                <span className="text-amber-500/70 mt-0.5">⚠</span>
                                <span className="leading-relaxed">{issue}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}

                    {response.issues.minor.length > 0 && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                            Minor Issues ({response.issues.minor.length})
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {response.issues.minor.map((issue, i) => (
                            <li key={i} className="text-sm text-neutral-300 flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-blue-500/10">
                                <span className="text-blue-500 mt-0.5">ℹ</span>
                                <span className="leading-relaxed">{issue}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>

                    {/* Improved Code Block */}
                    {response.improved_code && (
                    <div className="bg-[#161618] border border-white/10 rounded-xl overflow-hidden flex flex-col mt-4">
                        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#1A1A1C] shrink-0">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Refactored Code</h4>
                        <button 
                            onClick={handleCopy}
                            className="text-xs font-medium text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5 flex items-center gap-2" 
                        >
                            {copynotif ? (
                            <>
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                            </>
                            ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy Code
                            </>
                            )}
                        </button>
                        </div>
                        <div className="text-[13px] leading-relaxed [&>pre]:m-0! [&>pre]:bg-transparent! [&>pre]:p-4! custom-scrollbar overflow-x-auto">
                        <SyntaxHighlighter 
                            style={atomOneDark} 
                            language="typescript"
                            customStyle={{ background: 'transparent' }}
                        >
                            {response.improved_code}
                        </SyntaxHighlighter>
                        </div>
                    </div>
                    )}
                </div>
                )}
            </div>
            </section>
        </div>
        </main>
    );
}