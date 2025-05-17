import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  async function signUpSubmited(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const firstName = event.target[1].value;
    const lastName = event.target[2].value;
    const password = event.target[3].value;
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
  }
  return (
    <div className="login-container">
      <form onSubmit={signUpSubmited}>
        <label>Username</label>
        <input placeholder="your username here"></input>
        <label>Firstname</label>
        <input placeholder="your firstname here"></input>
        <label>Lastname</label>
        <input placeholder="your lastname here"></input>
        <label>Password</label>
        <input placeholder="your password here" type="password"></input>
        <button>Submit</button>
      </form>
      <div className="login-info">
        Already have an accout? <a href="/">Sign In</a>
      </div>
    </div>
  );
}
