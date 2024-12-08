import {AnalysisReport} from "../types/analysis_report.ts";
import React from "react";
import "./components.css";

interface PerformanceCardProps {
  report: AnalysisReport;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ report }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 performance-card">
      <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="card-item">
          <p className="font-semibold">Load Time:</p>
          <p>{report.load_time.toFixed(2)} seconds</p>
        </div>
        <div className="card-item">
          <p className="font-semibold">Mobile Friendly:</p>
          <p className={report.mobile_friendly ? 'text-green-600' : 'text-red-600'}>
            {report.mobile_friendly ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="card-item">
          <p className="font-semibold">SEO Score:</p>
          <p className={`${getScoreColor(report.seo_score)}`}>
            {report.seo_score.toFixed(0)}/100
          </p>
        </div>
        <div className="card-item">
          <p className="font-semibold">Accessibility Score:</p>
          <p className={`${getScoreColor(report.accessibility_score)}`}>
            {report.accessibility_score.toFixed(0)}/100
          </p>
        </div>
      </div>
    </div>
  );
};