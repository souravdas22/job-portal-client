import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { register } from "../../../Api/Queries/register.api";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [img, setImg] = useState({});
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
       navigate("/");
      localStorage.setItem("profile", data.data.profile_pic);
    },
  });

  const validation = () => {
    let error = {};

    if (!user.name) {
      error.name = "Name is Required";
    }
    if (!user.email) {
      error.email = "Email is Required";
    }
    if (!user.password) {
      error.password = "Password is Required";
    }

    return error;
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError({ ...error, img: "Image is required" });
      setImg(null);
    } else {
      setError({ ...error, img: "" });
      setImg(file);
    }
  };

  const submitInfo = async (e) => {
    e.preventDefault();
    const formErrors = validation();
    setError(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("mobile", "878767676");
      formData.append("profile_img", img);

      console.log([...formData]); 

      try {
        mutate(formData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const postUserData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (value.length === 0) {
      setError({
        ...error,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is Required`,
      });
    } else {
      setError({ ...error, [name]: "" });
    }
  };

  return (
    <MDBContainer className="my-2 gradient-form max-h-[80vh]">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center mt-4">
              <h4 className="mt-1 mb-5 pb-1 capitalize">
                It's Time To Find a Job!!
              </h4>
            </div>

            <p>Create your account</p>

            <form onSubmit={submitInfo}>
              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                id="form1"
                type="text"
                name="name"
                value={user.name}
                onChange={postUserData}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form2"
                type="email"
                name="email"
                value={user.email}
                onChange={postUserData}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form3"
                type="password"
                name="password"
                value={user.password}
                onChange={postUserData}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                id="form4"
                type="password"
              />
              <MDBInput
                wrapperClass="mb-4"
                id="formProfileImage"
                type="file"
                name="profile_img"
                onChange={imageChange}
              />

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  className="mb-4 w-100 gradient-custom-2"
                  type="submit"
                  disabled={isPending}
                >
                  Register
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Already have an account? <Link to="/">Sign in</Link>
                </a>
              </div>
            </form>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">Be a part of our community</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
