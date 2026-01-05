import { motion } from "motion/react";
import { Lightbulb, X } from "lucide-react";
import { useState } from "react";

export function InteractionTips() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 max-w-md bg-card border border-primary/30 rounded-xl shadow-2xl overflow-hidden z-30"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground">Interactive Prototype</h4>
              <p className="text-xs text-muted-foreground">Try these features</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 hover:bg-secondary rounded-lg transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
            <p className="text-muted-foreground">
              <span className="text-foreground">Hover over alert cards</span> to see them lift
              with a glow effect
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
            <p className="text-muted-foreground">
              <span className="text-foreground">Click map markers</span> to view detailed alert
              information
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
            <p className="text-muted-foreground">
              <span className="text-foreground">Support reports</span> to watch the confidence
              level progress
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
            <p className="text-muted-foreground">
              <span className="text-foreground">Switch views</span> to explore WhatsApp interface
              and Operator Console
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary/10 px-5 py-3 border-t border-primary/20">
        <p className="text-xs text-muted-foreground">
          💡 This is a high-fidelity prototype built with React, Motion, and Tailwind CSS
        </p>
      </div>
    </motion.div>
  );
}
