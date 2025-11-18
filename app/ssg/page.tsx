import Link from "next/link";

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

export default async function SSGPage() {
  const joke = await getJoke();
  const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-300 hover:text-green-100 mb-8 transition-colors"
        >
          ← Back Home
        </Link>

        <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SSG</h1>
              <p className="text-green-300">Static Site Generation</p>
            </div>
          </div>

          <div className="bg-green-900/50 border border-green-700 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-green-200 mb-3 text-lg">
              ⚡ How SSG Works:
            </h3>
            <ul className="text-green-100 space-y-2 text-sm">
              <li>✓ Joke fetched ONCE at build time</li>
              <li>✓ HTML pre-generated and cached</li>
              <li>✓ Served instantly from CDN</li>
              <li>✓ Fastest possible delivery</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-3">
                😄 Your "Frozen" Joke:
              </p>
              <p className="text-xl text-white mb-4 leading-relaxed">
                {joke.setup}
              </p>
              <p className="text-2xl text-green-400 font-semibold leading-relaxed">
                {joke.punchline}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Type: {joke.type} • ID: {joke.id}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-2">🏗️ Built At:</p>
              <p className="text-lg font-mono text-white">{buildTime}</p>
              <p className="text-xs text-slate-500 mt-2">
                This timestamp was set when the page was built
              </p>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-6">
              <p className="text-sm font-bold text-amber-300 mb-2">
                ⚠️ Notice:
              </p>
              <p className="text-sm text-amber-100">
                <strong>Refresh this page multiple times</strong> - the joke
                NEVER changes! It was "frozen" at build time. To get a new joke,
                you'd need to rebuild the app.
              </p>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-xl p-6">
              <p className="text-sm font-bold text-green-300 mb-2">
                ✅ Use SSG When:
              </p>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Content rarely changes</li>
                <li>• Speed is critical</li>
                <li>• Blogs, documentation, marketing</li>
                <li>• Can rebuild when needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
