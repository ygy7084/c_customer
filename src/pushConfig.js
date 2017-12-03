let endPoint;
let key;
let authSecret;

export function set(entry, value) {
  switch (entry) {
    case 'endPoint': endPoint = value; break;
    case 'key': key = value; break;
    case 'authSecret': authSecret = value; break;
    default: break;
  }
}
export function get(entry) {
  switch (entry) {
    case 'endPoint': return endPoint;
    case 'key': return key;
    case 'authSecret': return authSecret;
    default: return undefined;
  }
}
