/**
 * GoogleCalendarService.js
 * Google Calendar API integration module.
 * SECURITY: Uses OAuth 2.0 implicit grant — no server-side secrets exposed.
 * Allows users to add election dates directly to their Google Calendar.
 */

const GOOGLE_API_KEY    = import.meta.env.VITE_GOOGLE_API_KEY    || '';
const GOOGLE_CLIENT_ID  = import.meta.env.VITE_GOOGLE_CLIENT_ID  || '';
const DISCOVERY_DOC     = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES            = 'https://www.googleapis.com/auth/calendar.events';

let gapiInited = false;
let tokenClient = null;

/**
 * loadGapi()
 * Dynamically loads the Google API client library.
 * Optimized: script tag injected once; subsequent calls resolve immediately.
 */
export async function loadGapi() {
  if (gapiInited) return;
  return new Promise((resolve, reject) => {
    if (window.gapi) { initGapiClient().then(resolve); return; }
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => initGapiClient().then(resolve);
    script.onerror = () => reject(new Error('Failed to load Google API script'));
    document.head.appendChild(script);
  });
}

async function initGapiClient() {
  await new Promise((res) => window.gapi.load('client', res));
  await window.gapi.client.init({
    apiKey: GOOGLE_API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

/**
 * loadGis()
 * Loads the Google Identity Services (GIS) library for OAuth 2.0.
 */
export async function loadGis() {
  if (tokenClient) return;
  return new Promise((resolve, reject) => {
    if (window.google?.accounts) { createTokenClient(); resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => { createTokenClient(); resolve(); };
    script.onerror = () => reject(new Error('Failed to load Google Identity script'));
    document.head.appendChild(script);
  });
}

function createTokenClient() {
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: SCOPES,
    callback: '', // Set dynamically per request
  });
}

/**
 * addEventToCalendar(eventData)
 * Adds an election event to the user's primary Google Calendar.
 * Falls back to a Google Calendar URL opener if API keys aren't configured.
 *
 * @param {{ title: string, date: string, description: string }} eventData
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function addEventToCalendar(eventData) {
  const { title, date, description } = eventData;

  // Fallback: if no API keys are configured, open Google Calendar URL
  if (!GOOGLE_CLIENT_ID || !GOOGLE_API_KEY) {
    return openCalendarFallback(title, date, description);
  }

  try {
    await loadGapi();
    await loadGis();

    return new Promise((resolve) => {
      tokenClient.callback = async (response) => {
        if (response.error) {
          resolve({ success: false, message: `Auth error: ${response.error}` });
          return;
        }

        const event = buildCalendarEvent(title, date, description);

        try {
          await window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
          resolve({ success: true, message: `"${title}" added to your Google Calendar!` });
        } catch (err) {
          resolve({ success: false, message: err.message || 'Failed to create event.' });
        }
      };

      // Request access token — triggers OAuth consent screen
      if (!window.gapi.client.getToken()) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        tokenClient.requestAccessToken({ prompt: '' });
      }
    });
  } catch (err) {
    // Graceful degradation to fallback URL
    return openCalendarFallback(title, date, description);
  }
}

/**
 * buildCalendarEvent()
 * Constructs the Google Calendar API event resource object.
 * Optimized: pure function — no side effects, easily testable.
 */
function buildCalendarEvent(title, date, description) {
  return {
    summary: title,
    description,
    start: { date, timeZone: 'America/New_York' },
    end:   { date, timeZone: 'America/New_York' },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email',  minutes: 24 * 60 * 7 }, // 1 week before
        { method: 'popup',  minutes: 24 * 60 },      // 1 day before
      ],
    },
  };
}

/**
 * openCalendarFallback()
 * Opens a pre-filled Google Calendar event creation URL.
 * Works without API keys — great for quick setup and demos.
 */
function openCalendarFallback(title, date, description) {
  const d = date.replace(/-/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text:   title,
    dates:  `${d}/${d}`,
    details: description,
    sf:     'true',
    output: 'xml',
  });
  const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return { success: true, message: 'Opening Google Calendar in a new tab…' };
}
