import React from 'react';
import { Activity, TrendingUp, Search, AlertCircle } from 'lucide-react';

interface LoadingSpinnerProps {
  stage: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ stage }) => {
  const stages = [
    { id: 'monitor', label: 'Fetching monitor details', icon: AlertCircle },
    { id: 'metrics', label: 'Analyzing metrics', icon: TrendingUp },
    { id: 'events', label: 'Correlating events', icon: Activity },
    { id: 'analysis', label: 'Generating insights', icon: Search }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">Analyzing Incident</h3>
        <p className="text-gray-400 mb-8">Processing Datadog data and correlating events...</p>
        
        <div className="space-y-4">
          {stages.map((stageInfo, index) => {
            const Icon = stageInfo.icon;
            const isActive = index === currentStageIndex;
            const isCompleted = index < currentStageIndex;
            
            return (
              <div
                key={stageInfo.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-900/20 border border-blue-800' 
                    : isCompleted 
                      ? 'bg-green-900/20 border border-green-800' 
                      : 'bg-gray-900 border border-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? 'bg-blue-500' 
                    : isCompleted 
                      ? 'bg-green-500' 
                      : 'bg-gray-600'
                }`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                
                <span className={`font-medium ${
                  isActive 
                    ? 'text-blue-400' 
                    : isCompleted 
                      ? 'text-green-400' 
                      : 'text-gray-400'
                }`}>
                  {stageInfo.label}
                </span>
                
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {isCompleted && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};