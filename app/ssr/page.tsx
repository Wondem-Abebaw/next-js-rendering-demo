import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TimeData {
  datetime: string
  utc_offset: string
  day_of_week: number
  timezone: string
}

async function getServerData() {
  const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", {
    cache: "no-store", // Force fresh data on each request
  })
  const data: TimeData = await response.json()
  return data
}

export default async function SSRPage() {
  const timeData = await getServerData()

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
            <CardTitle>SSR - Server-Side Rendering</CardTitle>
            <CardDescription>Renders on the server for every request. Data is always fresh but slower.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How SSR Works:</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• User requests page → Server fetches data from API</li>
                <li>• Server renders complete HTML with data</li>
                <li>• HTML sent to browser fully rendered</li>
                <li>• This happens on EVERY request (no caching)</li>
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
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  This data comes directly from the API on every request
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Use SSR When:</h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• You need fresh data on every request</li>
                <li>• You require server-side security checks</li>
                <li>• Data changes frequently and needs always up-to-date</li>
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
