import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile_pic } from "../../../helper/axiosInstance";
import { useMutation, useQuery } from "react-query";
import {
  getUserDetails,
  updatePassword,
} from "../../../Api/Queries/userdetails.api";
import { toast } from "react-toastify";

export default function ProfileSettings() {
  const profile = localStorage.getItem("profile");
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });
  const [currentPage, setcurrentPage] = useState("profile");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      try {
        const result = await getUserDetails(token);
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    if (userDetails) {
      setUser({
        name: userDetails.data.name || "",
        email: userDetails.data.email || "",
        mobile: userDetails.data.mobile || "",
        role: userDetails.data.role || "",
      });
      setId(userDetails.data.id);
    }
  }, [userDetails]);
  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success(data.message);
     setcurrentPage('profile')
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      mutate({ user, id });
    } catch (error) {
      console.error(error);
    }
  };

  // update password

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(newPassword);
    const email = user.email;
    const newPass = {
      newPassword: newPassword,
    };
    mutate({ newPass, email });
  };
  return (
    <Box>
      <div className="banner relative">
        <img
          className="h-44 w-full object-cover brightness-50"
          src="http://utouchdesign.com/themes/envato/escort/assets/img/single_page_header.png"
          alt="banner"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-2xl font-bold">Profile Settings</h1>
          <nav aria-label="Breadcrumb">
            <ul className="flex space-x-2 text-white">
              <Link to="/home" className="text-white">
                Home
              </Link>
              <span>»</span>
              <Link to="/profile" className="text-white">
                Profile Settings
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
            >
              <Box
                sx={{
                  border: "1px solid #d1d5db",
                  boxShadow:
                    "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  p: "5px",
                  borderRadius: "10px",
                  margin: "20px 0",
                  width: "70%",
                  height: "70%",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={profile_pic(profile)}
                  alt="Profile Picture"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    width: "100%",
                    textAlign: "center",
                    p: "5px",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" width="100%">
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={() => setcurrentPage("profile")}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={() => setcurrentPage("change-password")}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
          </Grid>
          {currentPage === "profile" ? (
            <Grid item xs={12} sm={8} mt={8}>
              <Box p={2}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={user.email}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Role"
                        variant="outlined"
                        name="role"
                        value={user.role}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid mt={6}>
                    <Button
                      type="submit"
                      fullWidth
                      sx={{
                        bgcolor: "#1FB650",
                        padding: "6px 5px",
                        fontSize: "14px",
                        color: "white",
                        borderRadius: "7px",

                        "&:hover": {
                          bgcolor: "#17A549",
                        },
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                </form>
              </Box>
            </Grid>
          ) : (
            <Grid
              item
              xs={8}
              sx={{
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                p: "5px",
                borderRadius: "10px",
                margin: "80px 0",
              }}
            >
              <form onSubmit={handlePasswordSubmit}>
                <Box
                  display={"flex"}
                  gap={2}
                  p={2}
                  alignItems={"center"}
                  mt={3}
                >
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-3 rounded-md w-full text-gray-800 border-2"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-3 rounded-md w-full text-gray-800 border-2"
                  />
                </Box>
                <Box display={"flex"} justifyContent={"center"} mt={3}>
                  <Button
                    type="submit"
                    sx={{
                      bgcolor: "#1FB650",
                      width: "90%",
                      padding: "6px 5px",
                      fontSize: "14px",
                      color: "white",
                      borderRadius: "7px",
                      "&:hover": {
                        bgcolor: "#17A549",
                      },
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </form>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
