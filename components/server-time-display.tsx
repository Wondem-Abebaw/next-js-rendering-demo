import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeData {
  datetime: string;
  timezone: string;
}

async function getServerTime() {
  const response = await fetch(
    "https://worldtimeapi.org/api/timezone/Etc/UTC",
    {
      cache: "no-store",
    }
  );
  const data: TimeData = await response.json();
  return data;
}

export default async function ServerTimeDisplay() {
  const data = await getServerTime();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600 dark:text-blue-400">
          Server Component
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
            Rendered:
          </p>
          <p className="text-xs text-blue-800 dark:text-blue-200">
            On server before sending HTML
          </p>
        </div>

        <div className="space-y-3">
          <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              API Time (UTC)
            </p>
            <p className="text-xl font-mono font-bold text-slate-900 dark:text-slate-50">
              {new Date(data.datetime).toISOString().split("T")[1].slice(0, 8)}
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

        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            ✓ Data fetched on server
            <br />✓ HTML sent to browser pre-rendered
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
