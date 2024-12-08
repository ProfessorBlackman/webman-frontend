import {AnalysisReport} from "../types/analysis_report.ts";
import React from "react";

interface SecurityHeadersCardProps {
  headers: AnalysisReport['security_headers'];
}

export const SecurityHeadersCard: React.FC<SecurityHeadersCardProps> = ({ headers }) => {
  const getHeaderStatus = (header: string) => {
    return header === 'Missing' ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Security Headers</h2>
      <div className="space-y-2">
        <div className="card-item">
          <p className="font-semibold">X-Frame-Options:</p>
          <p className={getHeaderStatus(headers.x_frame_options)}>
            {headers.x_frame_options}
          </p>
        </div>
        <div className="card-item">
          <p className="font-semibold">X-XSS-Protection:</p>
          <p className={getHeaderStatus(headers.x_xss_protection)}>
            {headers.x_xss_protection}
          </p>
        </div>
        <div className="card-item">
          <p className="font-semibold">Content-Security-Policy:</p>
          <p className={getHeaderStatus(headers.content_security_policy)}>
            {headers.content_security_policy}
          </p>
        </div>
        <div className="card-item">
          <p className="font-semibold">Strict-Transport-Security:</p>
          <p className={getHeaderStatus(headers.strict_transport_security)}>
            {headers.strict_transport_security}
          </p>
        </div>
      </div>
    </div>
  );
};