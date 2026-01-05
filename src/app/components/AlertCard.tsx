import { Zap, Droplet, Car, Clock, MapPin, Eye, Users, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export type ConfidenceLevel = "low" | "medium" | "high";
export type DisruptionType = "power" | "water" | "traffic";

export interface Alert {
  id: string;
  type: DisruptionType;
  title: string;
  location: string;
  description: string;
  confidence: ConfidenceLevel;
  timestamp: string;
  supporters: number;
  views: number;
  imageUrl?: string;
  priority?: "normal" | "high";
}

interface AlertCardProps {
  alert: Alert;
  onSupport?: (id: string) => void;
  onClick?: (alert: Alert) => void;
}

const typeIcons: Record<DisruptionType, typeof Zap> = {
  power: Zap,
  water: Droplet,
  traffic: Car,
};

const typeColors: Record<DisruptionType, string> = {
  power: "text-[#F59E0B]",
  water: "text-[#3B82F6]",
  traffic: "text-[#EF4444]",
};

const typeBgColors: Record<DisruptionType, string> = {
  power: "bg-[#F59E0B]/10",
  water: "bg-[#3B82F6]/10",
  traffic: "bg-[#EF4444]/10",
};

const confidenceSteps = [
  { level: "low", label: "Reported", threshold: 0 },
  { level: "medium", label: "Community Supported", threshold: 33 },
  { level: "high", label: "Verified", threshold: 66 },
];

export function AlertCard({ alert, onSupport, onClick }: AlertCardProps) {
  const Icon = typeIcons[alert.type];
  const iconColor = typeColors[alert.type];
  const bgColor = typeBgColors[alert.type];

  const getConfidencePercentage = () => {
    if (alert.confidence === "low") return 15;
    if (alert.confidence === "medium") return 50;
    return 100;
  };

  const percentage = getConfidencePercentage();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-card backdrop-blur-lg border border-border rounded-xl p-5 cursor-pointer overflow-hidden group ${
        alert.priority === "high" ? "ring-2 ring-primary/50" : ""
      }`}
      onClick={() => onClick?.(alert)}
    >
      {alert.priority === "high" && (
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="flex items-start gap-4">
        <div className={`${bgColor} ${iconColor} p-3 rounded-lg flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-foreground mb-1">{alert.title}</h3>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{alert.location}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{alert.description}</p>

          {/* Confidence Timeline */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              {confidenceSteps.map((step, index) => (
                <div key={step.level} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all ${
                      percentage >= step.threshold
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {percentage >= (confidenceSteps[index + 1]?.threshold || 100) ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground text-center">{step.label}</span>
                </div>
              ))}
            </div>
            <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{alert.supporters} supporters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{alert.views} views</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
          </div>

          {onSupport && alert.confidence !== "high" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onSupport(alert.id);
              }}
              className="mt-4 w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
            >
              Support This Report
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
