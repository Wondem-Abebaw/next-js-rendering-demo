import Link from "next/link";

interface JokeData {
  setup: string;
  punchline: string;
  type: string;
  id: number;
}

async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke", {
    cache: "no-store", // This makes it SSR - no caching!
  });
  if (!res.ok) throw new Error("Failed to fetch joke");
  const data: JokeData = await res.json();
  return data;
}

export default async function SSRPage() {
  const joke = await getJoke();
  const serverTime = new Date().toISOString();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-100 mb-8 transition-colors"
        >
          ← Back Home
        </Link>

        <div className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl">
              🔄
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SSR</h1>
              <p className="text-blue-300">Server-Side Rendering</p>
            </div>
          </div>

          <div className="bg-blue-900/50 border border-blue-700 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-blue-200 mb-3 text-lg">
              ⚡ How SSR Works:
            </h3>
            <ul className="text-blue-100 space-y-2 text-sm">
              <li>✓ Server fetches joke on EVERY request</li>
              <li>✓ Complete HTML rendered on server</li>
              <li>✓ Always fresh data, never cached</li>
              <li>✓ Good for SEO, always up-to-date</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-6">
              <p className="text-sm text-slate-400 mb-3">😄 Your Joke:</p>
              <p className="text-xl text-white mb-4 leading-relaxed">
                {joke.setup}
              </p>
              <p className="text-2xl text-blue-400 font-semibold leading-relaxed">
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
                ⏰ Rendered on Server at:
              </p>
              <p className="text-lg font-mono text-white">{serverTime}</p>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6">
              <p className="text-sm font-bold text-yellow-300 mb-2">
                🧪 Test It:
              </p>
              <p className="text-sm text-yellow-100">
                <strong>Refresh this page</strong> to get a NEW joke! Each
                refresh = new server request = fresh data.
              </p>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-xl p-6">
              <p className="text-sm font-bold text-green-300 mb-2">
                ✅ Use SSR When:
              </p>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Data changes frequently</li>
                <li>• Need personalized content</li>
                <li>• Require authentication</li>
                <li>• SEO with dynamic data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
