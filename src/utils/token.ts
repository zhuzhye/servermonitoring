export function getToken() {
  return sessionStorage.getItem("token");
}

export function checkHaveToken() {
  return getToken();
}

export function setToken(token: string) {
  sessionStorage.setItem("token", token);
}

export function cleanToken() {
  sessionStorage.removeItem("token");
}
