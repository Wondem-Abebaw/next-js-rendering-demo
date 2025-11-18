import Link from "next/link";

export const revalidate = 10; // Revalidate every 10 seconds

interface JokeData {
  setup: string;
  punchline: string;
  type: string;
  id: number;
}

async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  if (!res.ok) throw new Error("Failed to fetch joke");
  const data: JokeData = await res.json();
  return data;
}

export default async function ISRPage() {
  const joke = await getJoke();
  const generatedAt = new Date().toISOString();

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 mb-8 transition-colors"
        >
          ← Back Home
        </Link>

        <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-3xl">
              🔃
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">ISR</h1>
              <p className="text-purple-300">Incremental Static Regeneration</p>
            </div>
          </div>

          <div className="bg-purple-900/50 border border-purple-700 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-purple-200 mb-3 text-lg">
              ⚡ How ISR Works:
            </h3>
            <ul className="text-purple-100 space-y-2 text-sm">
              <li>✓ Page cached for 10 seconds</li>
              <li>✓ After 10s, regenerates in background</li>
              <li>✓ Users get cached version (fast)</li>
              <li>✓ Fresh joke after revalidation</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-3">
                😄 Your Cached Joke:
              </p>
              <p className="text-xl text-white mb-4 leading-relaxed">
                {joke.setup}
              </p>
              <p className="text-2xl text-purple-400 font-semibold leading-relaxed">
                {joke.punchline}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Type: {joke.type} • ID: {joke.id}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-2">🕐 Generated At:</p>
              <p className="text-lg font-mono text-white">{generatedAt}</p>
              <p className="text-xs text-slate-500 mt-2">
                This joke is served from cache for 10 seconds
              </p>
            </div>

            <div className="bg-cyan-900/30 border border-cyan-700 rounded-xl p-6">
              <p className="text-sm font-bold text-cyan-300 mb-2">
                🧪 Test ISR:
              </p>
              <div className="text-sm text-cyan-100 space-y-2">
                <p>
                  <strong>Step 1:</strong> Refresh rapidly (within 10 seconds) -
                  same joke!
                </p>
                <p>
                  <strong>Step 2:</strong> Wait 10+ seconds and refresh - NEW
                  joke!
                </p>
                <p className="text-xs text-cyan-300 mt-2">
                  ISR = Static speed + automatic freshness 🚀
                </p>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-xl p-6">
              <p className="text-sm font-bold text-green-300 mb-2">
                ✅ Use ISR When:
              </p>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Content updates periodically</li>
                <li>• Need both speed AND freshness</li>
                <li>• E-commerce, news, dashboards</li>
                <li>• Can tolerate slight staleness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
