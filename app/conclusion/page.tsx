import Link from "next/link";

export default function ConclusionPage() {
  return (
    <div className="min-h-screen p-10 bg-white text-black">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-slate-900">
            Next.js Rendering Techniques
          </h1>
          <p className="text-2xl text-gray-700">Key Takeaways & Summary</p>
        </div>

        {/* Summary */}
        <div className="border rounded-2xl p-8 bg-gray-50 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">📌 Summary</h2>
          <ul className="list-disc list-inside text-xl space-y-3">
            <li>
              <strong>CSR:</strong> Fully rendered in browser, great for dynamic
              interactions, not SEO-friendly.
            </li>
            <li>
              <strong>SSR:</strong> Rendered on each server request, always
              fresh, great for SEO and personalized content.
            </li>
            <li>
              <strong>SSG:</strong> Pre-rendered at build time, ultra-fast
              delivery, content frozen until rebuild.
            </li>
            <li>
              <strong>ISR:</strong> Hybrid approach – static speed with periodic
              updates, good for frequently updated pages.
            </li>
          </ul>
        </div>

        {/* Restaurant Analogy */}
        <div className="border rounded-2xl p-8 bg-yellow-50">
          <h2 className="text-3xl font-bold text-yellow-700 mb-4">
            🍽 Restaurant Analogy
          </h2>
          <ul className="text-xl space-y-3 list-disc ml-6">
            <li>
              CSR → Chef gives raw ingredients, customer cooks the meal
              themselves.
            </li>
            <li>SSR → Chef cooks fresh meal for each customer order.</li>
            <li>
              SSG → Chef prepares all meals ahead of time, stored in fridge,
              served instantly.
            </li>
            <li>
              ISR → Chef prepares ahead, but refreshes dishes periodically as
              new orders come in.
            </li>
          </ul>
        </div>

        {/* Navigation Back */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="text-blue-700 text-xl font-bold hover:underline"
          >
            ← Back to Introduction
          </Link>
        </div>
      </div>
    </div>
  );
}
