import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Transfer from "./components/Transfer";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/transfer" element={<Transfer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
