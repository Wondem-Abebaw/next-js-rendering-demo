import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ClientTimeDisplay from "@/components/client-time-display"
import ServerTimeDisplay from "@/components/server-time-display"

export default async function RSCVsClientPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl py-12">
        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back Home
          </Button>
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>RSC vs Client Components</CardTitle>
            <CardDescription>
              Compare Server Components (fetch at render) vs Client Components (fetch in useEffect).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Key Difference:</h3>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <li>
                  <strong>Server Component:</strong> Fetches data server-side, sends full HTML to browser
                </li>
                <li>
                  <strong>Client Component:</strong> Fetches data in useEffect after component mounts
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Server Component */}
          <ServerTimeDisplay />

          {/* Client Component */}
          <ClientTimeDisplay />
        </div>

        <div className="mt-6">
          <Link href="/">
            <Button className="w-full">Back Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
