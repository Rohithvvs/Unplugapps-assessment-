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
import './Table.css';
import Grid from '@mui/material/Grid';

function Details() {
  const [vrNo, setVrNo] = useState('');
  const [srNo, setSrNo] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [rate, setRate] = useState('');
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleVrNoChange = (event) => {
    setVrNo(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, vrNo: '' }));
  };

  const handleSrNoChange = (event) => {
    setSrNo(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, srNo: '' }));
  };

  const handleItemCodeChange = (event) => {
    setItemCode(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, itemCode: '' }));
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, itemName: '' }));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, rate: '' }));
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, qty: '' }));
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
        srNo: srNo,
        itemCode: itemCode,
        itemName: itemName,
        description: description,
        qty: qty,
        rate: rate,
      };
      setTableData((prevData) => [newRow, ...prevData]);

      // Clear the form values
      setVrNo('');
      setSrNo('');
      setItemCode('');
      setItemName('');
      setDescription('');
      setQty('');
      setRate('');
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

    // SR.NO validation
    if (!srNo) {
      errors.srNo = 'SR.NO is required.';
      isValid = false;
    } else if (!/^\d+$/.test(srNo)) {
      errors.srNo = 'SR.NO must be a valid number.';
      isValid = false;
    }

    // Item Code validation
    if (!itemCode) {
      errors.itemCode = 'Item Code is required.';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(itemCode)) {
      errors.itemCode = 'Item Code must contain only alphabets.';
      isValid = false;
    }

    // Item Name validation
    if (!itemName) {
      errors.itemName = 'Item Name is required.';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(itemName)) {
      errors.itemName = 'Item Name must contain only alphabets.';
      isValid = false;
    }

    // Description validation
    if (!description) {
      errors.description = 'Description is required.';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(description)) {
      errors.description = 'Description must contain only alphabets.';
      isValid = false;
    }

    // Quantity validation
    if (!qty) {
      errors.qty = 'Quantity is required.';
      isValid = false;
    } else if (!/^\d+$/.test(qty)) {
      errors.qty = 'Quantity must be a valid number.';
      isValid = false;
    }

    // Rate validation
    if (!rate) {
      errors.rate = 'Rate is required.';
      isValid = false;
    } else if (!/^\d+$/.test(rate)) {
      errors.rate = 'Rate must be a valid number.';
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
      const response = await fetch('http://5.189.180.8:8010/detail');
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
         
          <Grid item xs={1} m={2}>
            SR.NO
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="srNo"
              label="SR.No"
              variant="outlined"
              value={srNo}
              onChange={handleSrNoChange}
              error={Boolean(errors.srNo)}
              helperText={errors.srNo}
            />
          </Grid>
       
          <Grid item xs={1} m={2}>
            Item Code
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="itemCode"
              label="Item Code"
              variant="outlined"
              value={itemCode}
              onChange={handleItemCodeChange}
              error={Boolean(errors.itemCode)}
              helperText={errors.itemCode}
            />
          </Grid>
          <Grid item xs={1} m={2}>
            Item Name
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="itemName"
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={handleItemNameChange}
              error={Boolean(errors.itemName)}
              helperText={errors.itemName}
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={2} m={5}>
          <Grid item xs={1} m={2}>
            Description
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={1} m={2}>
            Quantity
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="qty"
              label="Quantity"
              variant="outlined"
              value={qty}
              onChange={handleQtyChange}
              error={Boolean(errors.qty)}
              helperText={errors.qty}
            />
          </Grid>
          <Grid item xs={1} m={2}>
            Rate
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="rate"
              label="Rate"
              variant="outlined"
              value={rate}
              onChange={handleRateChange}
              error={Boolean(errors.rate)}
              helperText={errors.rate}
            />
          </Grid>
        </Grid>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <TableContainer component={Paper}>
        <h1>Detail Table</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="heading">
              <TableCell align="right">VR.NO</TableCell>
              <TableCell align="right">SR.NO</TableCell>
              <TableCell align="right">Item Code</TableCell>
              <TableCell align="right">Item Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.vrNo}
                </TableCell>
                <TableCell align="right">{row.srNo}</TableCell>
                <TableCell align="right">{row.itemCode}</TableCell>
                <TableCell align="right">{row.itemName}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.rate}</TableCell>
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

export default Details;
