import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TimeData {
  datetime: string
  utc_offset: string
  day_of_week: number
  timezone: string
}

async function getStaticData() {
  const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
  const data: TimeData = await response.json()
  return data
}

export default async function SSGPage() {
  const timeData = await getStaticData()

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
            <CardTitle>SSG - Static Site Generation</CardTitle>
            <CardDescription>Generated at build time. Extremely fast but data is static until rebuild.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">How SSG Works:</h3>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Next.js runs build process (npm run build)</li>
                <li>• Server fetches API data at build time</li>
                <li>• HTML is pre-generated and cached</li>
                <li>• Same HTML served to all users (until next rebuild)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">API Time (UTC) - Frozen at Build Time</p>
                <p className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">
                  {new Date(timeData.datetime).toLocaleTimeString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  This time was captured when the page was built and doesn't change
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Timezone</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{timeData.timezone}</p>
              </div>

              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Raw UTC String</p>
                <p className="text-sm font-mono text-slate-900 dark:text-slate-50 break-all">{timeData.datetime}</p>
              </div>

              <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Notice:</p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  Refresh the page multiple times. The time should NOT change because this HTML was pre-built.
                </p>
              </div>
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
