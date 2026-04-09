function hasStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getStoredValue(key, fallback = null) {
  if (!hasStorage()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function setStoredValue(key, value) {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // fallback silencioso
  }
}

export function getStoredJSON(key, fallback = null) {
  const value = getStoredValue(key, null);
  if (value == null) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setStoredJSON(key, value) {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // fallback silencioso
  }
}
