import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { getUserDetails } from "../../../Api/Queries/userdetails.api";
import { useNavigate, useParams } from "react-router-dom";
import { sumbitJobApplication } from "../../../Api/Queries/jobApplication.api";
import { toast } from "react-toastify";

export default function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    resume: null,
    coverLetter: "",
  });

  const { data: userDetails, error } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      try {
        const result = await getUserDetails(token);
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: sumbitJobApplication,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/applications");
    },
  });

  useEffect(() => {
    if (userDetails) {
      setUser((prevState) => ({
        ...prevState,
        id: userDetails.data.id || "",
        name: userDetails.data.name || "",
        email: userDetails.data.email || "",
        mobile: userDetails.data.mobile || "",
      }));
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("userId", user.id);
    formData.append("coverLetter", user.coverLetter);
    formData.append("resume", user.resume);
    console.log(formData);
    try {
      mutate(formData);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <Typography color="error">Error fetching user details</Typography>;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" align="center" gutterBottom my={3}>
        Job Application Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              placeholder="Name"
              name="name"
              value={user.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              placeholder="Email"
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
              placeholder="Phone"
              name="mobile"
              value={user.mobile}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ height: "56px", textTransform: "none" }}
            >
              Upload CV
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cover Letter"
              variant="outlined"
              placeholder="Tell something about yourself..."
              name="coverLetter"
              multiline
              rows={4}
              value={user.coverLetter}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ height: "56px", textTransform: "none" }}
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
