import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Register.css";
import {toast} from "react-toastify";



export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Login Sucessfull")
        const res_data = await response.json();
        storeTokenInLs(res_data.token);

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        navigate("/home");
        toast.error("registration successful")
      } else {
        toast.error("Invalid Credintials")
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.log("Register Error", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="container">
            <div className="image">
              <img
                src="/images/Register.png"
                alt=""
                width="1000"
                height="1000"
              />
            </div>
            <div className="form-section">
              <h1 className="form-heading">Register</h1>
              <form onSubmit={handleSubmit}>
                <div className="username">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={handleInput}
                    value={user.username}
                  />
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    onChange={handleInput}
                    value={user.email}
                  />
                </div>
                <div className="phone">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    placeholder="phone"
                    name="phone"
                    onChange={handleInput}
                    value={user.phone}
                  />
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleInput}
                    value={user.password}
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
