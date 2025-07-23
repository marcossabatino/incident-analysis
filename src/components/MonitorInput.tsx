import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface MonitorInputProps {
  onAnalyze: (monitorId: number) => void;
  loading: boolean;
}

export const MonitorInput: React.FC<MonitorInputProps> = ({ onAnalyze, loading }) => {
  const [monitorId, setMonitorId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const id = parseInt(monitorId.trim());
    if (!id || id <= 0) {
      setError('Please enter a valid monitor ID');
      return;
    }

    onAnalyze(id);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-400" />
        Datadog Monitor Analysis
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="monitor-id" className="block text-sm font-medium text-gray-300 mb-2">
            Monitor ID
          </label>
          <div className="relative">
            <input
              id="monitor-id"
              type="text"
              value={monitorId}
              onChange={(e) => setMonitorId(e.target.value)}
              placeholder="Enter Datadog monitor ID (e.g., 12345)"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              disabled={loading}
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !monitorId.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Analyze Incident
            </>
          )}
        </button>
      </form>

      <div className="mt-4 p-3 bg-gray-900 rounded-lg">
        <p className="text-xs text-gray-400">
          This tool will analyze 15 minutes before and 30 minutes after the alert, correlating metrics, logs, traces, and events to provide actionable insights.
        </p>
      </div>
    </div>
  );
};