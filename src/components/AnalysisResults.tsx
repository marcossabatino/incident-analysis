import React from 'react';
import { AnalysisResult } from '../types/datadog';
import { AlertDetails } from './AlertDetails';
import { TimelineChart } from './TimelineChart';
import { CorrelationsPanel } from './CorrelationsPanel';
import { RecommendationsPanel } from './RecommendationsPanel';
import { VersionChanges } from './VersionChanges';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-3">Analysis Summary</h2>
        <p className="text-gray-300 leading-relaxed">{results.summary}</p>
      </div>

      {/* Alert Details */}
      <AlertDetails monitor={results.monitor} alert={results.alert} />

      {/* Timeline Visualization */}
      <TimelineChart timelineData={results.timelineData} />

      {/* Grid Layout for Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlations */}
        <CorrelationsPanel correlations={results.correlations} />

        {/* Version Changes */}
        <VersionChanges changes={results.versionChanges} />
      </div>

      {/* Recommendations */}
      <RecommendationsPanel recommendations={results.recommendations} />
    </div>
  );
};