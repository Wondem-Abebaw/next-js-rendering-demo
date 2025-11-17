"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface JokeData {
  setup: string;
  punchline: string;
  type: string;
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-orange-600 hover:text-orange-800 mb-6 block"
        >
          ← Back Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            CSR - Client-Side Rendering
          </h2>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-orange-900 mb-2">
              How CSR Works:
            </h3>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>✓ Renders in browser</li>
              <li>✓ Fetches data after mount</li>
              <li>✓ Real-time updates</li>
              <li>✓ Interactive experiences</li>
            </ul>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-slate-600 mt-4">Loading...</p>
            </div>
          ) : joke ? (
            <div className="space-y-4">
              <div className="bg-slate-50 border rounded-lg p-6">
                <p className="text-sm text-slate-600 mb-2">Setup:</p>
                <p className="text-xl text-slate-900 mb-4">{joke.setup}</p>
                <p className="text-sm text-slate-600 mb-2">Punchline:</p>
                <p className="text-xl font-semibold text-slate-900">
                  {joke.punchline}
                </p>
              </div>

              <div className="bg-slate-50 border rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Jokes Fetched</p>
                <p className="text-3xl font-bold text-slate-900">{count + 1}</p>
              </div>

              <button
                onClick={() => setCount((c) => c + 1)}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
              >
                Get New Joke
              </button>

              <div className="bg-lime-50 border border-lime-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-lime-900">Notice:</p>
                <p className="text-sm text-lime-800 mt-1">
                  Every click fetches NEW data! This is pure client-side
                  rendering.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
