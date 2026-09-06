(function () {
  const scriptUrl = document.currentScript?.src;

  const EMBED_CSS = scriptUrl ? new URL('./embed.css', scriptUrl).href : null;

  const API_HOST = 'http://api.techanddevsolutions.com';

  const CHURCH_CLIENT =
    'https://next.techanddevsolutions.com/calendar-client.js';

  function injectStyles() {
    const styleId = 'church-embed-styles';

    // Prevent duplicate injections if the script runs multiple times
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = EMBED_CSS;
      document.head.appendChild(link);
    }
  }

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

  async function loadEvents(element) {
    try {
      const events = await fetchData('/events');

      await loadClient();

      window.ChurchEmbed.mountEvents(element, events);
    } catch (error) {
      console.error('Church Events failed to load:', error);
    }
  }

  async function loadGroups(element) {
    try {
      const groups = await fetchData('/groups');

      await loadClient();

      window.ChurchEmbed.mountGroups(element, groups);
    } catch (error) {
      console.error('Church Groups failed to load:', error);
    }
  }

  async function loadCalendar(element) {
    try {
      const events = await fetchData('/calendar');

      await loadClient();

      window.ChurchEmbed.mountCalendar(element, events);
    } catch (error) {
      console.error('Church Calendar failed to load:', error);
    }
  }

  function initialize() {
    injectStyles();

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
