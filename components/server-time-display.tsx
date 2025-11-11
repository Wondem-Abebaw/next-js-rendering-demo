import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeData {
  datetime: string
  timezone: string
  utc_offset: string
}

async function getServerTime() {
  const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
  const data: TimeData = await response.json()
  return data
}

export default async function ServerTimeDisplay() {
  const timeData = await getServerTime()
  const renderedAt = new Date().toLocaleTimeString()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Server Component (RSC)</CardTitle>
        <CardDescription>Fetches data on server, renders complete HTML</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 dark:bg-green-950 p-3 rounded border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold">How it works:</p>
          <ul className="text-xs text-green-800 dark:text-green-200 mt-2 space-y-1">
            <li>1. Server fetches API data</li>
            <li>2. Next.js renders complete HTML</li>
            <li>3. Browser receives fully rendered page</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">API Time</p>
          <p className="text-xl font-mono font-bold text-slate-900 dark:text-slate-50">
            {new Date(timeData.datetime).toLocaleTimeString()}
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Timezone</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{timeData.timezone}</p>
        </div>

        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Rendered at</p>
          <p className="text-sm font-mono text-slate-900 dark:text-slate-50">{renderedAt}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Data is static - same for all visitors</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Advantages:</p>
          <ul className="text-xs text-blue-800 dark:text-blue-200 mt-2 space-y-1">
            <li>• Secure (no API keys exposed)</li>
            <li>• Better SEO (full HTML)</li>
            <li>• Fast initial load</li>
            <li>• Smaller JS bundle</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
