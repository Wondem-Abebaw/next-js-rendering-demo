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
  return res.json();
}

export default async function ISRPage() {
  const joke = await getJoke();
  const generatedAt = new Date().toISOString();

  return (
    <div className="min-h-screen p-8 bg-white text-black flex flex-col">
      <Link href="/" className="text-purple-700 text-xl hover:underline mb-4">
        ← Back Home
      </Link>

      {/* Header */}
      <div className="space-y-2 flex justify-center items-center flex-col mb-6">
        <h1 className="text-5xl font-extrabold">ISR</h1>
        <p className="text-2xl text-gray-700">
          Incremental Static Regeneration
        </p>
      </div>

      {/* Main content: two columns */}
      <div className="flex flex-wrap gap-6">
        {/* Left Column: How it Works + Analogy */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* How ISR Works */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <h3 className="text-3xl font-bold mb-4 text-purple-700">
              ⚡ How ISR Works
            </h3>
            <ul className="list-decimal list-inside space-y-3 text-lg leading-relaxed">
              <li>
                First request → HTML generated on server and cached
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Initial build is server-side rendered</li>
                  <li>HTML stored for future visitors</li>
                </ul>
              </li>
              <li>
                Cached HTML served for next 10 seconds
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Ultra-fast delivery</li>
                  <li>No recomputation during this period</li>
                </ul>
              </li>
              <li>
                After cache expires → first visitor triggers background
                regeneration
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>New HTML built in background</li>
                  <li>Replaces old cached HTML</li>
                </ul>
              </li>
              <li>
                Fresh HTML served until next expiration
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Static speed + automatic freshness</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Restaurant Analogy */}
          <div className="border rounded-2xl p-6 bg-yellow-50">
            <h3 className="text-3xl font-bold mb-2 text-yellow-700">
              🍽 Restaurant Analogy
            </h3>
            <ul className="text-lg space-y-2 list-inside">
              <li>
                🧑‍🍳 Chef prepares dish for first customer (server renders HTML)
                <ul className="ml-6 list-disc">
                  <li>Stored on shelf (cache)</li>
                </ul>
              </li>
              <li>🥡 Next customers within 10s get same dish instantly</li>
              <li>
                ⏳ After 10s, first visitor triggers chef to prepare fresh dish
                <ul className="ml-6 list-disc">
                  <li>Fresh dish replaces old dish in shelf</li>
                </ul>
              </li>
              <li>
                🏃‍♂️ Subsequent customers get new dish until next expiration
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Joke + Generated Time + Test */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* Joke */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <p className="text-lg text-gray-600 mb-2">😄 Your Cached Joke:</p>
            <p className="text-2xl font-semibold mb-2">{joke.setup}</p>
            <p className="text-3xl font-bold text-purple-700">
              {joke.punchline}
            </p>
          </div>

          {/* Generated At */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <p className="text-xl text-gray-600 mb-1">🕐 Generated At:</p>
            <p className="text-2xl font-mono">{generatedAt}</p>
            <p className="text-sm text-gray-500 mt-2">
              This joke is served from cache for 10 seconds
            </p>
          </div>

          {/* Test Instructions */}
          <div className="border rounded-2xl p-6 bg-cyan-50">
            <h3 className="text-3xl font-bold text-cyan-700 mb-2">
              🧪 Test ISR
            </h3>
            <ul className="list-disc list-inside text-lg space-y-1">
              <li>
                <strong>Step 1:</strong> Refresh rapidly (within 10s) → same
                joke
              </li>
              <li>
                <strong>Step 2:</strong> Wait 10+ seconds and refresh → NEW joke
              </li>
              <li className="text-sm text-cyan-600 mt-1">
                ISR = Static speed + automatic freshness 🚀
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-width "Use When" */}
      <div className="mt-10 border rounded-2xl p-8 bg-green-50 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 text-green-700">
          ✅ Use ISR When
        </h3>
        <ul className="list-disc list-inside text-xl space-y-2 leading-relaxed">
          <li>Content updates periodically</li>
          <li>Need both speed AND freshness</li>
          <li>E-commerce, news, dashboards</li>
          <li>Can tolerate slight staleness</li>
        </ul>
      </div>
    </div>
  );
}
