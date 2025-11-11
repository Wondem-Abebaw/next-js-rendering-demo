"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const renderingMethods = [
  {
    title: "SSR - Server-Side Rendering",
    description: "Renders on every request. Always fresh data, but slower.",
    path: "/ssr",
    pros: ["Fresh data on each request", "Good for SEO", "Secure server logic"],
    cons: ["Slower response time", "Server load increases with traffic"],
  },
  {
    title: "SSG - Static Site Generation",
    description: "Built at build time. Fastest, but data is static.",
    path: "/ssg",
    pros: ["Extremely fast", "Reduced server load", "Perfect for static content"],
    cons: ["Data only updates at build time", "Requires rebuild for updates"],
  },
  {
    title: "ISR - Incremental Static Regeneration",
    description: "Static with periodic background revalidation.",
    path: "/isr",
    pros: ["Fast as SSG", "Data updates without rebuild", "Scalable"],
    cons: ["Stale data during revalidation interval", "Requires ISR-compatible hosting"],
  },
  {
    title: "CSR - Client-Side Rendering",
    description: "Renders in browser using JavaScript. Real-time updates.",
    path: "/csr",
    pros: ["Real-time data updates", "Interactive user experience", "Reduced server load"],
    cons: ["Slower initial page load", "Requires JavaScript", "Not SEO friendly"],
  },
  {
    title: "Edge Runtime",
    description: "Rendered at the edge closest to user. Ultra-fast.",
    path: "/edge",
    pros: ["Ultra-low latency", "Runs globally distributed", "Great for real-time"],
    cons: ["Limited compute resources", "Cannot use Node.js APIs"],
  },
  {
    title: "RSC vs Client Components",
    description: "Compare Server Components (fetch at render) vs Client Components.",
    path: "/rsc-vs-client",
    pros: ["See both patterns side-by-side", "Understand tradeoffs", "Educational"],
    cons: ["Demo only - not for production"],
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-50">Next.js Rendering Techniques</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Explore how different rendering strategies work with real API data. Each route demonstrates how data is
            fetched, cached, and updated differently.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renderingMethods.map((method) => (
            <Card key={method.path} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                  <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                    {method.pros.map((pro, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-600 dark:text-green-400">•</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                  <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                    {method.cons.map((con, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-red-600 dark:text-red-400">•</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={method.path} className="mt-auto">
                  <Button className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
