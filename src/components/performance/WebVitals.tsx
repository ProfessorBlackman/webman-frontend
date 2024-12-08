import React from 'react';
import './web_vitals.css';
import {metricDescriptions, WebVitalsProps} from "./types.ts";

const WebVitals: React.FC<WebVitalsProps> = ({results}) => {
    const getRatingColor = (rating: string): string => {
        switch (rating) {
            case 'Good':
                return '#0cce6b';
            case 'Needs Improvement':
                return '#ffa400';
            case 'Poor':
                return '#ff4e42';
            default:
                return '#999999';
        }
    };

    const formatValue = (value: number, unit: string): string => {
        return `${value}${unit}`;
    };

    return (
        <div className="web-vitals">
            <h2>Web Vitals Analysis</h2>
            <div className="table-container">
                <table className="metrics-table">
                    <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(results).map(([metric, data]) => (
                        <tr key={metric}>
                            <td className="metric-name">{metric}</td>
                            <td className="metric-description">
                                {metricDescriptions[metric as keyof typeof metricDescriptions]}
                            </td>
                            <td className="metric-value">
                                {formatValue(data.value, data.unit)}
                            </td>
                            <td>
                  <span
                      className="rating-badge"
                      style={{backgroundColor: getRatingColor(data.rating)}}
                  >
                    {data.rating}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WebVitals;