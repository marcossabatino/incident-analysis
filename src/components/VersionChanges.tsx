import React from 'react';
import { VersionChange } from '../types/datadog';
import { GitBranch, Clock, Package } from 'lucide-react';

interface VersionChangesProps {
  changes: VersionChange[];
}

export const VersionChanges: React.FC<VersionChangesProps> = ({ changes }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getDeploymentTypeColor = (type: string) => {
    switch (type) {
      case 'rolling_update': return 'text-blue-400 bg-blue-900/20 border-blue-800';
      case 'blue_green': return 'text-green-400 bg-green-900/20 border-green-800';
      case 'canary': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-green-400" />
          Version Changes
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {changes.length} deployment{changes.length !== 1 ? 's' : ''} in analysis window
        </p>
      </div>

      <div className="p-6 space-y-4">
        {changes.map((change, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-900/20 rounded-lg border border-green-800">
                <GitBranch className="w-4 h-4 text-green-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium">{change.service}</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getDeploymentTypeColor(change.deployment_type)}`}>
                    {change.deployment_type.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">From:</span>
                    <code className="text-red-400 bg-red-900/20 px-2 py-1 rounded">
                      {change.from_version}
                    </code>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">To:</span>
                    <code className="text-green-400 bg-green-900/20 px-2 py-1 rounded">
                      {change.to_version}
                    </code>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(change.timestamp)}</span>
                  <span className="text-gray-600">•</span>
                  <span>
                    {Math.round((Date.now() - change.timestamp) / 60000)} minutes before alert
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {changes.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No version changes detected</p>
            <p className="text-gray-500 text-sm">
              No deployments found in the analysis time window
            </p>
          </div>
        )}
      </div>
    </div>
  );
};