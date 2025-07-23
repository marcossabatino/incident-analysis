export interface Monitor {
  id: number;
  name: string;
  type: string;
  query: string;
  message: string;
  overall_state: 'Alert' | 'Warn' | 'No Data' | 'OK';
  created: string;
  modified: string;
  tags: string[];
}

export interface Alert {
  id: string;
  monitor_id: number;
  status: 'triggered' | 'recovered';
  timestamp: number;
  message: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface Metric {
  metric: string;
  points: Array<[number, number]>;
  scope: string;
  display_name: string;
  unit: string;
}

export interface Event {
  id: string;
  title: string;
  text: string;
  date_happened: number;
  priority: 'normal' | 'low';
  tags: string[];
  source_type_name: string;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  message: string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  service: string;
  source: string;
  tags: string[];
}

export interface Trace {
  trace_id: string;
  span_id: string;
  service: string;
  operation_name: string;
  start_time: number;
  duration: number;
  error: boolean;
  tags: Record<string, string>;
}

export interface VersionChange {
  timestamp: number;
  service: string;
  from_version: string;
  to_version: string;
  deployment_type: string;
}

export interface AnalysisResult {
  monitor: Monitor;
  alert: Alert;
  timelineData: {
    preIncident: TimelineData;
    incident: TimelineData;
    postIncident: TimelineData;
  };
  correlations: Correlation[];
  versionChanges: VersionChange[];
  recommendations: Recommendation[];
  summary: string;
}

export interface TimelineData {
  startTime: number;
  endTime: number;
  metrics: Metric[];
  events: Event[];
  logs: LogEntry[];
  traces: Trace[];
}

export interface Correlation {
  type: 'metric' | 'event' | 'log' | 'trace' | 'version';
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  details: any;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'immediate' | 'investigation' | 'preventive';
  title: string;
  description: string;
  action: string;
}