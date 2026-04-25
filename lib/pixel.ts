declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID = '2843301426001717';

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

export function trackCustomEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (params) {
      window.fbq('trackCustom', eventName, params);
    } else {
      window.fbq('trackCustom', eventName);
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

export function trackResultShare(channel: string, typeId: string) {
  trackCustomEvent('ResultShare', { channel, type_id: typeId });
}

export function trackCopyLink(typeId: string) {
  trackCustomEvent('CopyLink', { type_id: typeId });
}

export function trackSaveImage(typeId: string) {
  trackCustomEvent('SaveImage', { type_id: typeId });
}

export function trackKakaoShare(typeId: string) {
  trackCustomEvent('KakaoShare', { type_id: typeId });
}

export function trackCompareClick(typeId: string) {
  trackCustomEvent('CompareClick', { type_id: typeId });
}

export function trackShareRewardReveal(typeId: string, trigger: string) {
  trackCustomEvent('ShareRewardReveal', { type_id: typeId, trigger });
}

export function trackRetryQuiz(typeId: string) {
  trackCustomEvent('RetryQuiz', { type_id: typeId });
}
