import React from 'react';
import { Monitor, Alert } from '../types/datadog';
import { AlertTriangle, Clock, Tag, Activity } from 'lucide-react';

interface AlertDetailsProps {
  monitor: Monitor;
  alert: Alert;
}

export const AlertDetails: React.FC<AlertDetailsProps> = ({ monitor, alert }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-800';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-800';
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'Alert': return 'text-red-400 bg-red-900/20';
      case 'Warn': return 'text-yellow-400 bg-yellow-900/20';
      case 'OK': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Monitor Details
          </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStateColor(monitor.overall_state)}`}>
            {monitor.overall_state}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Monitor Name</h3>
            <p className="text-white font-medium">{monitor.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Monitor ID</h3>
            <p className="text-white font-mono">#{monitor.id}</p>
          </div>
        </div>

        {/* Query */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Query
          </h3>
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <code className="text-green-400 text-sm font-mono">{monitor.query}</code>
          </div>
        </div>

        {/* Alert Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Severity</span>
            </div>
            <p className="capitalize font-semibold">{alert.severity}</p>
          </div>

          <div className="p-4 rounded-lg border border-gray-600 bg-gray-900/20">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Triggered</span>
            </div>
            <p className="text-white font-semibold">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-gray-600 bg-gray-900/20">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">Status</span>
            </div>
            <p className="text-white font-semibold capitalize">{alert.status}</p>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {monitor.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-900/20 text-blue-300 rounded-md text-xs font-medium border border-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Monitor Message</h3>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
              <p className="text-gray-300 text-sm">{monitor.message}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Alert Message</h3>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
              <p className="text-gray-300 text-sm">{alert.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};