"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface JokeData {
  setup: string;
  punchline: string;
  type: string;
  id: number;
}

export default function CSRPage() {
  const [joke, setJoke] = useState<JokeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchJoke();
  }, [count]);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await res.json();
      setJoke(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-100 mb-8 transition-colors"
        >
          ← Back Home
        </Link>

        <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">CSR</h1>
              <p className="text-orange-300">Client-Side Rendering</p>
            </div>
          </div>

          <div className="bg-orange-900/50 border border-orange-700 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-orange-200 mb-3 text-lg">
              ⚡ How CSR Works:
            </h3>
            <ul className="text-orange-100 space-y-2 text-sm">
              <li>✓ Page loads with empty state</li>
              <li>✓ JavaScript fetches joke in browser</li>
              <li>✓ React renders after data loads</li>
              <li>✓ Real-time, interactive updates</li>
            </ul>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-400 mx-auto mb-4"></div>
              <p className="text-orange-300 text-lg">
                Fetching joke from browser...
              </p>
            </div>
          ) : joke ? (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
                <p className="text-sm text-slate-400 mb-3">
                  😄 Your Interactive Joke:
                </p>
                <p className="text-xl text-white mb-4 leading-relaxed">
                  {joke.setup}
                </p>
                <p className="text-2xl text-orange-400 font-semibold leading-relaxed">
                  {joke.punchline}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-500">
                    Type: {joke.type} • ID: {joke.id}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
                <p className="text-sm text-slate-400 mb-2">🎯 Jokes Fetched:</p>
                <p className="text-4xl font-bold text-white">{count + 1}</p>
              </div>

              <button
                onClick={() => setCount((c) => c + 1)}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/50"
              >
                {loading ? "Loading..." : "🎲 Get New Joke!"}
              </button>

              <div className="bg-lime-900/30 border border-lime-700 rounded-xl p-6">
                <p className="text-sm font-bold text-lime-300 mb-2">
                  ✨ Notice:
                </p>
                <p className="text-sm text-lime-100">
                  Every click fetches a <strong>brand new joke</strong> from the
                  API! This is pure client-side rendering with real-time
                  updates.
                </p>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-xl p-6">
                <p className="text-sm font-bold text-green-300 mb-2">
                  ✅ Use CSR When:
                </p>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• Need real-time interactions</li>
                  <li>• Building dashboards/apps</li>
                  <li>• User-specific content</li>
                  <li>• SEO is not critical</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-red-400 text-lg">Failed to load joke 😢</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
