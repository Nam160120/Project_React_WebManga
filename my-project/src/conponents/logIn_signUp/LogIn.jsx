import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Lra.css";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setUsers(result.data);
  };
  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please enter full login information!");
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      alert("Incorrect email or password!");
      return;
    }

    if (user.status === 0) {
      alert("lock");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.permission === "admin" && user.status === 1) {
      navigate("/");
      console.log(user);
    } else if (user.status === 1) {
      navigate("/");
    }
  };

  return (
    <div className="containerLogin">
      <div className="back">
        <Link to="/">Back to home</Link>
      </div>
      <div className="formLoginContainer">
        <div className="formLogin">
          <h3>Log in</h3>
          <div className="LoginGroup">
            <label htmlFor="nameInput">Email :</label>
            <input
              placeholder="Please enter email..."
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="LoginGroup">
            <label htmlFor="nameInput">Password :</label>
            <input
              placeholder="Please enter password..."
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="registerButton">
            <button onClick={handleLogin}>Log in</button>
          </div>
          <div className="registerLink">
            <p>
              Do you not have an account ?
              <NavLink to="/register">Rigister now</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
