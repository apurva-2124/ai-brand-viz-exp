
// Type definition for gtag
interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Ensure window.gtag exists
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'consent',
      actionOrConfig: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Initialize GA (this happens in index.html already, but this ensures type safety)
export const initGA = (measurementId: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', measurementId);
  }
};

// Track a page view
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-KE0SC41J9W', {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value, ...params }: GTagEvent): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...params,
    });
  }
};
