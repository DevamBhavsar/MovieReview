import { jwtDecode } from "jwt-decode";
class TokenService {
  set token(token) {
    console.log("Token stored:", token);
    localStorage.setItem("token", token);
  }

  get token() {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token);
    return token;
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }

    // decode the token
    const decodedToken = jwtDecode(token);

    // check expiry date
    const currentTime = Date.now() / 1000;
    const isTokenExpired = decodedToken.exp < currentTime;

    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }

    console.log("Token validity:", !isTokenExpired);
    return !isTokenExpired;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles() {
    const token = this.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }
}

export default TokenService;
