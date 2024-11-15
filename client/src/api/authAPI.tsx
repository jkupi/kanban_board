import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // make a POST request to the login route
  try {
    const response = await fetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('login failed miserably');
    }

    const data = await response.json();
    const token = data.token;

    if (token) {
      localStorage.setItem('id_token', token);
    }

    return data;
  } catch (error) {
    console.error("error logging in:", error);
  }
}



export { login };
