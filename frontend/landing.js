
// Detects if the user is on a mobile device, then redirects to page telling them to use a desktop.

function isMobile() {
  // Simple and robust check: match common mobile user agent tokens and screen width
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const mobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (mobileUa.test(ua)) return true;
  // Fallback: small viewport width
  return Math.min(window.innerWidth, window.innerHeight) <= 768;
}

document.addEventListener('DOMContentLoaded', () => {
  const cookies = document.cookie || '';
  const path = window.location.pathname.replace(/\/+$/, ''); // normalize
  const onPleaseUseDesktop = path === '/pleaseusedesktop';

  // If mobile device, not already on the desktop-message page, and user hasn't dismissed for this session,
  // redirect to /pleaseusedesktop. Use replace() so back button doesn't return here.
  if (isMobile() && !onPleaseUseDesktop && cookies.indexOf('hexafund_mobile_dismiss=true') === -1) {
    window.location.replace('/pleaseusedesktop');
    return;
  }

  const overlay = document.getElementById('mobile-overlay');
  const dismiss = document.getElementById('mobile-dismiss');

  if (!overlay) return;

  // Don't show if user already dismissed this session
  if (cookies.indexOf('hexafund_mobile_dismiss=true') !== -1) return;

  if (isMobile()) {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    // Prevent background scrolling while overlay is visible
    document.body.style.overflow = 'hidden';
  }

  if (dismiss) {
    dismiss.addEventListener('click', () => {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // set a short-lived cookie so user isn't shown the message again this session
      try {
        document.cookie = 'hexafund_mobile_dismiss=true; path=/';
      } catch (e) {
        // ignore
      }
    });
  }
});