import { TrendingUp, MapPin, Bell, Search } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CivicPulse
          </h1>
        </div>
      </div>
      <div className="text-center max-w-4xl">
        <h2 className="text-4xl lg:text-6xl font-bold !leading-tight mb-6">
          Find local trends before they{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            break nationally
          </span>
        </h2>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Monitor municipal meetings, track policy trends, and discover emerging issues across Kansas counties before they become headlines.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>10+ Kansas Counties</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Real-time Document Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Custom Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Trend Visualization</span>
          </div>
        </div>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
