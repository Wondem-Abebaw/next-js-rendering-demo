"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeData {
  datetime: string;
  timezone: string;
}

export default function ClientTimeDisplay() {
  const [data, setData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/Etc/UTC"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch time:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchData();
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 dark:text-green-400">
            Client Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-400">
          Client Component
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm font-semibold text-green-900 dark:text-green-100">
            Rendered:
          </p>
          <p className="text-xs text-green-800 dark:text-green-200">
            In browser after mount
          </p>
        </div>

        {loading ? (
          <div className="border rounded-lg p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Fetching data...
            </p>
          </div>
        ) : data ? (
          <div className="space-y-3">
            <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                API Time (UTC)
              </p>
              <p className="text-xl font-mono font-bold text-slate-900 dark:text-slate-50">
                {new Date(data.datetime).toLocaleTimeString()}
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Timezone
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {data.timezone}
              </p>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-8 text-center">
            <p className="text-red-500">Failed to load data</p>
          </div>
        )}

        <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-800 dark:text-green-200">
            ✓ Data fetched after component mounted
            <br />✓ useEffect runs in browser only
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
