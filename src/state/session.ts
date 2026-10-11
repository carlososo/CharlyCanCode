/** ponytail: vive en memoria. Se pierde al recargar, que es cuando el hello debe volver. */
let introduced = false

export function hasIntroduced() {
  return introduced
}

export function markIntroduced() {
  introduced = true
}
