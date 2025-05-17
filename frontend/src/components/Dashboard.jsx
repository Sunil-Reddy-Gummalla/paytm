import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Install lodash: npm install lodash
import { useNavigate } from "react-router-dom";

const BALANCE_API_URL = "http://localhost:3000/api/v1/account/balance";
const BULK_USERS_API_URL = "http://localhost:3000/api/v1/user/bulk";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBalance() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle case where token is not available (e.g., redirect to sign-in)
          console.error("No token found. Redirect to sign-in.");
          return;
        }
        const response = await axios.get(BALANCE_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    }
    fetchBalance();
  }, []);

  const searchUsers = async (filter) => {
    try {
      const response = await axios.get(
        `${BULK_USERS_API_URL}?filter=${filter}`
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
      // Handle error appropriately
    }
  };

  const sendMoney = (user) => {
    console.log(user);
    navigate('/transfer', { state: { user } });
  }

  const debouncedSearchUsers = debounce((event) => {
    searchUsers(event.target.value);
  }, 300); // 300ms delay

  const usersList = users.map((user) => (
    <div className="user-details" key={user._id}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        {user.firstName} {user.lastName}
      </div>
      <button onClick={() => sendMoney(user)}>Send Money</button>
    </div>
  ));

  return (
    <div className="dashboard-container">
      <section className="header">
        <h1>Payments App</h1>
        <div>
          Hello, User{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </section>

      <section className="balance">Your Balance {balance}</section>

      <section className="users-search">
        <label>Users</label>
        <br />
        <input placeholder="Search Users...." onInput={debouncedSearchUsers} />
      </section>

      <section className="users-list">{usersList}</section>
    </div>
  );
}
