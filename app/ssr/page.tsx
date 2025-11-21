import Link from "next/link";

interface JokeData {
  setup: string;
  punchline: string;
  type: string;
  id: number;
}

async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke", {
    cache: "no-store", // SSR: always fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch joke");
  return res.json();
}

export default async function SSRPage() {
  const joke = await getJoke();
  const serverTime = new Date().toISOString();

  return (
    <div className="min-h-screen p-8 bg-white text-black flex flex-col">
      <Link href="/" className="text-blue-700 text-xl hover:underline mb-4">
        ← Back Home
      </Link>

      {/* Header */}
      <div className="space-y-2 flex justify-center items-center flex-col mb-6">
        <h1 className="text-5xl font-extrabold">SSR</h1>
        <p className="text-2xl text-gray-700">Server-Side Rendering</p>
      </div>

      {/* Main content: two columns */}
      <div className="flex flex-wrap gap-6">
        {/* Left Column: How it Works + Analogy */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* How SSR Works */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <h3 className="text-3xl font-bold mb-4 text-blue-700">
              ⚡ How SSR Works
            </h3>
            <ul className="list-decimal list-inside space-y-3 text-lg leading-relaxed">
              <li>
                Browser requests the page.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Client sends GET request to server</li>
                  <li>No HTML exists yet</li>
                </ul>
              </li>
              <li>
                Next.js server runs page code.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Can fetch DB/API securely</li>
                  <li>Runs before HTML exists</li>
                </ul>
              </li>
              <li>
                Server generates full HTML containing the data.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>HTML already includes joke text</li>
                  <li>No loading spinners needed</li>
                </ul>
              </li>
              <li>
                Server sends complete HTML to browser.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>SEO friendly</li>
                </ul>
              </li>
              <li>
                Browser displays HTML immediately.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>User sees joke instantly</li>
                </ul>
              </li>
              <li>
                Browser downloads JS bundle in background.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Needed for interactivity</li>
                </ul>
              </li>
              <li>
                React "hydrates" the server-rendered HTML.
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Attaches click handlers</li>
                  <li>Makes page interactive</li>
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
              SSR is like a restaurant where the chef prepares a{" "}
              <strong>fully cooked meal</strong>
              in the kitchen (server). When it reaches the customer (browser),
              the dish is complete — ready to eat. Browser just receives the
              final plate and enjoys it immediately.
            </p>
          </div>
        </div>

        {/* Right Column: Joke + Server Time + Test Note */}
        <div className="flex-1 min-w-[320px] space-y-6">
          {/* Joke */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <p className="text-lg text-gray-500 mb-2">
              😄 Joke Rendered on Server
            </p>
            <p className="text-2xl font-semibold mb-2">{joke.setup}</p>
            <p className="text-3xl font-bold text-blue-700">{joke.punchline}</p>
          </div>

          {/* Server Time */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <p className="text-xl text-gray-600 mb-1">⏰ Rendered at:</p>
            <p className="text-2xl font-mono">{serverTime}</p>
          </div>

          {/* Test Note */}
          <div className="border rounded-2xl p-6 bg-orange-50">
            <h3 className="text-3xl font-bold text-orange-700 mb-2">
              🧪 Test It
            </h3>
            <p className="text-lg">
              <strong>Refresh the page</strong> to get a brand-new joke.
              <br />
              Every refresh → new server fetch → new HTML generated.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width "Use When" */}
      <div className="mt-10 border rounded-2xl p-8 bg-green-50 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 text-green-700">
          ✅ Use SSR When
        </h3>
        <ul className="list-disc list-inside text-xl space-y-2 leading-relaxed">
          <li>Data changes frequently</li>
          <li>Need secure, server-only fetching</li>
          <li>Dynamic SEO-friendly pages</li>
          <li>Authentication required</li>
        </ul>
      </div>
    </div>
  );
}
