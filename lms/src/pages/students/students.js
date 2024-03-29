import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../../component/Sidebar/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import "./Student.css";
import { Avatar } from "@mui/material";
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
} from "@mui/material";

import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";

function Students() {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

      const dataUser = JSON.parse(Cookies.get("auth"));
      const token = dataUser.access_token;

  useEffect(() => {


    axios
      .get("http://localhost:8000/api/auth/student", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.message)) {
          const formattedColumns = [
            {
              accessorKey: "id",
              header: "ID",
              type: "numeric",
              enableEditing: false,
            },
            {
              accessorKey: "picture",
              header: "Picture",
              enableEditing: false,
              Cell: ({ row }) => (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <label htmlFor={`file-upload-${row.index}`}>
                    <Avatar
                      alt="avatar"
                      src={`http://localhost:8000${row.original.picture}`}
                      sx={{ width: 40, height: 40 }}
                    />
                  </label>
                  <input
                    id={`file-upload-${row.index}`}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      console.log("Selected file:", e.target.files[0]);
                      handleUpdatePicture({
                        values: {
                          id: row.original.id,
                          picture: e.target.files[0],
                        },
                      });
                    }}
                  />
                </Box>
              ),
            },

            {
              accessorKey: "name",
              header: "Name",
            },
            {
              accessorKey: "email",
              header: "Email",
            },
            {
              accessorKey: "phone",
              header: "Phone",
            },

            {
              accessorKey: "course_id",
              header: "Class_id",
              editable: true,
            },
            {
              accessorKey: "created_at",
              header: "created-AT",
              enableEditing: false,
            },
            {
              accessorKey: "updated_at",
              header: "updates-AT",
              enableEditing: false,
            },
          ];

          setColumns(formattedColumns);
          setData(response.data.message);
        } else {
          console.error("Invalid response format");
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // ...

  const handleUpdatePicture = (updatedRow) => {
    const { ...updatedValues } = updatedRow.values;
    const formData = new FormData();
    formData.append("picture", updatedRow.values.picture);
    console.log("formData:", formData);
    Swal.fire({
      title: "Are you sure you want to update this student's picture?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `http://localhost:8000/api/auth/student/${updatedRow.values.id}/picture`,
            {
              formData,
              _method: "put",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
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

  // edit course

  const handleUpdate = (updatedRow) => {
    const { ...updatedValues } = updatedRow.values;
    Swal.fire({
      title: "Are you sure you want to edit this student?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `http://localhost:8000/api/auth/student/${updatedRow.values.id}`,
            {
              ...updatedValues,
              _method: "patch",
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

  //  delete course
  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure you want to delete this student?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/auth/student/${id}`, {
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

  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    console.log(tableInstanceRef.current.getState().sorting);
  };

  // add student
  const AddStudentForm = () => {
    const [student, setStudent] = useState({
      name: "",
      email: "",
      phone: "",
      picture: "",
      course_id: "",
      section_id:"",
    });
    const [isDisabled, setIsDisabled] = useState(true); // new state variable

    const handleFormChange = (event) => {
      console.log(student);
      const { name, value, files } = event.target;

      if (name === "picture") {
        setStudent((prevState) => ({
          ...prevState,
          picture: files.length > 0 ? files[0] : "", // save the first file or an empty string
        }));
      } else {
        setStudent((prevState) => ({ ...prevState, [name]: value }));
      }
    };

    useEffect(() => {
      // update isDisabled state whenever name or description changes
      setIsDisabled(
        student.name === "" &&
          student.email === "" &&
          student.phone === "" &&
          student.picture === "" &&
          student.course_id === ""&&
          student.section_id ===""
      );
    }, [
      student.name,
      student.email,
      student.phone,
      student.picture,
      student.course_id,
      student.section_id
    ]);

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("name", student.name);
      formData.append("email", student.email);
      formData.append("phone", student.phone);
      formData.append("course_id", student.course_id);
      formData.append("picture", student.picture);
      formData.append("section_id", student.section_id);

      axios
        .post("http://localhost:8000/api/auth/student", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // set the content type to multipart/form-data
          },
        })
        .then((response) => {
          console.log(response.data);
          setData([...data, response.data]);
          setStudent({
            name: "",
            email: "",
            phone: "",
            picture: "",
            course_id: "",
            section_id:"",
          });
          setOpen(false);
          Swal.fire("Success!", "Student added successfully.", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
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
            // value={student.email}
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            // value={student.phone}
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="course_id"
            name="course_id"
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
           <TextField
            label="section_id"
            name="section_id"
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            type="file"
            // label="Picture"
            name="picture"
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

  return (
    <>
      <div className="table-container">
        <p>Student page</p>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "rgb(124, 124, 255)" }}
            onClick={() => setOpen(true)}
          >
            Add Student
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
            const student = row.original;
            return [
              <MenuItem
                key={`delete-${student.id}`}
                onClick={() => handleDelete(student.id)}
                sx={{ pl: "10px" }} // Add 20px of padding to the left side
              >
                <IconButton size="small" sx={{ mr: 1.5 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                Delete
              </MenuItem>,

              //  <MenuItem key={`update-${student.id}`} onClick={() => handleUpdate(student)}>Edit</MenuItem>
            ];
          }}
          editingMode="row"
          enableEditing
          onEditingRowSave={handleUpdate}
        />
        <AddStudentForm />
      </div>
    </>
  );
}

export default Students;
