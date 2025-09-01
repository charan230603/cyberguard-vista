import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Network, 
  Bug, 
  Zap, 
  Eye,
  TrendingUp,
  Server,
  Lock
} from "lucide-react";

interface ThreatData {
  id: string;
  type: "malware" | "network" | "ddos" | "ids";
  severity: "critical" | "high" | "medium" | "low" | "safe";
  description: string;
  timestamp: string;
  model: "Random Forest" | "KNN";
  confidence: number;
  source: string;
}

const ThreatDashboard = () => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);

  // Mock data generation
  useEffect(() => {
    const mockThreats: ThreatData[] = [
      {
        id: "1",
        type: "malware",
        severity: "critical",
        description: "Trojan.Win32.Agent detected in system memory",
        timestamp: new Date().toISOString(),
        model: "Random Forest",
        confidence: 94.2,
        source: "192.168.1.45"
      },
      {
        id: "2",
        type: "ddos",
        severity: "high",
        description: "Volumetric attack detected - 50k requests/min",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        model: "KNN",
        confidence: 87.6,
        source: "Multiple IPs"
      },
      {
        id: "3",
        type: "network",
        severity: "medium",
        description: "Suspicious port scanning activity",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        model: "Random Forest",
        confidence: 76.3,
        source: "10.0.0.23"
      },
      {
        id: "4",
        type: "ids",
        severity: "low",
        description: "Unusual user authentication pattern",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        model: "KNN",
        confidence: 62.1,
        source: "auth_server"
      }
    ];
    setThreats(mockThreats);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "critical";
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "safe";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "malware": return <Bug className="h-4 w-4" />;
      case "ddos": return <Zap className="h-4 w-4" />;
      case "network": return <Network className="h-4 w-4" />;
      case "ids": return <Shield className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const threatCounts = {
    critical: threats.filter(t => t.severity === "critical").length,
    high: threats.filter(t => t.severity === "high").length,
    medium: threats.filter(t => t.severity === "medium").length,
    low: threats.filter(t => t.severity === "low").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Threat Detection Center</h1>
        </div>
        <p className="text-muted-foreground">AI-powered security monitoring with Random Forest and KNN models</p>
      </div>

      {/* Threat Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-critical/20 to-critical/5 border-critical/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-critical" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-critical">{threatCounts.critical}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-high/20 to-high/5 border-high/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <TrendingUp className="h-4 w-4 text-high" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-high">{threatCounts.high}</div>
            <p className="text-xs text-muted-foreground">Elevated risk level</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-medium/20 to-medium/5 border-medium/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Alerts</CardTitle>
            <Eye className="h-4 w-4 text-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medium">{threatCounts.medium}</div>
            <p className="text-xs text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-low/20 to-low/5 border-low/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Priority</CardTitle>
            <Activity className="h-4 w-4 text-low" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-low">{threatCounts.low}</div>
            <p className="text-xs text-muted-foreground">Routine monitoring</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Feed */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Live Threat Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {threats.map((threat) => (
              <div 
                key={threat.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-${getSeverityColor(threat.severity)}/20`}>
                    {getTypeIcon(threat.type)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{threat.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{threat.source}</span>
                      <span>•</span>
                      <span>{new Date(threat.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`border-${getSeverityColor(threat.severity)} text-${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary">{threat.model}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Model Performance & Analysis */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="models" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="models">ML Models</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="models" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Random Forest</span>
                      <span className="text-sm text-muted-foreground">92.4% Accuracy</span>
                    </div>
                    <Progress value={92.4} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">K-Nearest Neighbors</span>
                      <span className="text-sm text-muted-foreground">87.6% Accuracy</span>
                    </div>
                    <Progress value={87.6} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="text-2xl font-bold text-primary">1,247</div>
                    <div className="text-sm text-muted-foreground">Threats Detected</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-safe/10 border border-safe/20">
                    <div className="text-2xl font-bold text-safe">99.2%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                {selectedThreat ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Threat Analysis
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Type:</strong> {selectedThreat.type.toUpperCase()}</div>
                        <div><strong>Severity:</strong> <span className={`text-${getSeverityColor(selectedThreat.severity)}`}>{selectedThreat.severity}</span></div>
                        <div><strong>Model:</strong> {selectedThreat.model}</div>
                        <div><strong>Confidence:</strong> {selectedThreat.confidence}%</div>
                        <div><strong>Source:</strong> {selectedThreat.source}</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Generate Detailed Report
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Select a threat from the feed to view detailed analysis</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatDashboard;