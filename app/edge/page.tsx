import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const runtime = "edge"

interface TimeData {
  datetime: string
  utc_offset: string
  timezone: string
}

async function getEdgeData() {
  const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
  const data: TimeData = await response.json()
  return data
}

export default async function EdgePage() {
  const timeData = await getEdgeData()

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="container mx-auto max-w-2xl py-12">
        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Edge Runtime</CardTitle>
            <CardDescription>Rendered on edge servers globally. Ultra-fast with limitations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">How Edge Runtime Works:</h3>
              <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                <li>• Code runs on Vercel Edge Network (globally distributed)</li>
                <li>• Renders closest to user geographically</li>
                <li>• Ultra-low latency but limited Node.js APIs</li>
                <li>• Perfect for dynamic content served globally fast</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">API Time (UTC)</p>
                <p className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">
                  {new Date(timeData.datetime).toLocaleTimeString()}
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Timezone</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{timeData.timezone}</p>
              </div>

              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Raw UTC String</p>
                <p className="text-sm font-mono text-slate-900 dark:text-slate-50 break-all">{timeData.datetime}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Stable API data rendered consistently</p>
              </div>

              <div className="border rounded-lg p-4 bg-violet-50 dark:bg-violet-950">
                <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">Benefits:</p>
                <ul className="text-sm text-violet-800 dark:text-violet-200 mt-2 space-y-1">
                  <li>• Response times typically &lt; 100ms globally</li>
                  <li>• No cold starts like serverless functions</li>
                  <li>• Ideal for real-time personalized content</li>
                </ul>
              </div>
            </div>

            <div className="bg-fuchsia-50 dark:bg-fuchsia-950 p-4 rounded-lg border border-fuchsia-200 dark:border-fuchsia-800">
              <h3 className="font-semibold text-fuchsia-900 dark:text-fuchsia-100 mb-2">Use Edge When:</h3>
              <ul className="text-sm text-fuchsia-800 dark:text-fuchsia-200 space-y-1">
                <li>• Need ultra-low latency globally</li>
                <li>• Serving real-time dynamic content</li>
                <li>• Don't need Node.js-specific APIs</li>
              </ul>
            </div>

            <Link href="/">
              <Button className="w-full">Back Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
