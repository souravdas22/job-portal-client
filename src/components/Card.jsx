import React from 'react'
import { product_img } from '../helper/axiosInstance';
import {  Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Card({job}) {
  return (
    <div className="p-4 shadow-lg w-72 h-80 flex justify-start flex-col items-center space-y-4 rounded-md relative group transition-transform duration-500 ease-in-out hover:scale-95">
      <div className="absolute left-2 top-5">
        <Typography
          variant="body1"
          sx={{
            bgcolor: job.jobType === "full-time" ? "#26AE6133" : "#FEB8011A",
            color: job.jobType === "full-time" ? "#26AE61" : "#FEB801",
            padding: "3px 6px",
            borderRadius: "7px",
            textTransform: "capitalize",
            fontSize: "13px",
            textAlign: "left",
          }}
        >
          {job.jobType}
        </Typography>
      </div>

      <div className="group">
        <img
          src={product_img(job.image)}
          alt="logo"
          className="h-20 rounded-full border border-solid border-[#334e6f] border-opacity-40 shadow-sm transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="flex justify-center flex-col items-center space-y-6">
        <div className="text-center">
          <h3 className="font-semibold text-[#334e6f] text-lg">{job.title}</h3>
          <h2 className="font-semibold text-[#334e6f] text-lg uppercase">
            {job.company}
          </h2>
          <p className="text-sm text-[#8492af]">{job.location}</p>
        </div>
        <Link to={`/applicaiton-form/${job._id}`}>
          <button className="border-2 rounded-md border-solid border-[#26ae61] px-5 py-2 text-sm uppercase text-[#26ae61] transition-transform duration-700 transform hover:bg-green-600 hover:text-white ">
            APPLY NOW
          </button>
        </Link>
      </div>
    </div>
  );
}
