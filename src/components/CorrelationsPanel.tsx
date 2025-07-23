import React from 'react';
import { Correlation } from '../types/datadog';
import { GitBranch, TrendingUp, AlertCircle, Activity, FileText } from 'lucide-react';

interface CorrelationsPanelProps {
  correlations: Correlation[];
}

export const CorrelationsPanel: React.FC<CorrelationsPanelProps> = ({ correlations }) => {
  const getCorrelationIcon = (type: string) => {
    switch (type) {
      case 'version': return GitBranch;
      case 'metric': return TrendingUp;
      case 'event': return AlertCircle;
      case 'trace': return Activity;
      case 'log': return FileText;
      default: return AlertCircle;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400 bg-green-900/20 border-green-800';
    if (confidence >= 0.6) return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
    return 'text-red-400 bg-red-900/20 border-red-800';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-400" />
          Correlations Found
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {correlations.length} correlation{correlations.length !== 1 ? 's' : ''} identified
        </p>
      </div>

      <div className="p-6 space-y-4">
        {correlations.map((correlation, index) => {
          const Icon = getCorrelationIcon(correlation.type);
          
          return (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-800">
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-medium capitalize">
                      {correlation.type} Correlation
                    </span>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(correlation.impact)}`}>
                      {correlation.impact} impact
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    {correlation.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(correlation.confidence)}`}>
                      {Math.round(correlation.confidence * 100)}% confidence
                    </div>
                    
                    {correlation.type === 'version' && correlation.details && (
                      <div className="text-xs text-gray-400">
                        {correlation.details.from_version} → {correlation.details.to_version}
                      </div>
                    )}
                    
                    {correlation.type === 'log' && correlation.details && (
                      <div className="text-xs text-gray-400">
                        {correlation.details.length} related log entries
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {correlations.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No correlations detected</p>
            <p className="text-gray-500 text-sm">
              This could indicate an isolated incident or insufficient data
            </p>
          </div>
        )}
      </div>
    </div>
  );
};