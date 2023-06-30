import React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Table.css";
import Grid from '@mui/material/Grid';

function Header() {
  const [vrNo, setVrNo] = useState('');
  const [vrDate, setVrDate] = useState('');
  const [status, setStatus] = useState('');
  const [acName, setAcName] = useState('');
  const [acAmt, setAcAmt] = useState('');
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleVrNoChange = (event) => {
    setVrNo(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, vrNo: '' }));
  };

  const handleVrDateChange = (event) => {
    setVrDate(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, vrDate: '' }));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, status: '' }));
  };

  const handleAcNameChange = (event) => {
    setAcName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, acName: '' }));
  };

  const handleAcAmtChange = (event) => {
    setAcAmt(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, acAmt: '' }));
  };

  const DeleteButton = ({ handleDelete }) => {
    const handleClick = () => {
      handleDelete();
    };

    return <button onClick={handleClick}>Delete</button>;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const newRow = {
        vrNo: vrNo,
        vrDate: vrDate,
        status: status,
        acName: acName,
        acAmt: acAmt,
      };
      setTableData((prevData) => [newRow, ...prevData]);

      // Clear the form values
      setVrNo('');
      setVrDate('');
      setStatus('');
      setAcName('');
      setAcAmt('');
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // VR.NO validation
    if (!vrNo) {
      errors.vrNo = 'VR.NO is required.';
      isValid = false;
    } else if (!/^\d+$/.test(vrNo)) {
      errors.vrNo = 'VR.NO must be a valid number.';
      isValid = false;
    }

    // VR.Date validation
    if (!vrDate) {
      errors.vrDate = 'VR.Date is required.';
      isValid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(vrDate)) {
      errors.vrDate = 'VR.Date must be in the format YYYY-MM-DD.';
      isValid = false;
    }

    // Status validation
    if (!status) {
      errors.status = 'Status is required.';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(status)) {
      errors.status = 'Status must contain only alphabets.';
      isValid = false;
    }

    // AC.Name validation
    if (!acName) {
      errors.acName = 'AC.Name is required.';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(acName)) {
      errors.acName = 'AC.Name must contain only alphabets.';
      isValid = false;
    }

    // AC.Amt validation
    if (!acAmt) {
      errors.acAmt = 'AC.Amt is required.';
      isValid = false;
    } else if (!/^\d+$/.test(acAmt)) {
      errors.acAmt = 'AC.Amt must be a valid number.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://5.189.180.8:8010/Header');
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleDelete = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} m={3}>
          <Grid item xs={1} m={2}>
            VR.NO
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="vrNo"
              label="VR.No"
              variant="outlined"
              value={vrNo}
              onChange={handleVrNoChange}
              error={Boolean(errors.vrNo)}
              helperText={errors.vrNo}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={1} m={2}>
            VR.Date
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="vrDate"
              label="VR.Date"
              variant="outlined"
              value={vrDate}
              onChange={handleVrDateChange}
              error={Boolean(errors.vrDate)}
              helperText={errors.vrDate}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={1} m={2}>
            Status
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="status"
              label="Status"
              variant="outlined"
              value={status}
              onChange={handleStatusChange}
              error={Boolean(errors.status)}
              helperText={errors.status}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} m={5}>
          <Grid item xs={1} m={2}>
            AC.Name
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="acName"
              label="AC.Name"
              variant="outlined"
              value={acName}
              onChange={handleAcNameChange}
              error={Boolean(errors.acName)}
              helperText={errors.acName}
            />
          </Grid>
          <Grid item xs={1} m={2}>
            AC.Amt
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="acAmt"
              label="AC.Amt"
              variant="outlined"
              value={acAmt}
              onChange={handleAcAmtChange}
              error={Boolean(errors.acAmt)}
              helperText={errors.acAmt}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} m={5}>
          
        </Grid>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <TableContainer component={Paper}>
        <h1>Header Table</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="heading">
              <TableCell align="right">vr_no</TableCell>
              <TableCell align="right">vr.Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">AC.Name</TableCell>
              <TableCell align="right">AC.Amt</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.vrNo}
                </TableCell>
                <TableCell align="right">{row.vrDate}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.acName}</TableCell>
                <TableCell align="right">{row.acAmt}</TableCell>
                <TableCell align="right">
                  <DeleteButton handleDelete={() => handleDelete(index)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Header;
