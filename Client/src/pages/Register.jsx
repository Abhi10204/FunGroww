import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Register.css";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

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

    if (loading) return; // ✅ prevent multiple clicks

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const res_data = await response.json();

      console.log("Register response:", res_data);

      if (response.ok) {
        storeTokenInLs(res_data.token);

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        toast.success(res_data.message || "Registration Successful");

        navigate("/home");

      } else {
        // ✅ handles both single & multiple errors
        if (Array.isArray(res_data.message)) {
          res_data.message.forEach((msg) => toast.error(msg));
        } else {
          toast.error(res_data.message || "Registration failed");
        }
      }

    } catch (error) {
      console.log("Register error:", error);
      toast.error("Server not responding");

    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  return (
    <section>
      <main>
        <div className="container">
          
          {/* Image */}
          <div className="image">
            <img
              src="/images/Register.png"
              alt="register"
              width="1000"
              height="1000"
            />
          </div>

          {/* Form */}
          <div className="form-section">
            <h1 className="form-heading">Register</h1>

            <form onSubmit={handleSubmit}>
              
              <div className="username">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleInput}
                  value={user.username}
                  required
                />
              </div>

              <div className="email">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleInput}
                  value={user.email}
                  required
                />
              </div>

              <div className="phone">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone"
                  name="phone"
                  onChange={handleInput}
                  value={user.phone}
                  required
                />
              </div>

              <div className="password">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleInput}
                  value={user.password}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Now"} {/* ✅ UX */}
              </button>

            </form>
          </div>

        </div>
      </main>
    </section>
  );
};