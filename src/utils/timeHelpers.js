function parseTimeToMinutes(time) {
  if (!time || typeof time !== 'string') return null;
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

export function getCurrentTimelineIndex(activeDay, timeline) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  if (month !== 4 || day !== Number(activeDay) || !Array.isArray(timeline) || timeline.length === 0) {
    return -1;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let latestIndex = -1;
  for (let i = 0; i < timeline.length; i += 1) {
    const itemMinutes = parseTimeToMinutes(timeline[i]?.time);
    if (itemMinutes !== null && itemMinutes <= currentMinutes) latestIndex = i;
  }
  return latestIndex;
}
