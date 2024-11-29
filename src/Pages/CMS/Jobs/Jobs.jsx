import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getJobs } from "../../../Api/Queries/allJobs.api";
import axiosInstance, { product_img } from "../../../helper/axiosInstance";
import { getCategories } from "../../../Api/Queries/getCategories.api";
import { toast } from "react-toastify";

export default function Jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [originalJobs, setOriginalJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobcategories, setJobCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: jobData } = useQuery({
    queryKey: ["getJobs"],
    queryFn: getJobs,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  useEffect(() => {
    if (categories) {
      setJobCategories(categories?.categories);
    }
  }, [categories]);
  // filter by category
  const filterByCategory = async (category) => {
     if (category.length === 0) {
       setAllJobs(originalJobs);
       return;
     }
    try {
      const response = await axiosInstance.get(
        `/job/category?category=${category}`
      );
      setAllJobs(response?.data?.data);
      return response?.data;
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    filterByCategory(selectedCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);
// filter by category ends
  useEffect(() => {
    if (jobData) {
      setAllJobs(jobData.jobs);
      setOriginalJobs(jobData.jobs);
    }
  }, [jobData]);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  // Search and filter functionality
  useEffect(() => {
    const handleSearch = () => {
      let filteredJobs = originalJobs;

      if (searchTerm !== "") {
        filteredJobs = filteredJobs.filter((job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (location) {
        filteredJobs = filteredJobs.filter((job) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      setAllJobs(filteredJobs);
    };

    handleSearch();
  }, [searchTerm, location, originalJobs]);

  // Calculate current jobs to be displayed based on pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setSelectedCategories((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value)
    );
  };
  const [selectedSalary, setSelectedSalary] = useState("");


   const handleClearSelection = () => {
     setSelectedSalary(""); // Clear the selected radio
  };
  
  const filterBySalary = async (salary) => {
      if (salary.length === 0) {
        setAllJobs(originalJobs);
        return;
      }
     try {
       const response = await axiosInstance.get(
         `/job/salary?salary=${salary}`
       );
       setAllJobs(response?.data?.data);
       return response?.data;
     } catch (error) {
       toast.error(error.message);
     }
   };
   useEffect(() => {
     filterBySalary(selectedSalary);
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedSalary]);
  
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);

  // filter by job type
   const handleJobTypeChange = (event) => {
     const { checked, value } = event.target;
     let updatedJobs;

     if (checked) {
       setSelectedJobTypes([...selectedJobTypes, value]);
       updatedJobs = originalJobs.filter((job) =>
         [...selectedJobTypes, value].includes(job.jobType)
       );
     } else {
       const updatedSelected = selectedJobTypes.filter(
         (type) => type !== value
       );
       setSelectedJobTypes(updatedSelected);
       updatedJobs = originalJobs.filter((job) =>
         updatedSelected.includes(job.jobType)
       );
     }

     setAllJobs(updatedJobs.length > 0 ? updatedJobs : originalJobs);
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
          <h1 className="text-white text-2xl font-bold">Browse Jobs</h1>
          <nav aria-label="Breadcrumb">
            <ul className="flex space-x-2 text-white">
              <Link to="/home" className="text-white">
                Home
              </Link>

              <span>»</span>

              <Link to="/jobs" className="text-white">
                Browse Jobs
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <Container maxWidth="lg" sx={{ mt: 9 }}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={3}
            data-aos="fade-right"
            data-aos-offset="400"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            {/* Search Div */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                p: "20px",
                borderRadius: "10px",
                margin: "20px 0",
              }}
            >
              <form
                action=""
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Enter company name..."
                  className="p-3 rounded-md w-full text-gray-800 border-2"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="p-3 rounded-md w-full text-gray-800 border-2"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </form>
            </Box>
            {/* Salary Filter */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                p: "20px",
                borderRadius: "10px",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"center"}
                fontFamily={"sans-serif"}
                color={"#334E65"}
                fontWeight={"bold"}
              >
                Offered Salary
              </Typography>
              <hr />
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="offered salary"
                  name="offeredSalary"
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                >
                  <FormControlLabel
                    value={30000}
                    control={<Radio />}
                    label="More than 30000"
                  />
                  <FormControlLabel
                    value={70000}
                    control={<Radio />}
                    label="More than 70000"
                  />
                  <FormControlLabel
                    value={90000}
                    control={<Radio />}
                    label="90000 and above"
                  />
                  <FormControlLabel
                    value={110000}
                    control={<Radio />}
                    label="110000 and above"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                variant="outlined"
                color="success"
                onClick={handleClearSelection}
              >
                Clear Selection
              </Button>
            </Box>

            {/* category filter      */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                p: "20px",
                borderRadius: "10px",
                mt: 3,
              }}
            >
              <Typography
                variant="h6"
                textAlign={"center"}
                fontFamily={"sans-serif"}
                color={"#334E65"}
                fontWeight={"bold"}
              >
                Categories
              </Typography>
              <hr />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {jobcategories &&
                  jobcategories.map((category) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={category}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={category}
                      key={category}
                    />
                  ))}
              </Box>
            </Box>
            {/* Job Type */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "1px solid #d1d5db",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                p: "20px",
                borderRadius: "10px",
                margin: "20px 0",
              }}
            >
              <Typography
                variant="h6"
                textAlign={"center"}
                fontFamily={"sans-serif"}
                color={"#334E65"}
                fontWeight={"bold"}
              >
                Job Type
              </Typography>
              <hr />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="full-time"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Full Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="part-time"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Part Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="internship"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Internship"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  fontFamily={"sans-serif"}
                  color={"#334E65"}
                  my={4}
                  fontWeight={"bold"}
                >
                  {allJobs.length} Jobs & Vacancies
                </Typography>
                {allJobs.length === 0 && (
                  <Box mt={8}>
                    <Typography variant="h6" mt={7}>
                      No Results Found
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Typography variant="body1">Sort By</Typography>

                  <FormControl sx={{ minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-label">
                      Jobs Per Page
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={jobsPerPage}
                      id="demo-simple-select"
                      label="Jobs Per Page"
                      onChange={(e) => setJobsPerPage(e.target.value)}
                    >
                      <MenuItem value={5}>5 per Page</MenuItem>
                      <MenuItem value={6}>10 per Page</MenuItem>
                      <MenuItem value={8}>15 per Page</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {currentJobs &&
                currentJobs.map((job) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      border: "1px solid #d1d5db",
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      p: "20px",
                      borderRadius: "10px",
                      margin: "20px 0",
                      width: "100%",
                    }}
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="100"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="true"
                    key={job._id}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box display="flex" alignItems="center" gap="20px">
                        <img
                          src={product_img(job.image)}
                          alt="Job company logo"
                          className="h-14 rounded-full"
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ color: "#334E65" }}
                          >
                            {job.company}
                          </Typography>
                          <Typography variant="body1">{job.title}</Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap="10px">
                        <Typography variant="body2">Vacancies:</Typography>
                        <Typography variant="body2">
                          {job.vaccancies}
                        </Typography>
                      </Box>
                    </Box>
                    <hr />
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="30px"
                          my={2}
                        >
                          <Typography>Job Type:</Typography>
                          <Typography textTransform="capitalize">
                            {job.jobType}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          my={2}
                        >
                          <Typography mr={5}>Skills:</Typography>
                          {job.skills.map((skill) => (
                            <span
                              className="bg-[#1FB6501F] text-[#1FB650] text-xs px-2 py-2 rounded-lg uppercase font-bold"
                              key={skill}
                            >
                              {skill}
                            </span>
                          ))}
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="30px"
                          my={2}
                        >
                          <Typography>Location:</Typography>
                          <Typography>{job.location}</Typography>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        gap="10px"
                        px="20px"
                      >
                        <Button
                          variant="contained"
                          component={Link}
                          to={`/applicaiton-form/${job._id}`}
                          sx={{ bgcolor: "#1FB650", letterSpacing: "2px" }}
                        >
                          APPLY NOW
                        </Button>
                        <Button
                          component={Link}
                          to={`/job/${job._id}`} // Corrected the Link path
                          variant="contained"
                          sx={{
                            bgcolor: "#eaedf3",
                            letterSpacing: "2px",
                            color: "#334e6f",
                          }}
                        >
                          VIEW JOB
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Grid>
            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Pagination
                count={Math.ceil(allJobs.length / jobsPerPage)}
                page={currentPage}
                onChange={paginate}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
