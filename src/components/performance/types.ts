interface MetricResult {
  value: number;
  rating: 'Good' | 'Needs Improvement' | 'Poor';
  unit: 'ms' | 'score';
}

export interface WebVitalsResults {
  TTFB: MetricResult;
  FCP: MetricResult;
  LCP: MetricResult;
  CLS: MetricResult;
  FID: MetricResult;
}

export interface WebVitalsProps {
  results: WebVitalsResults;
}

export const metricDescriptions = {
  TTFB: 'Time to First Byte - Time until the first byte of content is received',
  FCP: 'First Contentful Paint - Time until the first content is painted',
  LCP: 'Largest Contentful Paint - Time until the largest content element is visible',
  CLS: 'Cumulative Layout Shift - Measures visual stability',
  FID: 'First Input Delay - Time until the page becomes interactive',
};