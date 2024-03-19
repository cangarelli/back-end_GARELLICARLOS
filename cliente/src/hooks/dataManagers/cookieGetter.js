function cookieGetter(cookieString, cookieName) {
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === cookieName) {
      return value;
    }
  }
  return null;
}
export default cookieGetter;
