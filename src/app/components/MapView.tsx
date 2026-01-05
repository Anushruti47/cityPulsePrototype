import { motion } from "motion/react";
import { Zap, Droplet, Car, MapPin } from "lucide-react";
import type { Alert, DisruptionType } from "./AlertCard";

interface MapMarker {
  id: string;
  type: DisruptionType;
  lat: number;
  lng: number;
  alert: Alert;
}

interface MapViewProps {
  markers: MapMarker[];
  onMarkerClick: (alert: Alert) => void;
  cityMapUrl?: string;
}

const typeIcons: Record<DisruptionType, typeof Zap> = {
  power: Zap,
  water: Droplet,
  traffic: Car,
};

const typeColors: Record<DisruptionType, string> = {
  power: "#F59E0B",
  water: "#3B82F6",
  traffic: "#EF4444",
};

export function MapView({ markers, onMarkerClick, cityMapUrl }: MapViewProps) {
  return (
    <div className="relative w-full h-[600px] bg-card rounded-2xl border border-border overflow-hidden">
      {/* Map Background - Dark themed map style */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: cityMapUrl
            ? `url(${cityMapUrl})`
            : "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          filter: "grayscale(20%) brightness(0.7) contrast(1.2)",
        }}
      >
        {/* Grid overlay for map effect */}
        {!cityMapUrl && (
          <div
            className="w-full h-full opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-md border border-border rounded-lg p-2">
        <div className="flex flex-col gap-2">
          <button className="p-2 hover:bg-primary/10 rounded transition-colors">
            <MapPin className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 bg-card/90 backdrop-blur-md border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">Alert Types</p>
        <div className="space-y-2">
          {Object.entries(typeIcons).map(([type, Icon]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: typeColors[type as DisruptionType] }}
              />
              <span className="text-xs text-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Markers */}
      {markers.map((marker, index) => {
        const Icon = typeIcons[marker.type];
        const color = typeColors[marker.type];

        return (
          <motion.div
            key={marker.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="absolute cursor-pointer z-20"
            style={{
              left: `${marker.lng}%`,
              top: `${marker.lat}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => onMarkerClick(marker.alert)}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative"
            >
              {/* Ping animation */}
              {marker.alert.priority === "high" && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ scale: [1, 2, 2], opacity: [0.6, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Marker */}
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border-2"
                style={{
                  backgroundColor: `${color}20`,
                  borderColor: color,
                }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* City Label */}
      <div className="absolute bottom-4 left-4 z-10 bg-card/90 backdrop-blur-md border border-border rounded-lg px-4 py-2">
        <p className="text-sm text-foreground">Ranchi, Jharkhand</p>
      </div>
    </div>
  );
}
