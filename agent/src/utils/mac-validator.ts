
export function isValidMac(mac: string) {
  return !!mac.match(/^\d{2}:\d{2}:\d{2}:\d{2}:\d{2}:\d{2}$/);
}
