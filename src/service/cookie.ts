export function setToken(token: string) {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // token有效时间一个月
  document.cookie = `token=${token}; expires=${date.toUTCString()}`;
}

export function getToken(): string {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf('token') === 0) {
      return cookie.substring(6, cookie.length);
    }
  }
  return '';
}
