import React from 'react';
import { Recommendation } from '../types/datadog';
import { 
  Lightbulb, 
  AlertTriangle, 
  Search, 
  Shield, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ recommendations }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'immediate': return AlertTriangle;
      case 'investigation': return Search;
      case 'preventive': return Shield;
      default: return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-800';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-800';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'immediate': return 'text-red-400 bg-red-900/20';
      case 'investigation': return 'text-blue-400 bg-blue-900/20';
      case 'preventive': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
  });

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Recommendations
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {recommendations.length} actionable recommendation{recommendations.length !== 1 ? 's' : ''} based on analysis
        </p>
      </div>

      <div className="p-6 space-y-4">
        {sortedRecommendations.map((recommendation, index) => {
          const CategoryIcon = getCategoryIcon(recommendation.category);
          
          return (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getCategoryColor(recommendation.category)}`}>
                  <CategoryIcon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-white font-semibold">{recommendation.title}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority} priority
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(recommendation.category)}`}>
                      {recommendation.category}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {recommendation.description}
                  </p>
                  
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-blue-400 font-medium text-sm">Action:</span>
                        <p className="text-gray-300 text-sm mt-1">{recommendation.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-white font-medium text-lg mb-2">No Recommendations</p>
            <p className="text-gray-400">
              The analysis didn't identify any specific actions to take at this time.
            </p>
          </div>
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-400">
                  {recommendations.filter(r => r.priority === 'high').length} high priority
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-400">
                  {recommendations.filter(r => r.priority === 'medium').length} medium priority
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-400">
                  {recommendations.filter(r => r.priority === 'low').length} low priority
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};