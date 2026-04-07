declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID = '1262145439178127';

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
  }
}

export function trackQuizStart() {
  trackEvent('QuizStart');
}

export function trackQuizComplete(typeId: string) {
  trackEvent('QuizComplete', { content_name: typeId });
}

export function trackOfferClick() {
  trackEvent('ViewContent', { content_name: 'offer_click' });
}
