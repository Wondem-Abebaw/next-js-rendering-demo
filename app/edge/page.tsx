import Link from "next/link";

export const runtime = "edge";

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

export default async function EdgePage() {
  const joke = await getJoke();
  const edgeTime = new Date().toISOString();

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-100 mb-8 transition-colors"
        >
          ← Back Home
        </Link>

        <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Edge Runtime</h1>
              <p className="text-yellow-300">Ultra-Fast Global Delivery</p>
            </div>
          </div>

          <div className="bg-yellow-900/50 border border-yellow-700 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-yellow-200 mb-3 text-lg">
              ⚡ How Edge Works:
            </h3>
            <ul className="text-yellow-100 space-y-2 text-sm">
              <li>✓ Runs on global edge network</li>
              <li>✓ Closest server to user responds</li>
              <li>✓ Ultra-low latency (&lt; 100ms)</li>
              <li>✓ No cold starts, always fast</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-3">
                😄 Your Edge-Delivered Joke:
              </p>
              <p className="text-xl text-white mb-4 leading-relaxed">
                {joke.setup}
              </p>
              <p className="text-2xl text-yellow-400 font-semibold leading-relaxed">
                {joke.punchline}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Type: {joke.type} • ID: {joke.id}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-2">
                🌍 Rendered on Edge at:
              </p>
              <p className="text-lg font-mono text-white">{edgeTime}</p>
              <p className="text-xs text-slate-500 mt-2">
                From the edge server closest to you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
