export default function isUrl(sring: string) {
  try {
    new URL(sring);
    return true;
  } catch (_) {
    return false;
  }
}
