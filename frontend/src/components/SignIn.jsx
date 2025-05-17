import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();

   async function signInSubmited(event) {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
            username, password
        });
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        }
    }
    return(
        <div className="login-container">
            <form onSubmit={signInSubmited}>
                <label>Username</label>
                <input placeholder="your username here"></input>
                <label>Password</label>
                <input placeholder="your password here" type="password"></input>
                <button>Submit</button>
            </form>
            <div className="login-info">Don't have an accout? <a href="/signup">Sign Up</a></div>
        </div>
    )
}