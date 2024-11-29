import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import Container from "@mui/material/Container";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getJobs } from "../../../Api/Queries/allJobs.api";
import CategoryCard from "../../../components/CategoryCard";
import categories from "./category";
import { Link } from "react-router-dom";

const Home = () => {
  const [allJobs, setAllJobs] = useState([]);
  const { data: jobData } = useQuery({
    queryKey: ["getJobs"],
    queryFn: getJobs,
  });
  useEffect(() => {
    if (jobData) {
      setAllJobs(jobData.jobs);
    }
  }, [jobData]);
  console.log(allJobs);

  return (
    <>
      <section>
        <div
          className="bg-cover bg-center h-screen position-relative"
          style={{
            backgroundImage:
              "url('http://utouchdesign.com/themes/envato/escort/assets/img/slider_bg.jpg')",
          }}
        >
          {/* Container */}
          <div className="flex flex-col items-center justify-center text-center h-full px-4 max-w-4xl">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Search Between More Than{" "}
              <span className="text-green-500">50,000</span> Open Jobs.
            </h1>

            <div className="flex mt-4 space-x-2 items-center">
              <p className="text-white">Trending Jobs Keywords:</p>
              <div className="flex space-x-2">
                <span className="text-sm  text-green-500 bg-green-100 px-2 py-2 rounded-2xl">
                  Web Designer
                </span>
                <span className="text-sm  text-green-500 bg-green-100 px-2 py-2 rounded-2xl">
                  Web Developer
                </span>
                <span className="text-sm  text-green-500 bg-green-100 px-2 py-2 rounded-2xl">
                  iOS Developer
                </span>
                <span className="text-sm  text-green-500 bg-green-100 px-2 py-2 rounded-2xl">
                  Android Developer
                </span>
              </div>
            </div>

            {/* Search Form */}
            <div className="mt-10 flex flex-col md:flex-row bg-white rounded-full p-2 shadow-lg w-full md:w-auto">
              <input
                type="text"
                placeholder="Search Keywords..."
                className="px-4 py-2 rounded-full outline-none w-full md:w-64"
              />
              <select className="px-4 py-2 rounded-full outline-none w-full md:w-40 mt-2 md:mt-0 md:ml-2">
                <option>Location</option>
              </select>
              <select className="px-4 py-2 rounded-full outline-none w-full md:w-40 mt-2 md:mt-0 md:ml-2">
                <option>Category</option>
              </select>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full mt-2 md:mt-0 md:ml-2 hover:bg-green-600">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </section>
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography
          variant="h4"
          textAlign={"center"}
          fontFamily={"sans-serif"}
          color={"#334E65"}
          my={4}
          fontWeight={"bold"}
        >
          Recent Jobs
        </Typography>{" "}
        <Grid container spacing={6} mt={1} mb={8}>
          {allJobs &&
            allJobs.splice(0, 8).map((job) => (
              <Grid
                item
                xs={3}
                key={job._id}
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
              >
                <Card job={job} />
              </Grid>
            ))}
        </Grid>
        <Box display="flex" justifyContent="center">
          <Button
            component={Link}
            to="/jobs"
            sx={{ textTransform: "uppercase", bgcolor: "#26ae61" }}
            variant="contained"
          >
            Browse All Jobs
          </Button>
        </Box>
      </Container>
      <Box sx={{ bgcolor: "#FAF8FB", py: 4 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign={"center"}
            fontFamily={"sans-serif"}
            color={"#334E65"}
            my={4}
            fontWeight={"bold"}
          >
            Job Categories
          </Typography>{" "}
          <Box width={"800px"} mx={"auto"}>
            <Typography variant="body1" textAlign="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              vel suscipit quia quae possimus ad nostrum, officiis eaque quidem
              molestias illum sequi dolores deleniti quaerat itaque neque fuga
              aliquam rerum excepturi. Placeat vitae minima eos in! Inventore
              corrupti hic repellat.
            </Typography>
          </Box>
          <Grid container spacing={6} my={1} mb={8}>
            {categories.map((category) => (
              <Grid
                item
                xs={3}
                key={category.name}
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
              >
                <CategoryCard category={category} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center">
            <Button
              component={Link}
              to="/jobs"
              sx={{ textTransform: "uppercase", bgcolor: "#26ae61" }}
              variant="contained"
            >
              Browse All Categories
            </Button>
          </Box>
        </Container>
      </Box>
      <Box>
        <div className="relative h-72">
          <div className="bg-[#1FB650] absolute inset-0 z-0 flex justify-center items-center">
            <div className="w-3/5 text-center text-white">
              <Typography
                variant="h4"
                textAlign={"center"}
                fontFamily={"sans-serif"}
                my={2}
                fontWeight={"bold"}
              >
                Subscribe Our Newsletter!
              </Typography>{" "}
              <Typography variant="body1" mb={4}>
                Lorem Ipsum is simply dummy text printing and type setting
                industry Lorem Ipsum been industry standard dummy text ever
                since when unknown printer took a galley.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 rounded-md w-80 text-gray-800 "
                />
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "uppercase",
                    borderColor: "white",
                    bgColor: "#1FB650",
                    color: "#fff",
                    mx: 1,
                    p: "11px 20px",
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </div>
          </div>
          <img
            src="http://utouchdesign.com/themes/envato/escort/assets/img/bg-new.png"
            alt=""
            className="h-full w-full absolute inset-0 z-10 opacity-100"
          />
        </div>
      </Box>
    </>
  );
};

export default Home;
