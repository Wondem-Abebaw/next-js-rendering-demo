import Link from "next/link";

interface JokeData {
  setup: string;
  punchline: string;
  type: string;
}

async function getJoke() {
  // const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  // const data: JokeData = await res.json();
  // return data;
  const res = await fetch("https://api.agify.io/?name=michael");
  const data = await res.json();
  return data;
}

export default async function SSGPage() {
  const joke = await getJoke();
  // const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-green-600 hover:text-green-800 mb-6 block"
        >
          ← Back Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            SSG - Static Site Generation
          </h2>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">
              How SSG Works:
            </h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Built at BUILD TIME</li>
              <li>✓ Pre-rendered HTML</li>
              <li>✓ Extremely fast</li>
              <li>✓ Data is static until rebuild</li>
            </ul>
          </div>

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
              <p className="text-sm text-slate-600 mb-1">Built At</p>
              {/* <p className="text-lg font-mono text-slate-900">{buildTime}</p> */}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-amber-900">Notice:</p>
              <p className="text-sm text-amber-800 mt-1">
                Refresh this page - the joke NEVER changes! It was fetched at
                build time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
