import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "./admin.css";

import axios from "axios";
import MaterialReactTable from "material-react-table";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function Admin() {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);

      const dataUser = JSON.parse(Cookies.get("auth"));
      const token = dataUser.access_token;
      



  useEffect(() => {

    axios
      .get("http://localhost:8000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.users)) {
          const formattedColumns = [
            {
              accessorKey: "id",
              header: "ID",
              type: "numeric",
              enableEditing: false,
            },
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email", type: "unique" },
            {
              accessorKey: "created_at",
              header: "created AT",
              enableEditing: false,
            },
            {
              accessorKey: "updated_at",
              header: "updated AT",
              enableEditing: false,
            },
          ];

          setColumns(formattedColumns);
          setData(response.data.users);
        } else {
          console.error("Invalid response format");
          setData([]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = (updatedRow) => {
    const { ...updatedValues } = updatedRow.values;

    Swal.fire({
      title: "Are you sure you want to edit this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `http://localhost:8000/api/auth/users/${updatedRow.values.id}`,
            {
              ...updatedValues,
              _method: "PUT",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Update successful",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Update failed",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure you want to delete this admin?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/auth/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Delete successful",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Delete failed",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

   const AddAdminForm = () => {
     const [admin, setAdmin] = useState({
       name: "",
      email: "",
      password: "",
      is_super: 0,
     });
     const [isDisabled, setIsDisabled] = useState(true); // new state variable

     const handleFormChange = (event) => {
      console.log(admin)
       const { name, value } = event.target;
       setAdmin((prevState) => ({ ...prevState, [name]: value }));
     };

     useEffect(() => {
       setIsDisabled(admin.name === "" && admin.email === "" && admin.password === "");
     }, [admin.name, admin.email, admin.password]);
     //////////////////////////
     console.log(admin.name, admin.email, admin.password)
     const handleSubmit = (event) => {
       event.preventDefault();
       axios
         .post(
           "http://localhost:8000/api/register",
           {
             name: admin.name,
             email: admin.email,
             password: admin.password,
             is_super : admin.is_super
           },
           {
             headers: { Authorization: `Bearer ${token}` },
           }
         )
         .then((response) => {
          console.log("here the response data")
           console.log(response.data);
           setData([...data, response.data]);
           setAdmin({
             name: "",
             email: "",
             password: "",
           });
           setOpen(false);
         });
     };

     return (
       <Dialog open={open} onClose={() => setOpen(false)}>
         <DialogTitle>Add New Course</DialogTitle>
         <DialogContent>
           <TextField
             label="Name"
             name="name"
             onChange={handleFormChange}
             fullWidth
             required
             sx={{ mb: 2 }}
           />
           <TextField
             label="Email"
             name="email"
             onChange={handleFormChange}
             fullWidth
             required
             sx={{ mb: 2 }}
           />
           <TextField
             label="Password"
             name="password"
             onChange={handleFormChange}
             fullWidth
             required
             sx={{ mb: 2 }}
           />
         </DialogContent>
         <DialogActions>
           <Button onClick={() => setOpen(false)}>Cancel</Button>
           <Button onClick={handleSubmit} disabled={isDisabled}>
             Add
           </Button>{" "}
           {/* add disabled prop */}
         </DialogActions>
       </Dialog>
     );
   };
  const [rowAdmin, setRowAdmin] = useState({});

  useEffect(() => {}, [rowAdmin]);

  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    console.log(tableInstanceRef.current.getState().sorting);
  };

  return (
    <>
      <div className="table-container">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "rgb(124, 124, 255)" }}
            onClick={() => setOpen(true)}
          >
            Add Admin
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
            const admin = row.original;
            return [
              <MenuItem
                key={`delete-${admin.id}`}
                onClick={() => handleDelete(admin.id)}
                sx={{ pl: "10px" }}
              >
                <IconButton size="small" sx={{ mr: 1.5 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                Delete
              </MenuItem>,
            ];
          }}
          editingMode="row"
          enableEditing
          onEditingRowSave={handleUpdate}
        />
        <AddAdminForm />
      </div>
    </>
  );
}

export default Admin;
