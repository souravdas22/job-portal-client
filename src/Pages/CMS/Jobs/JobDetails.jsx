import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { useQuery } from "react-query";
import { getJobDetails } from "../../../Api/Queries/jobdetails.api";
import { Link, useParams } from "react-router-dom";
import { product_img } from "../../../helper/axiosInstance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState("");
  const { data: jobData } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: async () => {
      try {
        const result = await getJobDetails(id);
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
  });
  useEffect(() => {
    if (jobData) {
      setJob(jobData.jobs);
    }
  }, [jobData]);
  return (
    <>
      <Box>
        <div className="banner relative">
          <img
            className="h-44 w-full object-cover brightness-50"
            src="http://utouchdesign.com/themes/envato/escort/assets/img/single_page_header.png"
            alt="banner"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-white text-2xl font-bold">Job Details</h1>
            <nav aria-label="Breadcrumb">
              <ul className="flex space-x-2 text-white">
                <Link to="/home" className="text-white">
                  Home
                </Link>

                <span>»</span>

                <Link to="/jobs" className="text-white">
                  Browse Jobs
                </Link>
                <span>»</span>
                <Link to={`/job/${id}`} className="text-white">
                  Job Details
                </Link>
              </ul>
            </nav>
          </div>
        </div>
        <Container sx={{ mt: 8, py: 2 }}>
          <Grid container sx={{ gap: 4 }}>
            <Grid
              item
              xs={8}
              md={8}
              sx={{
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                height: "330px",
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      borderRight: "1px solid #d1d5db",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                    my={4}
                  >
                    <img
                      src={product_img(job.image)}
                      alt="logo"
                      className="h-28 w-28 rounded-full"
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        bgcolor: "#26AE6133",
                        color: "#26AE61",
                        padding: "5px 12px",
                        fontWeight: 600,
                        borderRadius: "7px",
                      }}
                    >
                      {job.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      textTransform={'uppercase'}
                    >
                      {job.company}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#1FB650",
                        padding: "8px 30px",
                        fontSize: "14px",
                      }}
                    >
                      APPLY NOW
                    </Button>{" "}
                  </Box>
                </Grid>
                <Grid item xs={8} p={2} my={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography variant="body1" my={2}>
                        <AccountBalanceWalletIcon /> Salary:{" "}
                      </Typography>
                      <Typography variant="body1" my={2} >
                        <CalendarTodayIcon /> Job Type:
                      </Typography>
                      <Typography variant="body1" my={2}>
                        <GroupIcon /> Vaccancies:
                      </Typography>
                      <Typography variant="body1" my={2}>
                        <TipsAndUpdatesIcon /> Skills:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} px={2}>
                      <Typography variant="body1" my={2}>
                        {job.salary}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          bgcolor:
                            job.jobType === "full-time"
                              ? "#26AE6133"
                              : "#FEB8011A",
                          color:
                            job.jobType === "full-time" ? "#26AE61" : "#FEB801",
                          padding: "3px 5px",
                          borderRadius: "7px",
                          display: "inline-block",
                          textTransform: "capitalize",
                        }}
                      >
                        {job.jobType}
                      </Typography>
                      <Typography variant="body1" mt={"15px"} mb={1}>
                        {job.vaccancies}
                      </Typography>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        mt={2}
                      >
                        {job.skills?.map((skill) => (
                          <Typography
                            variant="body2"
                            sx={{
                              bgcolor: "#26AE6133",
                              color: "#26AE61",
                              padding: "3px 7px",
                              borderRadius: "7px",
                            }}
                            key={skill}
                          >
                            {skill}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3.5}
              sx={{
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                height: "330px",
                overflow: "hidden",
              }}
            >
              <Box
                px={1}
                py={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  px: 2,
                  bgcolor: "gray",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#fff" }}
                >
                  Location
                </Typography>
              </Box>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  color: "#334e6f",
                  my: 4,
                  mx: 3,
                  textAlign: "center",
                  px: 2,
                }}
              >
                <span className="bg-[#26ae61] text-white p-1 rounded-full">
                  <LocationOnOutlinedIcon />
                </span>{" "}
                {job.location}
              </Typography>

              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  color: "#fff",
                  bgcolor: "gray",
                  px: 4,
                  py: 2,
                  textAlign: "center",
                }}
              >
                Category
              </Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "#334e6f", my: 2, mx: 3, textAlign: "center" }}
              >
                {job.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            my={5}
            sx={{
              border: "1px solid #d1d5db",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              height: "250px",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                color: "#fff",
                bgcolor: "#43484e",
                px: 4,
                py: 2,
                textAlign: "center",
              }}
            >
              Job Description
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#334e6f", my: 2, mx: 3, textAlign: "start" }}
            >
              {job.description}
            </Typography>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default JobDetails;
