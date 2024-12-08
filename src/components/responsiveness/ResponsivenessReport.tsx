import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import "./responsiveness.css";
import { AnalysisReport } from './types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ResponsivenessReportProps {
    report: AnalysisReport;
}

const ResponsivenessReport: React.FC<ResponsivenessReportProps> = ({report}) => {
    // Process resource loading data for chart
    const resourceData = Object.entries(report.results.resource_loading).map(
        ([name, data]) => ({
            name: name.split('/').pop() ?? name,
            duration: data.duration,
            size: data.size / 1024, // Convert to KB
        })
    );

    const chartData = {
        labels: resourceData.map((item) => item.name),
        datasets: [
            {
                label: 'Load Duration (ms)',
                data: resourceData.map((item) => item.duration),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Resource Loading Times',
            },
        },
    };

    return (
        <div className="responsiveness-report">
            <header className="report-header">
                <h1>Webpage Responsiveness Analysis</h1>
                <div className="report-meta">
                    <p>URL: {report.url}</p>
                    <p>Analyzed: {report.timestamp}</p>
                    <p>Total Load Time: {report.results.load_time}ms</p>
                </div>
            </header>

            <section className="viewport-tests">
                <h2>Viewport Tests</h2>
                <div className="viewport-grid">
                    {Object.entries(report.results.viewport_tests).map(([size, test]) => (
                        <div key={size} className="viewport-card">
                            <h3>{size}</h3>
                            <div className={`test-result ${test.has_horizontal_scroll ? 'warning' : 'success'}`}>
                                <span>Horizontal Scroll: </span>
                                {test.has_horizontal_scroll ? '⚠️' : '✅'}
                            </div>
                            <div className={`test-result ${test.elements_overflow ? 'warning' : 'success'}`}>
                                <span>Elements Overflow: </span>
                                {test.elements_overflow ? '⚠️' : '✅'}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="resource-loading">
                <h2>Resource Loading</h2>
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions}/>
                </div>
            </section>

            <section className="interactive-elements">
                <h2>Interactive Elements</h2>
                <div className="elements-grid">
                    {Object.entries(report.results.interactive_elements).map(([element, status]) => (
                        <div key={element} className="element-card">
                            <h3>{element}</h3>
                            <div className={`test-result ${status.visible ? 'success' : 'warning'}`}>
                                <span>Visible: </span>
                                {status.visible ? '✅' : '⚠️'}
                            </div>
                            <div className={`test-result ${status.clickable ? 'success' : 'warning'}`}>
                                <span>Clickable: </span>
                                {status.clickable ? '✅' : '⚠️'}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ResponsivenessReport;