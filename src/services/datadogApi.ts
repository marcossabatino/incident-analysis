import { 
  Monitor, 
  Alert, 
  Metric, 
  Event, 
  LogEntry, 
  Trace, 
  VersionChange, 
  AnalysisResult,
  TimelineData,
  Correlation,
  Recommendation
} from '../types/datadog';

class DatadogApiService {
  private baseUrl = 'https://api.datadoghq.com/api/v1';
  private apiKey = import.meta.env.VITE_DATADOG_API_KEY || '';
  private appKey = import.meta.env.VITE_DATADOG_APP_KEY || '';

  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add authentication
    url.searchParams.append('api_key', this.apiKey);
    url.searchParams.append('application_key', this.appKey);
    
    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Datadog API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async getMonitor(monitorId: number): Promise<Monitor> {
    // For demo purposes, return mock data
    return {
      id: monitorId,
      name: `Application Error Rate Monitor #${monitorId}`,
      type: 'metric alert',
      query: 'avg(last_5m):avg:web.request.error_rate{env:production} > 0.05',
      message: 'Error rate is above 5% threshold',
      overall_state: 'Alert',
      created: '2024-01-15T10:00:00Z',
      modified: '2024-01-15T14:30:00Z',
      tags: ['team:backend', 'service:web-api', 'env:production']
    };
  }

  async getAlerts(monitorId: number, from: number, to: number): Promise<Alert[]> {
    // Mock alert data
    return [
      {
        id: 'alert_123',
        monitor_id: monitorId,
        status: 'triggered',
        timestamp: Date.now() - 1800000, // 30 minutes ago
        message: 'Error rate exceeded threshold: 7.2%',
        severity: 'critical'
      }
    ];
  }

  async getMetrics(query: string, from: number, to: number): Promise<Metric[]> {
    // Mock metrics data
    const points = [];
    const interval = 60000; // 1 minute intervals
    
    for (let time = from; time <= to; time += interval) {
      // Simulate error rate spike during incident
      const isIncidentTime = time > (Date.now() - 2700000) && time < (Date.now() - 900000);
      const baseValue = isIncidentTime ? 0.08 + Math.random() * 0.04 : 0.02 + Math.random() * 0.02;
      points.push([time / 1000, baseValue]);
    }

    return [
      {
        metric: 'web.request.error_rate',
        points,
        scope: 'env:production,service:web-api',
        display_name: 'Web Request Error Rate',
        unit: 'percent'
      }
    ];
  }

  async getEvents(from: number, to: number, tags: string[] = []): Promise<Event[]> {
    // Mock events data
    return [
      {
        id: 'event_456',
        title: 'Deployment: web-api v2.1.4',
        text: 'Deployed web-api version 2.1.4 to production',
        date_happened: Date.now() - 3600000, // 1 hour ago
        priority: 'normal',
        tags: ['deployment', 'web-api', 'v2.1.4'],
        source_type_name: 'deployment'
      },
      {
        id: 'event_789',
        title: 'Database connection pool exhausted',
        text: 'Connection pool reached maximum capacity',
        date_happened: Date.now() - 1800000, // 30 minutes ago
        priority: 'normal',
        tags: ['database', 'connection-pool'],
        source_type_name: 'application'
      }
    ];
  }

  async getLogs(query: string, from: number, to: number): Promise<LogEntry[]> {
    // Mock logs data
    return [
      {
        id: 'log_001',
        timestamp: Date.now() - 1800000,
        message: 'Database connection timeout after 30s',
        level: 'ERROR',
        service: 'web-api',
        source: 'database-connector',
        tags: ['database', 'timeout', 'error']
      },
      {
        id: 'log_002',
        timestamp: Date.now() - 1790000,
        message: 'Retrying database connection (attempt 2/3)',
        level: 'WARN',
        service: 'web-api',
        source: 'database-connector',
        tags: ['database', 'retry', 'warning']
      },
      {
        id: 'log_003',
        timestamp: Date.now() - 1770000,
        message: 'Failed to process request: connection unavailable',
        level: 'ERROR',
        service: 'web-api',
        source: 'request-handler',
        tags: ['request', 'database', 'error']
      }
    ];
  }

  async getTraces(service: string, from: number, to: number): Promise<Trace[]> {
    // Mock traces data
    return [
      {
        trace_id: 'trace_abc123',
        span_id: 'span_def456',
        service: 'web-api',
        operation_name: '/api/users',
        start_time: Date.now() - 1800000,
        duration: 35000000, // 35 seconds in nanoseconds
        error: true,
        tags: {
          'http.method': 'GET',
          'http.status_code': '500',
          'error.type': 'DatabaseTimeoutException'
        }
      }
    ];
  }

  async getVersionChanges(from: number, to: number): Promise<VersionChange[]> {
    // Mock version changes
    return [
      {
        timestamp: Date.now() - 3600000,
        service: 'web-api',
        from_version: 'v2.1.3',
        to_version: 'v2.1.4',
        deployment_type: 'rolling_update'
      }
    ];
  }

  async analyzeIncident(monitorId: number): Promise<AnalysisResult> {
    const now = Date.now();
    const alertTime = now - 1800000; // 30 minutes ago
    const preIncidentStart = alertTime - 900000; // 15 minutes before
    const postIncidentEnd = alertTime + 1800000; // 30 minutes after

    // Fetch all data
    const [monitor, alerts, events, logs, traces, versionChanges] = await Promise.all([
      this.getMonitor(monitorId),
      this.getAlerts(monitorId, preIncidentStart, postIncidentEnd),
      this.getEvents(preIncidentStart, postIncidentEnd),
      this.getLogs('service:web-api', preIncidentStart, postIncidentEnd),
      this.getTraces('web-api', preIncidentStart, postIncidentEnd),
      this.getVersionChanges(preIncidentStart, postIncidentEnd)
    ]);

    // Get metrics for different time periods
    const [preMetrics, incidentMetrics, postMetrics] = await Promise.all([
      this.getMetrics(monitor.query, preIncidentStart, alertTime),
      this.getMetrics(monitor.query, alertTime, alertTime + 900000),
      this.getMetrics(monitor.query, alertTime + 900000, postIncidentEnd)
    ]);

    const timelineData = {
      preIncident: {
        startTime: preIncidentStart,
        endTime: alertTime,
        metrics: preMetrics,
        events: events.filter(e => e.date_happened < alertTime),
        logs: logs.filter(l => l.timestamp < alertTime),
        traces: traces.filter(t => t.start_time < alertTime)
      },
      incident: {
        startTime: alertTime,
        endTime: alertTime + 900000,
        metrics: incidentMetrics,
        events: events.filter(e => e.date_happened >= alertTime && e.date_happened < alertTime + 900000),
        logs: logs.filter(l => l.timestamp >= alertTime && l.timestamp < alertTime + 900000),
        traces: traces.filter(t => t.start_time >= alertTime && t.start_time < alertTime + 900000)
      },
      postIncident: {
        startTime: alertTime + 900000,
        endTime: postIncidentEnd,
        metrics: postMetrics,
        events: events.filter(e => e.date_happened >= alertTime + 900000),
        logs: logs.filter(l => l.timestamp >= alertTime + 900000),
        traces: traces.filter(t => t.start_time >= alertTime + 900000)
      }
    };

    // Generate correlations
    const correlations: Correlation[] = [
      {
        type: 'version',
        description: 'Deployment occurred 1 hour before incident',
        confidence: 0.85,
        impact: 'high',
        details: versionChanges[0]
      },
      {
        type: 'log',
        description: 'Database timeout errors correlate with error rate spike',
        confidence: 0.92,
        impact: 'high',
        details: logs.filter(l => l.level === 'ERROR')
      },
      {
        type: 'trace',
        description: 'Request latency increased 10x during incident',
        confidence: 0.88,
        impact: 'high',
        details: traces.filter(t => t.error)
      }
    ];

    // Generate recommendations
    const recommendations: Recommendation[] = [
      {
        priority: 'high',
        category: 'immediate',
        title: 'Check Database Connection Pool',
        description: 'Database connection timeouts indicate pool exhaustion',
        action: 'Increase connection pool size or investigate connection leaks'
      },
      {
        priority: 'medium',
        category: 'investigation',
        title: 'Review Recent Deployment',
        description: 'Version 2.1.4 deployed shortly before incident',
        action: 'Compare database queries and connection handling between versions'
      },
      {
        priority: 'medium',
        category: 'preventive',
        title: 'Implement Circuit Breaker',
        description: 'Prevent cascade failures during database issues',
        action: 'Add circuit breaker pattern for database operations'
      }
    ];

    return {
      monitor,
      alert: alerts[0],
      timelineData,
      correlations,
      versionChanges,
      recommendations,
      summary: 'Database connection pool exhaustion following deployment v2.1.4 caused 30-minute service degradation with 7.2% error rate spike.'
    };
  }
}

export const datadogApi = new DatadogApiService();