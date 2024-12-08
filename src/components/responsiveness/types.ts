interface ResourceTiming {
  duration: number;
  size: number;
}

interface ViewportTest {
  has_horizontal_scroll: boolean;
  elements_overflow: boolean;
}

interface InteractiveElement {
  visible: boolean;
  clickable: boolean;
}

export interface AnalysisReport {
  url: string;
  timestamp: string;
  results: {
    load_time: number;
    viewport_tests: {
      [size: string]: ViewportTest;
    };
    resource_loading: {
      [resource: string]: ResourceTiming;
    };
    interactive_elements: {
      [element: string]: InteractiveElement;
    };
  };
}
