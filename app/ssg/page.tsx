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
  return res.json();
}

export default async function SSGPage() {
  const joke = await getJoke();
  const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen p-8 bg-white text-black flex flex-col">
      <Link href="/" className="text-green-700 text-xl hover:underline mb-4">
        ← Back Home
      </Link>

      {/* Header */}
      <div className="space-y-2 flex justify-center items-center flex-col mb-6">
        <h1 className="text-5xl font-extrabold">SSG</h1>
        <p className="text-2xl text-gray-700">Static Site Generation</p>
      </div>

      {/* Main content: two columns */}
      <div className="flex flex-wrap gap-6">
        {/* Left Column: How it Works + Analogy */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* How SSG Works */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <h3 className="text-3xl font-bold mb-4 text-green-700">
              ⚡ How SSG Works
            </h3>
            <ul className="list-decimal list-inside space-y-3 text-lg leading-relaxed">
              <li>
                Joke fetched once <strong>at build time</strong>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Next.js runs this page before deployment</li>
                  <li>
                    API request happens during <code>npm run build</code>
                  </li>
                </ul>
              </li>
              <li>
                HTML pre-generated and cached
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>No server computation on requests</li>
                  <li>Browser receives ready-to-show HTML</li>
                </ul>
              </li>
              <li>
                Served instantly via CDN
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Zero delay for user</li>
                  <li>Extremely fast load</li>
                </ul>
              </li>
              <li>
                Content frozen until rebuild
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Everyone sees the same joke</li>
                  <li>New joke only after redeploy/rebuild</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Restaurant Analogy */}
          <div className="border rounded-2xl p-6 bg-yellow-50">
            <h3 className="text-3xl font-bold mb-2 text-yellow-700">
              🍽 Restaurant Analogy
            </h3>
            <p className="text-lg leading-relaxed">
              🧑‍🍳 Chef prepares the dish early, before customers arrive.
              <br />
              🥡 Dish is stored in fridge (CDN) ready to serve.
              <br />
              🏃‍♂️ Customer gets fully cooked meal immediately, no waiting.
              <br />
              ❄️ Everyone gets the same dish until chef cooks a new one (rebuild
              required).
            </p>
          </div>
        </div>

        {/* Right Column: Joke + Build Time + Notice */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* Joke */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <p className="text-lg text-gray-500 mb-2">😄 Your "Frozen" Joke:</p>
            <p className="text-2xl font-semibold mb-2">{joke.setup}</p>
            <p className="text-3xl font-bold text-green-700">
              {joke.punchline}
            </p>
          </div>

          {/* Build Time */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <p className="text-xl text-gray-600 mb-1">🏗️ Built At:</p>
            <p className="text-2xl font-mono">{buildTime}</p>
            <p className="text-sm text-gray-500 mt-2">
              This timestamp was set when the page was built
            </p>
          </div>

          {/* Notice */}
          <div className="border rounded-2xl p-6 bg-orange-50">
            <h3 className="text-3xl font-bold text-orange-700 mb-2">
              ⚠️ Notice
            </h3>
            <p className="text-lg">
              <strong>Refresh this page multiple times</strong> — joke does NOT
              change!
              <br />
              Page was generated once at build time.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width "Use When" */}
      <div className="mt-10 border rounded-2xl p-8 bg-green-50 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 text-green-700">
          ✅ Use SSG When
        </h3>
        <ul className="list-disc list-inside text-xl space-y-2 leading-relaxed">
          <li>Content rarely changes</li>
          <li>Speed is critical</li>
          <li>Blogs, documentation, marketing pages</li>
          <li>Rebuild on content update</li>
        </ul>
      </div>
    </div>
  );
}
