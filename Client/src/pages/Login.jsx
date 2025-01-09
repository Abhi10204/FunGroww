import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";


export const Login = () =>{
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate  = useNavigate();
    const {storeTokenInLs} = useAuth();
    
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name] : value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const response = await fetch ("http://localhost:5000/api/auth/login",{
            method: "Post",
            headers:{
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(user),
          });

          console.log("Login form",response)

          if (response.ok) {
            const res_data = await response.json();
            storeTokenInLs(res_data.token);

            setUser({
              "email": "",
              "password": "",
              
            });
            navigate ("/home");
            toast.error("Login Sucessful"); 
          }else{
            toast.error("Invalid credentials");
            console.log("Invalid Credential");
          }

        } catch (error) {
          console.log("login",error);
        };
    };
    
    return(
    <>
        
      <section>
        <main>
          <div className="section-login">
            <div className="container-login">
              <div className="login-image ">
                <img
                  src="/images/Login.png"
                  alt="login png"
                  width="500"
                  height="500"
                />
              </div>
               {/* our main registration code   */}
              <div className="login-form">
                <h1 className="form-heading">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      placeholder="email"
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      placeholder="password"
                      onChange={handleInput}
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

    </>
    );
};