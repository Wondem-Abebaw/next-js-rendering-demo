import Link from "next/link";

export const runtime = "edge";

interface IPData {
  ip: string;
}

async function getIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data: IPData = await res.json();
  return data;
}

export default async function EdgePage() {
  const ipData = await getIP();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-yellow-600 hover:text-yellow-800 mb-6 block"
        >
          ← Back Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Edge Runtime
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">
              How Edge Works:
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✓ Runs on global edge network</li>
              <li>✓ Ultra-low latency (&lt; 100ms)</li>
              <li>✓ No cold starts</li>
              <li>✓ Limited Node.js APIs</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Your IP Address</p>
              <p className="text-3xl font-mono font-bold text-slate-900">
                {ipData.ip}
              </p>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-violet-900 mb-1">
                Use Edge When:
              </p>
              <ul className="text-sm text-violet-800 space-y-1 mt-2">
                <li>• Need global low latency</li>
                <li>• Personalization at scale</li>
                <li>• A/B testing</li>
                <li>• Authentication checks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
