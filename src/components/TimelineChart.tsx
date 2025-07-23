import React from 'react';
import { TimelineData } from '../types/datadog';
import { TrendingUp, AlertCircle, Activity, FileText, GitBranch } from 'lucide-react';

interface TimelineChartProps {
  timelineData: {
    preIncident: TimelineData;
    incident: TimelineData;
    postIncident: TimelineData;
  };
}

export const TimelineChart: React.FC<TimelineChartProps> = ({ timelineData }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatValue = (value: number) => {
    return (value * 100).toFixed(2) + '%';
  };

  const getMetricPoints = (data: TimelineData) => {
    if (!data.metrics[0]?.points) return [];
    return data.metrics[0].points;
  };

  const renderMetricChart = (data: TimelineData, title: string, bgColor: string) => {
    const points = getMetricPoints(data);
    if (points.length === 0) return null;

    const maxValue = Math.max(...points.map(p => p[1]));
    const minValue = Math.min(...points.map(p => p[1]));

    return (
      <div className={`${bgColor} rounded-lg p-4 border border-gray-700`}>
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          {title}
        </h4>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(data.startTime)}</span>
            <span>{formatTime(data.endTime)}</span>
          </div>
          
          <div className="h-20 bg-gray-900 rounded relative overflow-hidden">
            <svg width="100%" height="100%" className="absolute inset-0">
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                points={points.map((point, index) => {
                  const x = (index / (points.length - 1)) * 100;
                  const y = 100 - ((point[1] - minValue) / (maxValue - minValue)) * 80;
                  return `${x},${y}`;
                }).join(' ')}
              />
              {points.map((point, index) => {
                const x = (index / (points.length - 1)) * 100;
                const y = 100 - ((point[1] - minValue) / (maxValue - minValue)) * 80;
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="2"
                    fill="#3B82F6"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-green-400">Min: {formatValue(minValue)}</span>
            <span className="text-red-400">Max: {formatValue(maxValue)}</span>
          </div>
        </div>

        {/* Events for this period */}
        {data.events.length > 0 && (
          <div className="mt-4 space-y-2">
            <h5 className="text-xs font-medium text-gray-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Events ({data.events.length})
            </h5>
            {data.events.slice(0, 2).map((event) => (
              <div key={event.id} className="text-xs text-gray-300 bg-gray-900 rounded p-2">
                <div className="font-medium">{event.title}</div>
                <div className="text-gray-500">{formatTime(event.date_happened)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Log summary */}
        {data.logs.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-2 text-xs">
              <FileText className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Logs:</span>
              <span className="text-red-400">{data.logs.filter(l => l.level === 'ERROR').length} errors</span>
              <span className="text-yellow-400">{data.logs.filter(l => l.level === 'WARN').length} warns</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Timeline Analysis
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Metrics, events, and logs across the incident timeline
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {renderMetricChart(
            timelineData.preIncident, 
            'Pre-Incident (15 min before)', 
            'bg-green-900/10'
          )}
          
          {renderMetricChart(
            timelineData.incident, 
            'Incident Period', 
            'bg-red-900/10'
          )}
          
          {renderMetricChart(
            timelineData.postIncident, 
            'Post-Incident (30 min after)', 
            'bg-blue-900/10'
          )}
        </div>

        {/* Timeline Summary */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-900/20 rounded-lg p-3 border border-green-800">
            <div className="text-green-400 font-semibold">
              {timelineData.preIncident.metrics[0]?.points?.length || 0}
            </div>
            <div className="text-xs text-gray-400">Data Points</div>
          </div>
          
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-800">
            <div className="text-red-400 font-semibold">
              {timelineData.incident.events.length + timelineData.incident.logs.filter(l => l.level === 'ERROR').length}
            </div>
            <div className="text-xs text-gray-400">Critical Events</div>
          </div>
          
          <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800">
            <div className="text-blue-400 font-semibold">
              {timelineData.postIncident.traces.length}
            </div>
            <div className="text-xs text-gray-400">Traces Analyzed</div>
          </div>
        </div>
      </div>
    </div>
  );
};