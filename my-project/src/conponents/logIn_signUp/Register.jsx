import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Lra.css"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const navigate = useNavigate();

  //check
  useEffect(() => {
    setIsValidEmail(validateEmail(email));
    setIsValidPassword(validatePassword(password));
    setIsValidConfirmPassword(
      validateConfirmPassword(confirmPassword, password)
    );
  }, [email, password, confirmPassword]);

  // Kiểm tra eamil nhập vào đã tồn tại trong db chưa
  const checkExitsEmail = async (email) => {
    let response = await axios.get(
      `http://localhost:8000/users?email=${email}`
    );
    return response.data.length > 0;
  };

  // Kiểm tra định dạng email
  const validateEmail = (value) => {
    if (!value) {
      return true;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    if (!value) {
      return true;
    }
    return value.length >= 8;
  };

  const validateConfirmPassword = (value, passwordValue) => {
    if (!value) {
      return true;
    }
    return value === passwordValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isExitsEmail = await checkExitsEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(
      confirmPassword,
      password
    );

    if (isExitsEmail) {
      alert("Cannot do this. Check your email !");
    }

    setIsValidEmail(isEmailValid);
    setIsValidEmail(checkExitsEmail(email));
    setIsValidPassword(isPasswordValid);
    setIsValidConfirmPassword(isConfirmPasswordValid);

    if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      !isExitsEmail
    ) {
      await axios
        .post("http://localhost:8000/users", {
          email: email,
          password: password,
          permission: "user",
          status: 1,
        })
        .then((response) => {
          if (response.request.status === 201) {
            alert("Register succes !");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="containerRegister">
      <div className="back">
        <Link to="/">Back to home</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formRegister">
          <h3>Register</h3>
          <div className="registerGroup">
            <label htmlFor="nameInput">Email :</label>
            <input
              placeholder="Your email..."
              type="text"
              className={`formInput ${isValidEmail ? "" : "invalid"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail && (
              <span className="errorMessage">* Invalid email!</span>
            )}
          </div>
          <div className="registerGroup">
            <label htmlFor="nameInput">Password :</label>
            <input
              placeholder="Your password..."
              type="password"
              className={`formInput ${isValidPassword ? "" : "invalid"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isValidPassword && (
              <span className="errorMessage">
                * Password needs at least 8 characters!
              </span>
            )}
          </div>
          <div className="registerGroup">
            <label htmlFor="nameInput">Re-enter password :</label>
            <input
              placeholder="Please re-enter password..."
              type="password"
              className={`formInput ${isValidConfirmPassword ? "" : "invalid"}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isValidConfirmPassword && (
              <span className="errorMessage">* Password incorrect!</span>
            )}
          </div>
          <div className="registerButton">
            <button type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;
