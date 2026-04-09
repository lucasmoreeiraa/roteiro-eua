export function createGoogleMapsSearchLink(location) {
  if (!location) return "#";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

export function createUberLink(location) {
  if (!location) return "#";
  return `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(location)}`;
}

export async function copyText(text) {
  if (!text) return false;
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback silencioso
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}
