import React from 'react';
import {AccessibilityReportProps} from "./types.ts";
import {IssueSection} from './IssueSection.tsx';
import "./accessibility.css"
import {cropString} from "../../utils/url_utils.ts";

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
                            <strong>Element:</strong> <span title={issue.element}>{cropString(issue.element)}</span><br/>
                            <strong>Source:</strong> <span title={issue.src}>{cropString(issue.src)}</span><br/>
                            <strong>Issue:</strong> <span title={issue.issue}>{cropString(issue.issue)}</span>
                        </>
                    )}
                />

                <IssueSection
                    title="Heading Structure"
                    issues={analysisResults.heading_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> <span title={issue.element}>{cropString(issue.element)}</span><br/>
                            <strong>Text:</strong> <span title={issue.text}>{cropString(issue.text)}</span><br/>
                            <strong>Issue:</strong> <span title={issue.issue}>{cropString(issue.issue)}</span>
                        </>
                    )}
                />

                <IssueSection
                    title="Form Accessibility"
                    issues={analysisResults.form_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> <span title={issue.element}>{cropString(issue.element)}</span><br/>
                            <strong>Type:</strong> <span title={issue.type}>{cropString(issue.type)}</span><br/>
                            <strong>ID:</strong> <span title={issue.id}>{cropString(issue.id)}</span><br/>
                            <strong>Issue:</strong> <span title={issue.issue}>{cropString(issue.issue)}</span>
                        </>
                    )}
                />

                <IssueSection
                    title="Color Contrast"
                    issues={analysisResults.contrast_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> <span title={issue.element}>{cropString(issue.element)}</span><br/>
                            <strong>Text:</strong> <span title={issue.text}>{cropString(issue.text)}</span><br/>
                            <strong>Issue:</strong> <span title={issue.issue}>{cropString(issue.issue)}</span>
                        </>
                    )}
                />

                <IssueSection
                    title="ARIA Attributes"
                    issues={analysisResults.aria_issues}
                    renderIssue={(issue) => (
                        <>
                            <strong>Element:</strong> <span title={issue.element}>{cropString(issue.element)}</span><br/>
                            {issue.role && <><strong>Role:</strong> <span title={issue.role}>{cropString(issue.role)}</span><br/></>}
                                    {issue.missing_attributes && (
                                <><strong>Missing Attributes:</strong> {issue.missing_attributes.join(', ')}<br/></>
                            )}
                            <strong>Issue:</strong> {cropString(issue.issue)}
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default AccessibilityReport;