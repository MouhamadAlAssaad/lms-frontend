import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Sidebar from '../../component/Sidebar/Sidebar';

import './Class.css'
import Cookies from 'js-cookie';


import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import './Class.css';
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
      .get('http://localhost:8000/api/auth/course', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.courses)) {
          const formattedColumns = [
            { accessorKey: 'id', header: 'ID', type: 'numeric',editable:false },
            { accessorKey: 'name', header: 'Name',editable: true},
            { accessorKey: 'description', header: 'Description',editable: true },
            { accessorKey: 'created_at', header: 'created-AT',editable:false },
            { accessorKey: 'updated_at', header: 'updates-AT',editable: false },

          ];

          setColumns(formattedColumns);
          setData(response.data.courses);
        } else {
          console.error('Invalid response format');
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // edit course

const handleUpdate = (updatedRow) => {
  const token = Cookies.get('auth');
  const { ...updatedValues } = updatedRow.values;

  Swal.fire({
    title: 'Are you sure you want to edit this course?',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .post(`http://localhost:8000/api/auth/course/${updatedRow.values.id}`, 
          {
            ...updatedValues,
            _method: 'PUT'
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
    title: 'Are you sure you want to delete this course?',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8000/api/auth/course/${id}`, {
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
  const AddCourseForm = () => {
    const [course, setCourse] = useState({
      name: '',
      description: ''
    });
    const [isDisabled, setIsDisabled] = useState(true); // new state variable
  
    const handleFormChange = (event) => {
      const { name, value } = event.target;
      setCourse(prevState => ({ ...prevState, [name]: value }));
    };
  
    useEffect(() => {
      // update isDisabled state whenever name or description changes
      setIsDisabled(course.name === '' && course.description === '');
    }, [course.name, course.description]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const token = Cookies.get('auth');
      axios
        .post(
          'http://localhost:8000/api/auth/course',
          {
            name: course.name,
            description: course.description
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((response) => {
          console.log(response.data);
          setData([...data, response.data]); // add the new course to the data state
          // reset the form data state
          setCourse({
            name: '',
            description: ''
          });
          setOpen(false);
        });
    };
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={course.name} onChange={handleFormChange} fullWidth required   sx={{ mb: 2 }}/>
          <TextField label="Description" name="description" value={course.description} onChange={handleFormChange} fullWidth required  sx={{ mb: 2 }} />
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

      <Sidebar />
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
<AddCourseForm />

     

    </div>
    </>
  );
}

     
export default Classes;
 

