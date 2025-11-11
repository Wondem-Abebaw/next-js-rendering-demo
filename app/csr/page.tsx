"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TimeData {
  datetime: string
  utc_offset: string
  timezone: string
}

export default function CSRPage() {
  const [timeData, setTimeData] = useState<TimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)
  const [clientTime, setClientTime] = useState("")
  const [secondsSinceRender, setSecondsSinceRender] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setClientTime(new Date().toLocaleTimeString())
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
        const data: TimeData = await response.json()
        setTimeData(data)
        setSecondsSinceRender(0)
      } catch (error) {
        console.error("Failed to fetch time:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshCount])

  // Update client time and seconds counter
  useEffect(() => {
    const interval = setInterval(() => {
      setClientTime(new Date().toLocaleTimeString())
      setSecondsSinceRender((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1)
  }

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
            <CardTitle>CSR - Client-Side Rendering</CardTitle>
            <CardDescription>Renders in the browser. Real-time updates but slower initial load.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-rose-50 dark:bg-rose-950 p-4 rounded-lg border border-rose-200 dark:border-rose-800">
              <h3 className="font-semibold text-rose-900 dark:text-rose-100 mb-2">How CSR Works:</h3>
              <ul className="text-sm text-rose-800 dark:text-rose-200 space-y-1">
                <li>• Browser downloads minimal HTML</li>
                <li>• JavaScript runs in browser and fetches API</li>
                <li>• React renders content on the client</li>
                <li>• User sees loading state while JavaScript works</li>
              </ul>
            </div>

            {loading ? (
              <div className="border rounded-lg p-8 text-center">
                <p className="text-slate-500 dark:text-slate-400">Loading data...</p>
              </div>
            ) : timeData ? (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">API Time (UTC)</p>
                  <p className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">
                    {new Date(timeData.datetime).toLocaleTimeString()}
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Current Client Time</p>
                  <p className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">
                    {isMounted ? clientTime : "—"}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Updates every second in browser</p>
                </div>

                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Timezone</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{timeData.timezone}</p>
                </div>

                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Seconds Since Data Fetch</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{secondsSinceRender}s</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Shows freshness of data</p>
                </div>

                <div className="border rounded-lg p-4 bg-lime-50 dark:bg-lime-950">
                  <p className="text-sm font-semibold text-lime-900 dark:text-lime-100">Notice:</p>
                  <p className="text-sm text-lime-800 dark:text-lime-200 mt-1">
                    The client time updates every second. This page renders entirely in your browser!
                  </p>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg p-8 text-center">
                <p className="text-red-500">Failed to load data</p>
              </div>
            )}

            <Button onClick={handleRefresh} className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Refresh Data"}
            </Button>

            <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
              <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Use CSR When:</h3>
              <ul className="text-sm text-pink-800 dark:text-pink-200 space-y-1">
                <li>• Need real-time interactive updates</li>
                <li>• Content is user-specific (dashboards, apps)</li>
                <li>• SEO is not critical</li>
              </ul>
            </div>

            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Back Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
