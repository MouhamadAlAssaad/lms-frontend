import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "./sections.css";
import Dropdown from "../../component/dropdown/dropdown";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NavLink } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
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

function Sections(props) {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [sectionss, setSectionss] = useState([]);
  let location = useLocation();

      const dataUser = JSON.parse(Cookies.get("auth"));
      const token = dataUser.access_token;


  useEffect(() => {
    handleGet(location.state.id);
  }, []);

  const handleGet = (id) => {

    axios
      .get(`http://localhost:8000/api/auth/section/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setColumns([
            {
              accessorKey: "id",
              header: "ID",
              type: "numeric",
              enableEditing: false,
            },
            { accessorKey: "name", header: "Name" },
            { accessorKey: "capacity", header: "Capacity" },
            { accessorKey: "content", header: "content" },
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
          ]);
        }
        setSectionss(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (updatedRow) => {
    const { ...updatedValues } = updatedRow.values;

    Swal.fire({
      title: "Are you sure you want to edit this section?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `http://localhost:8000/api/auth/section/${updatedRow.values.id}`,
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
      title: "Are you sure you want to delete this section?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/auth/section/${id}`, {
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

  console.log(sectionss);
  console.log(data);
  const AddSectionForm = () => {
    const [section, setSection] = useState({
      name: "",
      content: "",
      capacity: "",
      course_id: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const handleFormChange = (event) => {
      const { name, value } = event.target;
      setSection((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
      setIsDisabled(
        section.name === "" &&
          section.content === "" &&
          section.capacity === "" &&
          section.course_id === ""
      );
    }, [section.name, section.content, section.capacity, section.course_id]);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .post(
          "http://localhost:8000/api/auth/section",
          {
            name: section.name,
            content: section.content,
            capacity: section.capacity,
            course_id: section.course_id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          setData([...data, response.data]);
          setSection({
            name: "",
            content: "",
            capacity: "",
            course_id: "",
          });
          setOpen(false);
        });
    };

    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Section</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={section.name}
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Content"
            name="content"
            value={section.content}
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Capacity"
            name="capacity"
            value={section.capacity}
            onChange={handleFormChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="course_id"
            name="course_id"
            value={section.course_id}
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
        </DialogActions>
      </Dialog>
    );
  };

  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {}, [rowSelection]);

  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    console.log(tableInstanceRef.current.getState().sorting);
  };
  const [options, setOptions] = useState([]);

  return (
    <>
      <div className="table-container">
        {/* <Dropdown labelName="Sections" options={sectionss.map((e) => {
          console.log(e.name)
          return  e.name
      })}/> */}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "rgb(124, 124, 255)" }}
            onClick={() => setOpen(true)}
          >
            Add Section
            <AddIcon style={{ marginLeft: "0.5em" }} />
          </Button>
        </Box>
        <MaterialReactTable
          columns={formattedColumns}
          data={sectionss}
          enableColumnOrdering
          enablePagination={true}
          tableInstanceRef={tableInstanceRef}
          enableRowActions
          renderRowActionMenuItems={({ row }) => {
            const section = row.original;
            return [
              <MenuItem
                key={`delete-${section.id}`}
                onClick={() => handleDelete(section.id)}
                sx={{ pl: "10px" }}
              >
                <IconButton size="small" sx={{ mr: 1.5 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                Delete
              </MenuItem>,
              <MenuItem
                sx={{ pl: "10px" }} // Add 20px of padding to the left side
              >
                <NavLink
                
                  to={{ pathname: "/Studentsbysection" }}
                  state={{ id: section.id }}
                  className="sections_students_link"
                >
                  <span style={{ color: "black" }}>
                    <IconButton size="small" sx={{ mr: 1.5 }}>
                      <RemoveRedEyeIcon fontSize="small" />
                    </IconButton>
                    Students
                  </span>
                </NavLink>
              </MenuItem>,
            ];
          }}
          editingMode="row"
          enableEditing
          onEditingRowSave={handleUpdate}
        />

        <AddSectionForm />
      </div>
    </>
  );
}

export default Sections;
