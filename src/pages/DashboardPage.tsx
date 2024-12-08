import React, {useState} from 'react';
import {analyzeWebsite, isValidUrl} from '../services/analyzeService';
import "./pages.css";
import {SideBar} from "../components/side_bar/SideBar.tsx";
import UrlInput from "../components/UrlInput.tsx";
import AccessibilityReport from "../components/accessibility/AccessibilityReport.tsx";
import WebVitals from "../components/performance/WebVitals.tsx";
import ResponsivenessReport from "../components/responsiveness/ResponsivenessReport.tsx";
import {WebVitalsResults} from "../components/performance/types.ts";
import {AccessibilityAnalysisResult} from "../components/accessibility/types.ts";
import {AnalysisReport} from "../components/responsiveness/types.ts";

const DashboardPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [report, setReport] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisType, setAnalysisType] = useState('performance');

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        if (!isValidUrl(url)) {
            setError('Invalid URL. Please enter a valid URL and try again.');
            setLoading(false);
            return;
        }
        try {
            const performanceReport = await analyzeWebsite(url, analysisType);
            console.log('performanceReport:', performanceReport);
            setReport(performanceReport);
        } catch (err) {
            switch (err) {
                case 'Error: Request failed with status code 400':
                    setError('Invalid URL. Please enter a valid URL and try again.');
                    break;
                case 'Error: Request failed with status code 500':
                    setError('Internal server error. Please try again later.');
                    break;
                default:
                    setError('An error occurred. Please try again later.');
            }
        }
        setLoading(false);
    };

    const renderReport = () => {
        console.log('analysisType:', analysisType);
        switch (analysisType) {
            case 'Performance': {
                const webVitalsReport = report as WebVitalsResults;
                return <WebVitals results={webVitalsReport}/>;
            }
            case 'Accessibility': {
                const accessibilityReport = report as AccessibilityAnalysisResult;
                return <AccessibilityReport analysisResults={accessibilityReport}/>;
            }
            case 'Responsiveness': {
                const responsivenessReport = report as AnalysisReport;
                return <ResponsivenessReport report={responsivenessReport}/>;
            }
            default:
                return null;
        }
    };

    return (
        <div className=" main-container">
            <SideBar setAnalysisType={setAnalysisType} setReport={setReport}/>
            <div className="container mx-auto">

                {
                    report === null && (
                        <><h1 className="text-3xl font-bold mb-8">Enter URL to begin <span
                            className="analysis-type">{analysisType.toLowerCase()}</span> analysis</h1>
                            <UrlInput
                                url={url}
                                setUrl={setUrl}
                                handleAnalyze={handleAnalyze}
                                loading={loading}
                                error={error}/></>
                    )
                }

                {report !== null && (
                    <div className="report-container">
                        {renderReport()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;