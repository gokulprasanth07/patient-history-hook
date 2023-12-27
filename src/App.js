import React, { useState, useEffect } from "react";


import usePatientHistory from "./PatientHistory/PatientHistoryHook";
import BasicTable from "./PatientHistory/PatientDataTable";
import { URLS } from "./PatientHistory/constants";



import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function App() {
  const [data, setPatientData, isLoading] = usePatientHistory(null);
  const [value, setValue] = React.useState([20, 37]);

  useEffect(() => {
    // console.log(">>> DATA =>", data);
  }, [isLoading]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 10,
      label: '10',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 60,
      label: '60',
    },
    {
      value: 70,
      label: '70',
    },
    {
      value: 80,
      label: '80',
    },
    {
      value: 90,
      label: '90',
    },
    {
      value: 100,
      label: '100',
    },
  ];



  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto', paddingTop:'56px'}}>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingBottom: '56px'}}>
      <div><h3>FILTER BY AGE</h3></div>
      <Box sx={{ width: 600, align: 'center', paddingLeft: '24px' }}>
        &nbsp;<Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="on"
          aria-label="Always visible"
          defaultValue={60}
          step={10}
          marks={marks}
        />
      </Box></div>

      <div style={{paddingTop: '56px'}}>
        <BasicTable data={data} isLoading={isLoading} sliderValue={value} />
      </div>
    </div>
  );
}

export default App;
