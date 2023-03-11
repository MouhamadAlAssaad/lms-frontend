import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';



import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';

import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';


function Classes() {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth');

    axios
      .get('http://localhost:8000/api/auth/attendance', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.message)) {
          const formattedColumns = [
            { accessorKey: 'id', header: 'ID', type: 'numeric',editable:false },
            { accessorKey: 'date', header: 'Date',editable: true },
            { accessorKey: 'case', header: 'Case',editable: true },
            { accessorKey: 'created_at', header: 'created-AT',editable:false },
            { accessorKey: 'updated_at', header: 'updates-AT',editable: false },
          ];

          setColumns(formattedColumns);
          setData(response.data.message);
        } else {
          console.error('Invalid response format');
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  // edit course

  const handleUpdate = (updatedRow) => {
  const token = Cookies.get('auth');
  const { ...updatedValues } = updatedRow.values;

  Swal.fire({
    title: 'Are you sure you want to edit this attendance?',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .patch(`http://localhost:8000/api/auth/attendance/${updatedRow.values.id}`, 
          {
            ...updatedValues,
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            icon: 'success',
            title: 'Update successful',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Update failed',
            text: error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  });
  };

  
  //  delete course
  const handleDelete = (id) => {
  const token = Cookies.get('auth');

  Swal.fire({
    title: 'Are you sure you want to delete this attendance?',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8000/api/auth/attendance/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            icon: 'success',
            title: 'Delete successful',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Delete failed',
            text: error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  });
  };


  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    console.log(tableInstanceRef.current.getState().sorting);
  };


  // add course
  const AttendanceForm = () => {
    const [attendance, setAttendance] = useState({
      date:'',
      case:'',
      section_id:'',
      student_id:'',
    });
    const [isDisabled, setIsDisabled] = useState(true); // new state variable
  
    const handleFormChange = (event) => {
      console.log(attendance)
      const { name, value } = event.target;
      setAttendance(prevState => ({ ...prevState, [name]: value }));
    };
  
    useEffect(() => {
      setIsDisabled(attendance.date === '' || attendance.student_id === '' || attendance.section_id === '' || attendance.case === '');
    }, [attendance.date, attendance.student_id, attendance.section_id, attendance.case]);
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const token = Cookies.get('auth');
      axios
        .post(
          'http://localhost:8000/api/auth/attendance',
          {
            date: attendance.date,
           case: attendance.case,
           student_id:attendance.student_id,
           section_id:attendance.section_id
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((response) => {
          console.log(response.data);
          setData([...data, response.data]); // add the new course to the data state
          // reset the form data state
          setAttendance({
            date: '',
            case: '',
            student_id:'',
            section_id:'',
         
          });
          setOpen(false);
        });
    };
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Attendance</DialogTitle>
        <DialogContent>
        <TextField label="Date" name="date" type="date" onChange={handleFormChange} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Student_id" name="student_id"  onChange={handleFormChange} fullWidth required  sx={{ mb: 2 }} />
          <TextField label="Section_id" name="section_id"  onChange={handleFormChange} fullWidth required  sx={{ mb: 2 }} />
          <FormControl component="fieldset" fullWidth>
  <FormLabel component="legend" style={{ textAlign: 'left' }}>Attendance</FormLabel>
  <RadioGroup name="case" row onChange={handleFormChange} >
    <FormControlLabel value="present" control={<Radio />} label="Present" />
    <FormControlLabel value="absent" control={<Radio />} label="Absent" />
    <FormControlLabel value="late" control={<Radio />} label="Late" />
  </RadioGroup>
</FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isDisabled}>Add</Button> {/* add disabled prop */}
        </DialogActions>
      </Dialog>
    );
  };
  
  
  return (
    <>
    
    <div className='table-container'>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <Button variant="contained" color="primary" style={{ backgroundColor: "rgb(124, 124, 255)" }} onClick={() => setOpen(true)}>
    Add Course
    <AddIcon style={{ marginLeft: "0.5em" }} />
    </Button>
    </Box>
      <MaterialReactTable
    columns={formattedColumns}
    data={data}
    enableColumnOrdering
    enablePagination={true}
    tableInstanceRef={tableInstanceRef}
    enableRowActions
    renderRowActionMenuItems={({ row }) => {
    const course = row.original;
    return [
      <MenuItem
      key={`delete-${course.id}`}
      onClick={() => handleDelete(course.id)}
      sx={{ pl: '10px' }} // Add 20px of padding to the left side
    >
     <IconButton size="small" sx={{ mr: 1.5 }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      Delete
    </MenuItem>
    
      // <MenuItem key={`update-${course.id}`} onClick={() => handleUpdate(course)}>Edit</MenuItem>
    ];
  }}
  editingMode="row"
  enableEditing
  onEditingRowSave={handleUpdate}


  />
  < AttendanceForm />




    </div>
    </>
  );
}

     
export default Classes;
 