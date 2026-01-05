import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Clock, Users, Eye, Camera, CheckCircle2 } from "lucide-react";
import type { Alert } from "./AlertCard";

interface AlertDetailOverlayProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onSupport?: (id: string) => void;
}

export function AlertDetailOverlay({
  alert,
  isOpen,
  onClose,
  onSupport,
}: AlertDetailOverlayProps) {
  if (!alert) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Evidence Image */}
                {alert.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden bg-secondary aspect-video">
                    <img
                      src={alert.imageUrl}
                      alt={alert.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs text-white">Evidence Photo</span>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {alert.description}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-foreground mb-4">Verification Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-border my-1" />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-foreground">Initial Report</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Submitted via WhatsApp • {alert.timestamp}
                        </p>
                      </div>
                    </div>

                    {alert.confidence !== "low" && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          {alert.confidence === "high" && (
                            <div className="w-0.5 h-full bg-border my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-foreground">Community Supported</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.supporters} residents confirmed this issue
                          </p>
                        </div>
                      </div>
                    )}

                    {alert.confidence === "high" && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground">Verified</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Confirmed by multiple trusted sources
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-2xl text-foreground mb-1">{alert.supporters}</p>
                    <p className="text-xs text-muted-foreground">Supporters</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-2xl text-foreground mb-1">{alert.views}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-2xl text-foreground capitalize mb-1">{alert.confidence}</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              {onSupport && alert.confidence !== "high" && (
                <div className="p-6 border-t border-border">
                  <button
                    onClick={() => {
                      onSupport(alert.id);
                      onClose();
                    }}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    Support This Report
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
