(function () {
  const COMPONENT_HOST = 'https://next.techanddevsolutions.com';

  const CALENDAR_API = 'https://api.techanddevsolutions.com/calendar';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.ChurchCalendar) {
        resolve();
        return;
      }

      const script = document.createElement('script');

      script.src = src;

      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  async function loadCalendar(element) {
    try {
      const response = await fetch(CALENDAR_API);

      if (!response.ok) {
        throw new Error(`Calendar API returned ${response.status}`);
      }

      const events = await response.json();

      await loadScript(`${COMPONENT_HOST}/calendar-client.js`);

      window.ChurchCalendar.mountCalendar(element, events);
    } catch (error) {
      console.error('Church Calendar failed to load:', error);
    }
  }

  function loadEvents(element) {
    fetch(`${COMPONENT_HOST}/embed/events`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Events failed to load: ${response.status}`);
        }

        return response.text();
      })
      .then((html) => {
        element.innerHTML = html;
      })
      .catch((error) => {
        console.error('Church Events failed to load:', error);
      });
  }

  function loadGroups(element) {
    fetch(`${COMPONENT_HOST}/embed/groups`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Groups failed to load: ${response.status}`);
        }

        return response.text();
      })
      .then((html) => {
        element.innerHTML = html;
      })
      .catch((error) => {
        console.error('Church Groups failed to load:', error);
      });
  }

  function initialize() {
    document.querySelectorAll('[data-church-component]').forEach((element) => {
      const type = element.dataset.churchComponent;

      if (type === 'calendar') {
        loadCalendar(element);
      }

      if (type === 'events') {
        loadEvents(element);
      }

      if (type === 'groups') {
        loadGroups(element);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
