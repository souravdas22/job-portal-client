import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Optional, for user feedback
import { useMutation } from "react-query";
import { login } from "../../../Api/Queries/login.api";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("profile", data.user.profile_img);
      navigate('/home')
    },
  });

  const validation = () => {
    let errors = {};

    if (!user.email) {
      errors.email = "Email is required";
    }
    if (!user.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const postUserData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (value.length === 0) {
      setError({
        ...error,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      setError({ ...error, [name]: "" });
    }
  };

  const submitInfo = async (e) => {
    e.preventDefault();
    const formErrors = validation();
    setError(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = {
        email: user.email,
        password: user.password,
      };


      try {
        mutate(formData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form max-h-[70vh]">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center mt-5">
              <h4 className="mt-1 mb-5 pb-1">You are Welcome !!</h4>
            </div>

            <p>Please login to your account</p>

            <form onSubmit={submitInfo}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                name="email"
                value={user.email}
                onChange={postUserData}
              />
              {error.email && (
                <small className="text-danger">{error.email}</small>
              )}

              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                value={user.password}
                onChange={postUserData}
              />
              {error.password && (
                <small className="text-danger">{error.password}</small>
              )}

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
                  Sign in
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
