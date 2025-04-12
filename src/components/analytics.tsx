"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  publicationId: string;
  postId: string;
};

export const GA_TRACKING_ID = "G-72XG3F8LNJ"; // This is Hashnode's GA tracking ID
const isProd = process.env.NEXT_PUBLIC_MODE === "production";

export default function Analytics({ publicationId, postId }: Props) {
  const _sendPageViewsToHashnodeGoogleAnalytics = () => {
    // @ts-expect-error: TypeScript does not recognize the 'gtag' method on the 'window' object
    window.gtag("config", GA_TRACKING_ID, {
      transport_url: "https://ping.hashnode.com",
      first_party_collection: true,
    });
  };

  const _sendViewsToHashnodeInternalAnalytics = async () => {
    // Send to Hashnode's own internal analytics
    const event: Record<string, string | number | object> = {
      event_type: "pageview",
      time: new Date().getTime(),
      event_properties: {
        hostname: window.location.hostname,
        url: window.location.pathname,
        eventType: "pageview",
        publicationId,
        dateAdded: new Date().getTime(),
        referrer: window.document.referrer,
      },
    };

    let deviceId = Cookies.get("__amplitudeDeviceID");
    if (!deviceId) {
      deviceId = uuidv4();
      Cookies.set("__amplitudeDeviceID", deviceId, {
        expires: 365 * 2,
      }); // expire after two years
    }

    event["device_id"] = deviceId;

    await fetch(`/ping/data-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: [event] }),
    });
  };

  function _sendViewsToAdvancedAnalyticsDashboard() {
    const data = {
      publicationId,
      postId,
    };

    if (!publicationId) {
      console.warn("Publication ID is missing; could not send analytics.");
      return;
    }

    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) {
      return;
    }

    const isLocalhost = window.location.hostname === "localhost";
    if (isLocalhost) {
      console.warn("Analytics API call is skipped because you are running on localhost; data:", data);
      return;
    }

    const event = {
      // timestamp will be added in API
      payload: {
        publicationId,
        postId: postId || null,
        url: window.location.href,
        referrer: document.referrer || null,
        language: navigator.language || null,
        screen: `${window.screen.width}x${window.screen.height}`,
      },
      type: "pageview",
    };

    const blob = new Blob(
      [
        JSON.stringify({
          events: [event],
        }),
      ],
      {
        type: "application/json; charset=UTF-8",
      },
    );

    let hasSentBeacon = false;
    try {
      if (navigator.sendBeacon) {
        hasSentBeacon = navigator.sendBeacon(`/api/analytics`, blob);
      }
    } catch (_error) {
      // do nothing; in case there is an error we fall back to fetch
    }

    if (!hasSentBeacon) {
      fetch(`/api/analytics`, {
        method: "POST",
        body: blob,
        credentials: "omit",
        keepalive: true,
      });
    }
  }

  useEffect(() => {
    if (!isProd) return;

    _sendPageViewsToHashnodeGoogleAnalytics();
    _sendViewsToHashnodeInternalAnalytics();
    _sendViewsToAdvancedAnalyticsDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
