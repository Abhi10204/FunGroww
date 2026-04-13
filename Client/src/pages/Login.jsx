import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST", // ✅ fixed
          headers: {
            "Content-Type": "application/json", // ✅ fixed
          },
          body: JSON.stringify(user),
        }
      );

      const res_data = await response.json(); // ✅ always parse response

      console.log("Login response:", res_data);

      if (response.ok) {
        // ✅ store token
        storeTokenInLs(res_data.token);

        // ✅ reset form
        setUser({
          email: "",
          password: "",
        });

        // ✅ success toast (dynamic)
        toast.success(res_data.message || "Login Successful");

        // ✅ redirect
        navigate("/home");

      } else {
        // ❌ dynamic error from backend
        toast.error(res_data.message || "Invalid credentials");
      }

    } catch (error) {
      console.log("Login error:", error);

      // ❌ server/network error
      toast.error("Server not responding");
    }
  };

  return (
    <section>
      <main>
        <div className="section-login">
          <div className="container-login">
            
            {/* Image */}
            <div className="login-image">
              <img
                src="/images/Login.png"
                alt="login"
                width="500"
                height="500"
              />
            </div>

            {/* Form */}
            <div className="login-form">
              <h1 className="form-heading">Login Form</h1>

              <form onSubmit={handleSubmit}>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Enter email"
                    onChange={handleInput}
                    required
                  />
                </div>

                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Enter password"
                    onChange={handleInput}
                    required
                  />
                </div>

                <br />

                <button type="submit" className="submit-btn">
                  Login
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </section>
  );
};