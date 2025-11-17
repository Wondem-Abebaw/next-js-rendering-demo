import Link from "next/link";

export const revalidate = 10; // Revalidate every 10 seconds

interface NameData {
  name: string;
  age: number;
}

async function getNameData() {
  const res = await fetch("https://api.agify.io/?name=michael");
  const data: NameData = await res.json();
  return data;
}

export default async function ISRPage() {
  const data = await getNameData();
  // const fetchedAt = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-800 mb-6 block"
        >
          ← Back Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            ISR - Incremental Static Regeneration
          </h2>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">
              How ISR Works:
            </h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>✓ Serves cached version (fast)</li>
              <li>✓ Revalidates every 10 seconds</li>
              <li>✓ Background regeneration</li>
              <li>✓ Best of SSG + SSR</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Name</p>
              <p className="text-3xl font-bold text-slate-900">{data.name}</p>
            </div>

            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Predicted Age</p>
              <p className="text-3xl font-bold text-slate-900">
                {data.age} years
              </p>
            </div>

            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Last Generated</p>
              {/* <p className="text-lg font-mono text-slate-900">{fetchedAt}</p> */}
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-cyan-900">Test ISR:</p>
              <p className="text-sm text-cyan-800 mt-1">
                Refresh quickly (within 10s) - same data. Wait 10+ seconds and
                refresh - new data!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
