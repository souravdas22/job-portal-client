import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../../helper/axiosInstance";
import { toast } from "react-toastify";



export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post(
        "/contact/create",
        formData
      );

      if (response.status === 200) {
        toast.success(response?.data?.message)
        setFormData({ name: "", email: "", subject: "", message: "" }); 
      } else {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-white text-2xl font-bold">Get In Touch</h1>
          <nav aria-label="Breadcrumb">
            <ul className="flex space-x-2 text-white">
              <Link to="/home" className="text-white">
                Home
              </Link>
              <span>»</span>
              <Link to="/applications" className="text-white">
                Contact
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <Container>
        <Box sx={{ flexGrow: 1, p: 2 }} mt={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              data-aos="fade-right"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  margin="normal"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && (
                  <p style={{ color: "green" }}>Message sent successfully!</p>
                )}
              </form>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="2000"
              data-aos-easing="ease-in-out"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.1361617625335!2d76.80935131505213!3d30.699287481650264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feeda49c1c741%3A0xa9012dbf92d1773b!2sChandigarh%20Junction%20railway%20station!5e0!3m2!1sen!2sin!4v1693657282911!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="map"
              ></iframe>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
