import React, { useState } from 'react';
import { MonitorInput } from './components/MonitorInput';
import { AnalysisResults } from './components/AnalysisResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { datadogApi } from './services/datadogApi';
import { AnalysisResult } from './types/datadog';
import { AlertCircle, BarChart3, Server } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (monitorId: number) => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Simulate progressive loading stages
      setLoadingStage('monitor');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingStage('metrics');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoadingStage('events');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setLoadingStage('analysis');
      await new Promise(resolve => setTimeout(resolve, 800));

      const analysisResults = await datadogApi.analyzeIncident(monitorId);
      setResults(analysisResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Datadog Behavioral Analysis</h1>
              <p className="text-gray-400 text-sm">
                On-demand incident correlation and root cause analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <div>
                  <h3 className="text-white font-semibold">Alert Analysis</h3>
                  <p className="text-gray-400 text-sm">Monitor correlation & impact</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-white font-semibold">Timeline Analysis</h3>
                  <p className="text-gray-400 text-sm">15 min before, 30 min after</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <Server className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Multi-source Data</h3>
                  <p className="text-gray-400 text-sm">Metrics, logs, traces & events</p>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor Input */}
          <MonitorInput onAnalyze={handleAnalyze} loading={loading} />

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Analysis Error</span>
              </div>
              <p className="text-red-300 mt-2">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && <LoadingSpinner stage={loadingStage} />}

          {/* Results */}
          {results && <AnalysisResults results={results} />}

          {/* Demo Notice */}
          {!loading && !results && !error && (
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">Demo Mode</h3>
                  <p className="text-blue-300 text-sm leading-relaxed">
                    This is a demonstration of the Datadog behavioral analysis system. 
                    Enter any monitor ID to see how the tool would analyze an incident, 
                    correlate data sources, and provide actionable recommendations. 
                    In production, this would connect to your actual Datadog environment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;