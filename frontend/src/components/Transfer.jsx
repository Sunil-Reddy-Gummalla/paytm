import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Transfer() {
  const location = useLocation();
  const toUser = location.state?.user;
    const navigate = useNavigate();
  async function transferMoney(event) {
    event.preventDefault();
    const amount = event.target[0].value;
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: toUser._id,
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(response.status === 200) {
        toast(response.data.message);
        setTimeout(() => {
            navigate('/dashboard');

        }, 3000)
    }
  }
  return (
    <>
    <ToastContainer />
    <div className="login-container">
      <form onSubmit={transferMoney}>
        <h1>Send Money</h1>
        <div> Sending To: {toUser.firstName}  {toUser.lastName}</div>
        <label>Amount</label>
        <input placeholder="amount.." type="number"></input>
        <button>Transfer</button>
      </form>
    </div>
    </>

  );
}
