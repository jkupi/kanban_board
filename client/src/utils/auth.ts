import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) {
        return true;
      }
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  getToken(): string | null {
    // return the token
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // set the token to localStorage
    // redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // remove the token from localStorage
    // redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
