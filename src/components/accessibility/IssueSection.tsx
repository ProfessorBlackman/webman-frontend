import React from "react";
import {Issue} from "./types.ts";
import "./accessibility.css";

interface IssueSectionProps {
    title: string;
    issues: Issue[];
    renderIssue: (issue: Issue) => React.ReactNode;
  }

  export const IssueSection: React.FC<IssueSectionProps> = ({ title, issues, renderIssue }) => (
    <section className="issue-section">
      <h3>{title} ({issues.length} issues)</h3>
      {issues.length > 0 ? (
        <ul className="issue-list">
          {issues.map((issue, index) => (
            <li key={index} className="issue-item">
              {renderIssue(issue)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-issues">No issues found</p>
      )}
    </section>
  );
