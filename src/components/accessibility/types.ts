export interface Issue {
  element: string;
  issue: string;
  src?: string;
  text?: string;
  type?: string;
  id?: string;
  role?: string;
  missing_attributes?: string[];
}

export interface AccessibilityAnalysisResult {
  url: string;
  image_issues: Issue[];
  heading_issues: Issue[];
  form_issues: Issue[];
  contrast_issues: Issue[];
  aria_issues: Issue[];
  total_issues: number;
  error?: string;
}

export interface AccessibilityReportProps {
  analysisResults?: AccessibilityAnalysisResult;
}