import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Grid,
  Box,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllApplications } from "../../../Api/Queries/jobApplication.api";
import axiosInstance, { product_img } from "../../../helper/axiosInstance";
import { toast } from "react-toastify";



export default function EmployeeTable() {
    const [applicaitonData, setApplicaitonData] = useState([]);
     const { data,refetch } = useQuery({
       queryKey: ["applications"],
       queryFn: getAllApplications,
     });
    useEffect(() => {
        if (data) {
            setApplicaitonData(data?.data)
            console.log(data?.data)
        }
    }, [data])

    const deleteApplications = async (id) => {
      try {
          const response = await axiosInstance.get(`/application/delete/${id}`);
          refetch();
        return response?.data;
      } catch (error) {
        toast.error(error.message);
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
          <h1 className="text-white text-2xl font-bold">My Applicaitons</h1>
          <nav aria-label="Breadcrumb">
            <ul className="flex space-x-2 text-white">
              <Link to="/home" className="text-white">
                Home
              </Link>

              <span>»</span>

              <Link to="/applications" className="text-white">
                My Applicaitons
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <Container sx={{ width: "80%", mt: 8 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100 ">
                <TableCell sx={{ color: "#707F8C", fontWeight: 700 }}>
                  Company
                </TableCell>
                <TableCell sx={{ color: "#707F8C", fontWeight: 700 }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "#707F8C", fontWeight: 700 }}>
                  Location
                </TableCell>

                <TableCell sx={{ color: "#707F8C", fontWeight: 700 }}>
                  Posted
                </TableCell>
                <TableCell sx={{ color: "#707F8C", fontWeight: 700 }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "#707F8C", fontWeight: 700 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicaitonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar
                          alt={row.name}
                          src={product_img(row.jobId.image)}
                        />
                      </Grid>
                      <Grid item>
                        <Chip
                          label={row.jobId.company}
                          size="small"
                          sx={{
                            bgcolor: "#26ae6126",
                            color: "#26ae61",
                            fontweight: 600,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{row.jobId.title}</TableCell>

                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <LocationOnIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          {row.jobId.location}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <CalendarTodayIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          {new Date(row.jobId.postedDate).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid item>
                      <Typography
                        variant="body2"
                        sx={{
                          color: row.status === "accepted" ? "green" : "red",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.status}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => deleteApplications(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
