export interface AnalysisReport {
  url: string;
  load_time: number;
  mobile_friendly: boolean;
  seo_score: number;
  accessibility_score: number;
  security_headers: {
    x_frame_options: string;
    x_xss_protection: string;
    content_security_policy: string;
    strict_transport_security: string;
  };
}