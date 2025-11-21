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
    <div className="min-h-screen p-8 bg-white text-black flex flex-col">
      <Link href="/" className="text-blue-700 text-xl hover:underline mb-4">
        ← Back Home
      </Link>
      <div className="space-y-2 flex justify-center items-center flex-col">
        <h1 className="text-5xl font-extrabold">CSR</h1>
        <p className="text-2xl text-gray-700">Client-Side Rendering</p>
      </div>
      {/* Main content: two columns */}
      <div className="flex flex-wrap gap-6">
        {/* Left Column: How it Works + Analogy */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* Header */}

          {/* How CSR Works */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <h3 className="text-3xl font-bold mb-4 text-purple-700">
              ⚡ How CSR Works
            </h3>
            <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
              <li>Browser requests the page.</li>
              <li>Server returns mostly empty HTML shell.</li>
              <li>Browser downloads JavaScript bundle.</li>
              <li>React initializes in browser.</li>
              <li>
                <code className="font-semibold">useEffect</code> runs → fetches
                data.
              </li>
              <li>Browser renders final UI with data.</li>
            </ul>
          </div>

          {/* Restaurant Analogy */}
          <div className="border rounded-2xl p-6 bg-yellow-50">
            <h3 className="text-3xl font-bold mb-2 text-yellow-700">
              🍽 Restaurant Analogy
            </h3>
            <p className="text-lg leading-relaxed">
              CSR is like a restaurant where the waiter gives you an{" "}
              <strong>empty plate</strong>. Then{" "}
              <strong>you (the browser)</strong> go to collect the food (data).
              Server does almost nothing — the customer handles the experience.
            </p>
          </div>
        </div>

        {/* Right Column: Joke + Counter + Button + Notice */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin h-14 w-14 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-6"></div>
              <p className="text-2xl text-gray-600">Fetching joke…</p>
            </div>
          ) : joke ? (
            <>
              {/* Joke Box */}
              <div className="border rounded-2xl p-6 bg-gray-50">
                <p className="text-lg text-gray-500 mb-2">Interactive Joke</p>
                <p className="text-2xl font-semibold mb-2">{joke.setup}</p>
                <p className="text-3xl font-bold text-blue-700">
                  {joke.punchline}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Type: {joke.type} • ID: {joke.id}
                </p>
              </div>

              {/* Counter */}
              <div className="border rounded-2xl p-6 bg-gray-50 text-center">
                <p className="text-xl text-gray-600 mb-1">Jokes Fetched</p>
                <p className="text-5xl font-bold">{count + 1}</p>
              </div>

              {/* Button */}
              <button
                onClick={() => setCount((c) => c + 1)}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-2xl text-2xl font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "🎲 Fetch New Joke"}
              </button>

              {/* Notice */}
              <div className="border rounded-2xl p-6 bg-green-50">
                <h3 className="text-3xl font-bold mb-2 text-green-700">
                  ✨ Notice
                </h3>
                <p className="text-lg">
                  Each button click fetches a new joke{" "}
                  <strong>from the browser</strong>, demonstrating pure
                  client-side rendering.
                </p>
              </div>
            </>
          ) : (
            <p className="text-center text-2xl text-red-600">
              Failed to load joke 😢
            </p>
          )}
        </div>
      </div>

      {/* Full-width "Use When" at center below columns */}
      <div className="mt-10 border rounded-2xl p-8 bg-blue-50 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 text-blue-700">
          ✅ Use CSR When:
        </h3>
        <ul className="list-disc list-inside text-xl space-y-2 leading-relaxed">
          <li>Building dashboards or apps</li>
          <li>UI updates in real-time</li>
          <li>User-specific or private data</li>
          <li>SEO isn’t important</li>
        </ul>
      </div>
    </div>
  );
}
