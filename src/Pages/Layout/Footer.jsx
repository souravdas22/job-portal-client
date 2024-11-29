import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(http://utouchdesign.com/themes/envato/escort/assets/img/city_bg.png)",
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        py: 3,
        mt:5,
        color: "#334e6f", 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
              sx={{ color: "#334e6f" }}
            >
              Escort
            </Typography>
            <Typography
              variant="body2"
              className="mb-4"
              sx={{ color: "#334e6f" }}
            >
              Lorem Ipsum is simply dummy text of printing and type setting
              industry.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
              sx={{ color: "#334e6f" }}
            >
              Job Categories
            </Typography>
            <Link
              
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Work from Home
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Internship Job
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Freelancer Job
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Part Time Job
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Full Time Job
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Job Type
            </Typography>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Create Account
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Career Counseling
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              My Oficina
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              FAQ
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Report a Problem
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Resources
            </Typography>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              My Account
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Support
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              How It Works
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Underwriting
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Employers
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Quick Links
            </Typography>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Jobs Listing
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              About Us
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Contact Us
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              className="block mb-2"
              sx={{ color: "#334e6f",textDecoration:"none" }}
            >
              Term & Condition
            </Link>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <IconButton href="#" sx={{ color: "#334e6f" }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#334e6f" }}>
            <GoogleIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#334e6f" }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#334e6f" }}>
            <InstagramIcon />
          </IconButton>
        </Box>

        <Box textAlign="center" mt={4} sx={{ color: "#334e6f" }}>
          &copy; 2021 All Rights Reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
