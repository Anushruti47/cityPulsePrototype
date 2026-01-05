import { Activity, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface CityPulseProps {
  cityName: string;
  status: "calm" | "moderate" | "alert";
  message: string;
  stats: {
    activeAlerts: number;
    resolved: number;
    monitoring: number;
  };
}

export function CityPulse({ cityName, status, message, stats }: CityPulseProps) {
  const statusConfig = {
    calm: {
      icon: CheckCircle2,
      color: "text-[#10B981]",
      bg: "bg-[#10B981]/10",
      ringColor: "ring-[#10B981]/20",
    },
    moderate: {
      icon: Activity,
      color: "text-[#F59E0B]",
      bg: "bg-[#F59E0B]/10",
      ringColor: "ring-[#F59E0B]/20",
    },
    alert: {
      icon: AlertTriangle,
      color: "text-[#EF4444]",
      bg: "bg-[#EF4444]/10",
      ringColor: "ring-[#EF4444]/20",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="relative bg-card backdrop-blur-lg border border-border rounded-2xl p-8 mb-8 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className={`${config.bg} ${config.color} p-3 rounded-xl ring-4 ${config.ringColor}`}
              animate={
                status === "alert"
                  ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              <StatusIcon className="w-6 h-6" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">City Pulse</p>
              <h2 className="text-foreground capitalize">{cityName}</h2>
            </div>
          </div>

          <p className="text-lg text-foreground mb-6">{message}</p>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#EF4444]/10 rounded-lg p-4">
              <p className="text-2xl text-[#EF4444] mb-1">{stats.activeAlerts}</p>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </div>
            <div className="bg-[#10B981]/10 rounded-lg p-4">
              <p className="text-2xl text-[#10B981] mb-1">{stats.resolved}</p>
              <p className="text-sm text-muted-foreground">Resolved Today</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-2xl text-primary">{stats.monitoring}</p>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-primary">Live</span>
        </div>
      </div>
    </div>
  );
}
