import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import {stringAvatar} from './Utils';

const dates = [
    "1953-04-12",
    "1958-04-12",
    "1963-04-12",
    "1968-04-12",
    "1973-04-12",   
    "1978-04-12",
    "1983-04-12",
    "1988-04-12",
    "1993-04-12",
    "1998-04-12",
    "2003-04-12",
    "2008-04-12",
    "2013-04-12",
    "2018-04-12",
    "2012-04-12",
    "2010-08-12",
    "2006-04-12",
    "2002-04-12",
    "2000-04-12",
    "1940-04-12"
];

function calculateAge(dateString) {
    if (dateString === "") {
        return null;
    }
    try {
        const [year, month, day] = dateString.split("-");
        const birthdate = new Date(year, month, day);
        const now = new Date();
        const ageInMilliseconds = now - birthdate;
        const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        return ageInYears;
    } catch (error) {
        console.error("Invalid date string:", dateString);
        return null;
    }
}

export default function BasicTable({ data, isLoading, sliderValue }) {

    const [rowData, setRowData] = useState(null);
    const [patientList, setPatientList] = useState([]);

    React.useEffect(() => {
        let list = [];
        if (data && data.entry && data.entry.length) {
            data.entry.forEach((item, index) => {
                list.push({
                    id: item?.resource?.id,
                    name: item?.resource?.name?.[0]?.given?.[0] + " " + item?.resource?.name?.[0]?.family || "",
                    gender: item?.resource?.gender || "N/A",
                    age: calculateAge(dates[index]),//calculateAge(item?.resource?.birthDate || ""),
                    phone: item?.resource?.telecom?.[0]?.value || "N/A",
                });
            });
        }
        setPatientList(list);
    }, [data]);

    React.useEffect(() => {
        setRowData(patientList);
    }, [patientList]);

    React.useEffect(() => {
        // console.log("> sliderValue", sliderValue[0], sliderValue[1]);
        let filteredArr = patientList.filter((item) => (item?.age >= sliderValue[0] && item.age <= sliderValue[1]))
        setRowData(filteredArr);
        // console.log("> filt val: ", filteredArr);
    }, [sliderValue]);


    if (!rowData?.length) {
        return null;
    }

    return (
        <TableContainer component={Paper} sx={{paddingLeft: '10%'}}>
            <Table sx={{ width: '80%',boxShadow: 3,  border: 1 }} stickyHeader aria-label="sticky table">
                <TableHead >
                    <TableRow >
                        <TableCell sx={{ bgcolor: '#1976d2'}} align="center"><h3>Id</h3></TableCell>
                        <TableCell sx={{ bgcolor: '#1976d2'}} align="center"><h3>Name</h3></TableCell>
                        <TableCell sx={{ bgcolor: '#1976d2'}} align="center"><h3>Gender</h3></TableCell>
                        <TableCell sx={{ bgcolor: '#1976d2'}} align="center"><h3>Age</h3></TableCell>
                        <TableCell sx={{ bgcolor: '#1976d2'}} align="center"><h3>Phone</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData && rowData?.length && rowData.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ border: 2 }}
                            key={row?.id}
                        >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}><div><Avatar {...stringAvatar(row.name)} /></div>
                                <div>{row.name}</div></div>
                            </TableCell>
                            <TableCell align="center">{row.gender}</TableCell>
                            <TableCell align="center">{row.age}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
