import Link from "next/link";

export default function HomePage() {
  const methods = [
    {
      id: "csr",
      title: "CSR - Client-Side Rendering",
      description: "Renders in browser. Real-time updates.",
      color: "bg-orange-500",
    },
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-slate-900">
            Next.js Rendering Techniques
          </h1>
          <p className="text-2xl text-gray-700">
            Explore how different rendering strategies work in Next.js
          </p>
        </div>

        {/* Rendering Explanation */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            ⭐ What is Rendering?
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed">
            Rendering is the process of turning React components into a user
            interface (UI). It can happen on the server, at build time, or in
            the browser depending on the technique.
          </p>
        </div>

        {/* Cards for Each Method */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {methods.map((method) => (
            <Link key={method.id} href={`/${method.id}`}>
              <div className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 space-y-4">
                <div
                  className={`${method.color} w-16 h-16 rounded-lg mb-2`}
                ></div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {method.title}
                </h3>
                <p className="text-lg text-slate-700">{method.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Navigate to Conclusion */}
      <div className="text-center mt-10">
        <Link
          href="/conclusion"
          className="text-blue-700 text-xl font-bold hover:underline"
        >
          → Conclusion
        </Link>
      </div>
    </div>
  );
}
