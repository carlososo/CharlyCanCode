/** De 7:00 a 18:59 es de día. Antes de las 7 y desde las 19 es de noche. */
export function isNight(date = new Date()) {
  const hour = date.getHours()
  return hour >= 19 || hour < 7
}

let chosen: boolean | null = null

export function roomIsDark() {
  if (chosen === null) chosen = isNight()
  return chosen
}

export function setRoomDark(dark: boolean) {
  chosen = dark
}

function nightAt(hour: number) {
  return hour >= 19 || hour < 7
}

if (nightAt(19) !== true || nightAt(7) !== false || nightAt(6) !== true || nightAt(18) !== false) {
  throw new Error('daylight')
}
