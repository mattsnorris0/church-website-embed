(function () {
  const scriptUrl = document.currentScript?.src;

  const EMBED_CSS = scriptUrl ? new URL('./embed.css', scriptUrl).href : null;

  // Fixed: was http:// — would be blocked as mixed content on any https client site.
  const API_HOST = 'https://api.techanddevsolutions.com';

  function loadClient() {
    return new Promise((resolve, reject) => {
      if (window.ChurchEmbed) {
        resolve();
        return;
      }

      const existing = document.querySelector(`script[src="${CHURCH_CLIENT}"]`);

      if (existing) {
        existing.addEventListener('load', resolve);
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');

      script.src = CHURCH_CLIENT;
      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  async function fetchData(path) {
    const response = await fetch(`${API_HOST}${path}`);

    if (!response.ok) {
      throw new Error(`${path} returned ${response.status}`);
    }

    return response.json();
  }

  // Creates (or reuses) a Shadow DOM on `hostElement` and returns the inner
  // mount point where the component should actually render. Isolates the
  // widget's CSS from the host page in both directions, while still letting
  // inherited properties (font-family, color, line-height, etc.) pass through
  // from the host page automatically — no extra work needed for that part.
  function createShadowMount(hostElement) {
    if (hostElement.shadowRoot) {
      // Already set up (e.g. initialize() ran twice) — reuse it.
      return hostElement.shadowRoot.querySelector('[data-church-mount]');
    }

    const shadowRoot = hostElement.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        display: block;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        line-height: inherit;
      }
      * { box-sizing: border-box; }
    `;
    shadowRoot.appendChild(style);

    if (EMBED_CSS) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = EMBED_CSS;
      shadowRoot.appendChild(link);
    }

    const mountPoint = document.createElement('div');
    mountPoint.setAttribute('data-church-mount', '');
    shadowRoot.appendChild(mountPoint);

    return mountPoint;
  }

  function showError(hostElement, message) {
    // Fallback UI so a failed load isn't just a silent blank div.
    // Rendered into the same shadow mount so it inherits the same reset/fonts.
    const mountPoint = createShadowMount(hostElement);
    mountPoint.innerHTML = '';
    const notice = document.createElement('div');
    notice.setAttribute('data-church-error', '');
    notice.textContent = message;
    mountPoint.appendChild(notice);
  }

  async function loadEvents(element) {
    try {
      const events = await fetchData('/events');
      await loadClient();
      const mountPoint = createShadowMount(element);
      window.ChurchEmbed.mountEvents(mountPoint, events);
    } catch (error) {
      console.error('Church Events failed to load:', error);
      showError(element, 'Events are temporarily unavailable.');
    }
  }

  async function loadGroups(element) {
    try {
      const groups = await fetchData('/groups');
      await loadClient();
      const mountPoint = createShadowMount(element);
      window.ChurchEmbed.mountGroups(mountPoint, groups);
    } catch (error) {
      console.error('Church Groups failed to load:', error);
      showError(element, 'Groups are temporarily unavailable.');
    }
  }

  async function loadCalendar(element) {
    try {
      const events = await fetchData('/calendar');
      await loadClient();
      const mountPoint = createShadowMount(element);
      window.ChurchEmbed.mountCalendar(mountPoint, events);
    } catch (error) {
      console.error('Church Calendar failed to load:', error);
      showError(element, 'Calendar is temporarily unavailable.');
    }
  }

  function initialize() {
    // Note: injectStyles() into document.head is gone — CSS is now injected
    // per-widget into each Shadow DOM instead, in createShadowMount().

    document.querySelectorAll('[data-church-component]').forEach((element) => {
      const type = element.dataset.churchComponent;

      if (type === 'events') {
        loadEvents(element);
      }

      if (type === 'groups') {
        loadGroups(element);
      }

      if (type === 'calendar') {
        loadCalendar(element);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
