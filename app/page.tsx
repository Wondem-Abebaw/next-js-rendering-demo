import Link from "next/link";

export default function HomePage() {
  const methods = [
    {
      id: "ssr",
      title: "SSR - Server-Side Rendering",
      description: "Renders on every request. Always fresh data.",
      color: "bg-blue-500",
    },
    {
      id: "ssg",
      title: "SSG - Static Generation",
      description: "Built at build time. Fastest performance.",
      color: "bg-green-500",
    },
    {
      id: "isr",
      title: "ISR - Incremental Regeneration",
      description: "Static with periodic updates.",
      color: "bg-purple-500",
    },
    {
      id: "csr",
      title: "CSR - Client-Side Rendering",
      description: "Renders in browser. Real-time updates.",
      color: "bg-orange-500",
    },
    {
      id: "edge",
      title: "Edge Runtime",
      description: "Renders at edge. Ultra-fast globally.",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Next.js Rendering Techniques
          </h1>
          <p className="text-lg text-slate-600">
            Click any card to explore different rendering strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method) => (
            <Link key={method.id} href={`/${method.id}`}>
              <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div
                  className={`${method.color} w-12 h-12 rounded-lg mb-4`}
                ></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-slate-600 text-sm">{method.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
