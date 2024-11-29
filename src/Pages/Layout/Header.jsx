import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { profile_pic } from "../../helper/axiosInstance";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
  const navigate = useNavigate()
  const [username,setUsername] = useState("")
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    localStorage.removeItem('username')
    toast.success('logout successfully')
    navigate('/')
  }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
  };
  
  useEffect(() => {
    setUsername( localStorage.getItem("username"));
  },[username])
  const profile = localStorage.getItem('profile');

  return (
    <nav className="bg-[#262626] p-4">
      <div className="container-xl max-w-[73rem] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-green-400 text-2xl font-bold flex items-center mr-7 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zM12 16v4M9.7 7.3a6 6 0 110 8.4 6 6 0 010-8.4z"
              />
            </svg>
            Escort
          </div>
          <div className="flex items-center space-x-6 mx-5">
            <Link to="/home" className="text-white hover:text-gray-300">
              Home
            </Link>

            <Link to="/jobs" className="text-white hover:text-gray-300">
              Jobs
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>

        {localStorage.getItem("token") ? (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              sx={{
                bgcolor: "#1FB650",
                padding: "6px 5px",
                fontSize: "14px",
                color: "white",
                borderRadius: "7px",
                "&:hover": {
                  bgcolor: "#17A549", // Slightly darker shade for hover effect
                },
              }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Avatar
                src={profile_pic(profile)}
                sx={{ height: "30px", mx: 1 }}
              />
              <span className="capitalize"> {username && username}</span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/applications"
              >
                My Applicaitons
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to={"/"}>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zM12 16v4M9.7 7.3a6 6 0 110 8.4 6 6 0 010-8.4z"
                  />
                </svg>
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12v-2c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2zM16 20v-4M7.7 5.3a6 6 0 110 13.4 6 6 0 010-13.4z"
                  />
                </svg>
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
