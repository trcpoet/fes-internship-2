import { useEffect, useState } from "react";

/**
 * Cache so we don't re-fetch metadata for the same mp3 URL.
 * key: audioUrl
 * value: durationSeconds (number) or NaN
 */
const durationCache = new Map();

function getAudioDuration(audioUrl, timeoutMs = 8000) {
  return new Promise((resolve) => {
    if (!audioUrl) return resolve(NaN);

    const audio = new Audio();
    audio.preload = "metadata";

    const cleanup = () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
      audio.src = "";
    };

    const onLoaded = () => {
      const dur = audio.duration; // seconds
      cleanup();
      resolve(Number.isFinite(dur) ? dur : NaN);
    };

    const onError = () => {
      cleanup();
      resolve(NaN);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);

    audio.src = audioUrl;

    // safety timeout
    setTimeout(() => {
      cleanup();
      resolve(NaN);
    }, timeoutMs);
  });
}

export function useAudioDuration(audioUrl) {
  const [seconds, setSeconds] = useState(() => {
    if (!audioUrl) return NaN;
    return durationCache.get(audioUrl) ?? NaN;
  });

  useEffect(() => {
    let cancelled = false;
    if (!audioUrl) return;

    // cached
    if (durationCache.has(audioUrl)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSeconds(durationCache.get(audioUrl));
      return;
    }

    getAudioDuration(audioUrl).then((dur) => {
      if (cancelled) return;
      durationCache.set(audioUrl, dur);
      setSeconds(dur);
    });

    return () => {
      cancelled = true;
    };
  }, [audioUrl]);

  return seconds; // number (seconds) or NaN
}
