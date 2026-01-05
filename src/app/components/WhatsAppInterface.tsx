import { motion } from "motion/react";
import { Phone, MessageSquare, Clock, CheckCircle2, Camera, Mic } from "lucide-react";

export function WhatsAppInterface() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-foreground mb-2">WhatsApp-First Experience</h2>
        <p className="text-muted-foreground">
          No app needed. Report issues directly through WhatsApp.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* WhatsApp Chat Mockup */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          {/* Phone Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white">Nagar Alert Hub</h4>
              <p className="text-xs text-white/70">Online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-[#0a1f1c] p-4 space-y-4 min-h-[500px]">
            {/* User message with image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%]">
                <div className="bg-[#005C4B] text-white rounded-lg p-3 mb-2">
                  <div className="bg-[#003d33] rounded-lg p-2 mb-2">
                    <div className="flex items-center justify-center h-32 text-white/50">
                      <Camera className="w-8 h-8" />
                    </div>
                    <p className="text-xs text-white/70 mt-1">photo_pothole.jpg</p>
                  </div>
                  <p className="text-sm">
                    Big pothole on Circular Road near bus stand. Very dangerous!
                  </p>
                </div>
                <div className="flex items-center justify-end gap-1 px-2">
                  <Mic className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">0:15</span>
                  <CheckCircle2 className="w-3 h-3 text-[#00B0F0]" />
                  <span className="text-xs text-muted-foreground">10:23 AM</span>
                </div>
              </div>
            </motion.div>

            {/* Bot response */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%]">
                <div className="bg-[#1F2C34] text-white rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" />
                    <span className="text-xs text-[#F59E0B]">Processing...</span>
                  </div>
                  <p className="text-sm mb-3">
                    ✅ I've logged this issue near <strong>Circular Road</strong>.
                  </p>
                  <div className="bg-[#0F172A] rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
                      <span className="text-xs text-muted-foreground">
                        Confidence: <span className="text-[#F59E0B]">Low</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Waiting for community support
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-white/70 mt-3">
                    Your report will be verified as more people confirm it. Track it at
                    nagaralert.in
                  </p>
                </div>
                <span className="text-xs text-muted-foreground px-2">10:23 AM</span>
              </div>
            </motion.div>
          </div>

          {/* Input Area */}
          <div className="bg-[#1F2C34] p-3 flex items-center gap-2">
            <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2">
              <p className="text-sm text-white/50">Type a message...</p>
            </div>
            <button className="w-10 h-10 bg-[#00A884] rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground mb-2">Visual Evidence</h4>
            <p className="text-sm text-muted-foreground">
              Send photos or videos directly through WhatsApp. Our AI extracts location and
              categorizes the issue automatically.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground mb-2">Voice Notes</h4>
            <p className="text-sm text-muted-foreground">
              Don't have time to type? Send a voice note in any local language. Our system
              transcribes and processes it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-foreground mb-2">Instant Confirmation</h4>
            <p className="text-sm text-muted-foreground">
              Get immediate feedback with a unique tracking ID. Your report enters the
              community verification pipeline.
            </p>
          </motion.div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-5 h-5 text-primary" />
              <h4 className="text-foreground">Start Reporting</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Message us on WhatsApp to report an issue in your area
            </p>
            <button className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
