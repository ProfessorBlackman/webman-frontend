import React from 'react';
import {AccessibilityReportProps} from "./types.ts";
import {IssueSection} from './IssueSection.tsx';
import "./accessibility.css"

const AccessibilityReport: React.FC<AccessibilityReportProps> = ({analysisResults}) => {
    if (!analysisResults) {
        return <div>Loading analysis results...</div>;
    }

    if (analysisResults.error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{analysisResults.error}</p>
                {/* Note: This part assumes 'issues' exists in the error case, which wasn't in the original type */}
                {/* You might want to adjust this based on your actual error handling */}
            </div>
        );
    }

    return (
        <div className="accessibility-report">
            <header className="report-header">
                <h2>Accessibility Analysis Report</h2>
                <p className="url">URL: {analysisResults.url}</p>
                <div className="total-issues">
                    <span className="label">Total Issues Found</span>
                    <span className="count">{analysisResults.total_issues}</span>
                </div>
            </header>

            <div className="report-content">
                <IssueSection
                    title="Image Accessibility"
                    issues={analysisResults.image_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> {issue.element}<br/>
                            <strong>Source:</strong> {issue.src}<br/>
                            <strong>Issue:</strong> {issue.issue}
                        </>
                    )}
                />

                <IssueSection
                    title="Heading Structure"
                    issues={analysisResults.heading_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> {issue.element}<br/>
                            <strong>Text:</strong> {issue.text}<br/>
                            <strong>Issue:</strong> {issue.issue}
                        </>
                    )}
                />

                <IssueSection
                    title="Form Accessibility"
                    issues={analysisResults.form_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> {issue.element}<br/>
                            <strong>Type:</strong> {issue.type}<br/>
                            <strong>ID:</strong> {issue.id}<br/>
                            <strong>Issue:</strong> {issue.issue}
                        </>
                    )}
                />

                <IssueSection
                    title="Color Contrast"
                    issues={analysisResults.contrast_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> {issue.element}<br/>
                            <strong>Text:</strong> {issue.text}<br/>
                            <strong>Issue:</strong> {issue.issue}
                        </>
                    )}
                />

                <IssueSection
                    title="ARIA Attributes"
                    issues={analysisResults.aria_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> {issue.element}<br/>
                            {issue.role && <><strong>Role:</strong> {issue.role}<br/></>}
                            {issue.missing_attributes && (
                                <><strong>Missing Attributes:</strong> {issue.missing_attributes.join(', ')}<br/></>
                            )}
                            <strong>Issue:</strong> {issue.issue}
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default AccessibilityReport;