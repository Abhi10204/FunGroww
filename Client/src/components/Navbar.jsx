import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = ()=>{
    const {isLoggedIn} = useAuth();
    return(
        <>
            <div className="top-banner">
      <div className="container">
        <div className="small-bold-text banner-text">
          🥳Welcome to Fungrow: Connecting talent with opportunities
        </div>
      </div>
    </div>
            <header>
                <div className="container">
                    <div className="logo">
                    <NavLink to="/"><img src="/images/Logo.png" alt="" /></NavLink>
                    
                    </div >
                
                    <nav className="nav">
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li>   
                                <NavLink to="/service">Service</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" className="secondary-button">Post a Job</NavLink>
                            </li>
                            {isLoggedIn ?(
                                <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                            ):(
                                <>
                            <li>
                                <NavLink to="/login" >Login</NavLink>
                            </li>
                                </>
                            )}
                            
                            
                        </ul>
                    </nav>
                </div>
            </header>
           
        </>
    );
};