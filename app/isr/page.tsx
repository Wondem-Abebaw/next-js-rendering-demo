import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TimeData {
  datetime: string
  utc_offset: string
  day_of_week: number
  timezone: string
}

async function getISRData() {
  const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
  const data: TimeData = await response.json()
  return data
}

export const revalidate = 10 // Revalidate every 10 seconds

export default async function ISRPage() {
  const timeData = await getISRData()
  const generatedAt = new Date().toLocaleTimeString()

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
            <CardTitle>ISR - Incremental Static Regeneration</CardTitle>
            <CardDescription>Static pages that update periodically without full rebuild.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">How ISR Works:</h3>
              <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
                <li>• Page is generated at build time (like SSG)</li>
                <li>• Served from cache to all users (fast)</li>
                <li>• In background, page regenerates periodically (every 10s here)</li>
                <li>• New users get fresh content after regeneration</li>
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
                <p className="text-sm text-slate-500 dark:text-slate-400">Generated at (Server Time)</p>
                <p className="text-lg font-mono text-slate-900 dark:text-slate-50">{generatedAt}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  This updates approximately every 10 seconds
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Timezone</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{timeData.timezone}</p>
              </div>

              <div className="border rounded-lg p-4 bg-cyan-50 dark:bg-cyan-950">
                <p className="text-sm font-semibold text-cyan-900 dark:text-cyan-100">Notice:</p>
                <p className="text-sm text-cyan-800 dark:text-cyan-200 mt-1">
                  Refresh the page rapidly. You'll see the same time for ~10 seconds, then it updates.
                </p>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Use ISR When:</h3>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                <li>• Need fast static pages with periodic updates</li>
                <li>• Data changes occasionally (not real-time)</li>
                <li>• Want SSG performance with fresher data than SSG</li>
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
