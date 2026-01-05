import { motion } from "motion/react";
import {
  Shield,
  UserCheck,
  TrendingUp,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Clock,
} from "lucide-react";
import type { Alert } from "./AlertCard";

interface Contributor {
  id: string;
  name: string;
  trustScore: number;
  reportsSubmitted: number;
  accuracy: number;
  status: "verified" | "new" | "flagged";
}

interface OperatorConsoleProps {
  alerts: Alert[];
  onMergeReports?: (ids: string[]) => void;
}

const mockContributors: Contributor[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    trustScore: 94,
    reportsSubmitted: 47,
    accuracy: 96,
    status: "verified",
  },
  {
    id: "2",
    name: "Priya Singh",
    trustScore: 88,
    reportsSubmitted: 32,
    accuracy: 91,
    status: "verified",
  },
  {
    id: "3",
    name: "Amit Sharma",
    trustScore: 45,
    reportsSubmitted: 5,
    accuracy: 60,
    status: "new",
  },
];

export function OperatorConsole({ alerts, onMergeReports }: OperatorConsoleProps) {
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-[#10B981]";
    if (score >= 60) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getStatusBadge = (status: string) => {
    const config = {
      verified: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", label: "Verified" },
      new: { bg: "bg-primary/10", text: "text-primary", label: "New" },
      flagged: { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", label: "Flagged" },
    };
    const style = config[status as keyof typeof config];
    return (
      <span className={`${style.bg} ${style.text} px-2 py-1 rounded text-xs`}>
        {style.label}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Shield className="w-8 h-8 text-primary" />
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-3xl text-foreground mb-1">247</p>
          <p className="text-sm text-muted-foreground">Total Reports</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Eye className="w-8 h-8 text-primary" />
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-3xl text-foreground mb-1">{alerts.length}</p>
          <p className="text-sm text-muted-foreground">Pending Review</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <UserCheck className="w-8 h-8 text-primary" />
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-3xl text-foreground mb-1">156</p>
          <p className="text-sm text-muted-foreground">Verified Users</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Layers className="w-8 h-8 text-primary" />
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-3xl text-foreground mb-1">12</p>
          <p className="text-sm text-muted-foreground">Needs Merge</p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reports Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-foreground">Recent Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-muted-foreground">ID</th>
                  <th className="text-left px-6 py-3 text-xs text-muted-foreground">Type</th>
                  <th className="text-left px-6 py-3 text-xs text-muted-foreground">
                    Confidence
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {alerts.slice(0, 5).map((alert, index) => (
                  <motion.tr
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-secondary/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground font-mono">
                        #{alert.id.slice(0, 6)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground capitalize">{alert.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm capitalize ${
                          alert.confidence === "high"
                            ? "text-[#10B981]"
                            : alert.confidence === "medium"
                            ? "text-[#F59E0B]"
                            : "text-[#EF4444]"
                        }`}
                      >
                        {alert.confidence}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                        Review
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex items-center justify-center border-t border-border">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Merge Similar Reports</span>
            </button>
          </div>
        </div>

        {/* Contributors Trust Score */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-foreground">Top Contributors</h3>
          </div>
          <div className="p-6 space-y-4">
            {mockContributors.map((contributor, index) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground">{contributor.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(contributor.status)}
                      <span className="text-xs text-muted-foreground">
                        {contributor.reportsSubmitted} reports
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl ${getTrustScoreColor(contributor.trustScore)}`}>
                    {contributor.trustScore}
                  </p>
                  <p className="text-xs text-muted-foreground">Trust Score</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Merge Tool */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-foreground mb-2">Incident Hub Merging</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Multiple WhatsApp reports detected for the same location. Review and merge them
              into a single incident hub to increase confidence score.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
                Review Duplicates
              </button>
              <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors">
                Auto-Merge Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
