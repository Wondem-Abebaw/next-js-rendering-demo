import Link from "next/link";

interface BitcoinData {
  bpi: {
    USD: {
      rate: string;
    };
  };
  time: {
    updated: string;
  };
}

async function getBitcoinPrice() {
  // const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json", {
  //   cache: "no-store", // Force SSR - no caching
  // });
  // const data: BitcoinData = await res.json();
  // return data;
  const res = await fetch("https://api.agify.io/?name=michael");
  const data = await res.json();
  return data;
}

export default async function SSRPage() {
  const data = await getBitcoinPrice();
  // const currentTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 block">
          ← Back Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            SSR - Server-Side Rendering
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">How SSR Works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Fetches data on EVERY request</li>
              <li>✓ Server renders HTML with fresh data</li>
              <li>✓ Always up-to-date</li>
              <li>✓ Good for SEO</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Bitcoin Price (USD)</p>
              {/* <p className="text-3xl font-bold text-slate-900">
                $
                {parseFloat(
                  data.bpi.USD.rate.replace(",", "")
                ).toLocaleString()}
              </p> */}
              <p className="text-xs text-slate-500 mt-1">
                {/* Fetched at: {currentTime} */}
              </p>
            </div>

            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">API Last Updated</p>
              <p className="text-xl font-mono text-slate-900">
                {/* {data.time.updated} */}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-yellow-900">Notice:</p>
              <p className="text-sm text-yellow-800 mt-1">
                Refresh this page to see NEW data fetched from the server!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
