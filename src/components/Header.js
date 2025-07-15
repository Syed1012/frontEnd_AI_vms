import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import "../styles/Header.css";
import logo from "../resources/logo.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const decodedToken = jwtDecode(token);
          setUserRole(decodedToken?.role || null);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

    // // New effect to handle toast when login state changes
    // useEffect(() => {
    //   if (isLoggedIn) {
    //     toast.success("Logged In.", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //     });
    //   }
    // }, [isLoggedIn]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleHomeClick = () => {
    navigate(
      isLoggedIn ? (userRole === 1 ? "/dashboard" : "/user-dashboard") : "/"
    );
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProtectedLink = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="header-container"
      style={{ borderRadius: "40px", marginTop: "30px" }}
    >
      <nav className="nav-links">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-img"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
          <h1
            onClick={handleLogoClick}
            style={{
              color: "black",
              fontFamily: "Times New Roman",
              fontStyle: "italic",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            AI Vehicle Management System
          </h1>
        </div>
        <div>
          <button
            onClick={handleHomeClick}
            style={{
              fontFamily: "Times New Roman",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontSize: "x-large",
              fontWeight: "bold",
            }}
          >
            Home
          </button>
          <Link to="/features" style={{ fontFamily: "Times New Roman" }}>
            Features
          </Link>

          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="dropbtn"
                style={{ fontFamily: "Times New Roman" }}
              >
                Booking
              </button>
              <div className="dropdown-content">
                <button onClick={() => handleProtectedLink("/booking-options")}>
                  Rent Vehicle
                </button>
                <button onClick={() => handleProtectedLink("/registervehicle-options")}>
                  Register Vehicle
                </button>
                <button onClick={() => handleProtectedLink("/maintenance")}>
                  Maintenance
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleProtectedLink("/booking")}
              style={{ fontFamily: "Times New Roman" }}
            >
              Booking
            </button>
          )}

          {isLoggedIn && userRole === 1 && (
            <div className="dropdown">
              <button
                className="dropbtn"
                style={{ fontFamily: "Times New Roman" }}
              >
                Services
              </button>
              <div className="dropdown-content">
                <Link to="/vehicle-management">Manage Vehicles</Link>
                <Link to="/vehicle-maintenance">Maintenance</Link>
                <Link to="/reports">Reports</Link>
              </div>
            </div>
          )}

          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="dropbtn"
                style={{ fontFamily: "Times New Roman" }}
              >
                Profile
              </button>
              <div className="dropdown-content">
                <Link to="/profile">Edit Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" style={{ fontFamily: "Times New Roman" }}>
              Login/Signup
            </Link>
          )}
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default Header;
