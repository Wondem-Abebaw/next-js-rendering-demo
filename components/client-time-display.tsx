"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeData {
  datetime: string
  timezone: string
}

export default function ClientTimeDisplay() {
  const [timeData, setTimeData] = useState<TimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [clientTime, setClientTime] = useState(new Date().toLocaleTimeString())
  const [secondsSinceFetch, setSecondsSinceFetch] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
        const data: TimeData = await response.json()
        setTimeData(data)
        setSecondsSinceFetch(0)
      } catch (error) {
        console.error("Failed to fetch:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setClientTime(new Date().toLocaleTimeString())
      setSecondsSinceFetch((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Client Component</CardTitle>
        <CardDescription>Fetches data in useEffect after mount</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">How it works:</p>
          <ul className="text-xs text-purple-800 dark:text-purple-200 mt-2 space-y-1">
            <li>1. Component renders on browser</li>
            <li>2. useEffect runs and fetches API</li>
            <li>3. State updates with new data</li>
          </ul>
        </div>

        {loading ? (
          <div className="border rounded-lg p-4 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">Fetching data...</p>
          </div>
        ) : timeData ? (
          <>
            <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">API Time</p>
              <p className="text-xl font-mono font-bold text-slate-900 dark:text-slate-50">
                {new Date(timeData.datetime).toLocaleTimeString()}
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Current Client Time</p>
              <p className="text-xl font-mono font-bold text-slate-900 dark:text-slate-50">{clientTime}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Updates every second</p>
            </div>

            <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Seconds Since Fetch</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-50">{secondsSinceFetch}s</p>
            </div>
          </>
        ) : (
          <div className="border rounded-lg p-4 text-center">
            <p className="text-red-500 text-sm">Failed to load</p>
          </div>
        )}

        <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded border border-orange-200 dark:border-orange-800">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Advantages:</p>
          <ul className="text-xs text-orange-800 dark:text-orange-200 mt-2 space-y-1">
            <li>• Real-time updates possible</li>
            <li>• Can use browser APIs</li>
            <li>• Interactive user actions</li>
            <li>• Per-user personalization</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
