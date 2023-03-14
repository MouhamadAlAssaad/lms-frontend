import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "./sections.css";
import Dropdown from "../../component/dropdown/dropdown"
import axios from "axios";
import MaterialReactTable, {
} from "material-react-table";
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

function Sections() {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth");
    axios
      .get("http://localhost:8000/api/auth/section", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data); // log the data variable
        if (response.data && Array.isArray(response.data.sections)) {
          const formattedColumns = [
            { accessorKey: "id", header: "ID", type: "numeric" , enableEditing: false,},
            { accessorKey: "name", header: "Name" },
            { accessorKey: "capacity", header: "Capacity" },
            { accessorKey: "content", header: "content" },
            { accessorKey: "created_at", header: "created-AT", enableEditing: false, },
            { accessorKey: "updated_at", header: "updates-AT", enableEditing: false, },
          ];

          setColumns(formattedColumns);
          setData(response.data.sections);
        } else {
          console.error("Invalid response format");
          setData([]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = (updatedRow) => {
    const token = Cookies.get("auth");
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
    const token = Cookies.get("auth");

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


  const AddSectionForm = () => {
    const [section, setSection] = useState({
      name: "",
      content: "",
      capacity: "",
      course_id:""
    });
    const [isDisabled, setIsDisabled] = useState(true); 
    const handleFormChange = (event) => {
      const { name, value } = event.target;
      setSection((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
      setIsDisabled(
        section.name === "" && section.content === "" && section.capacity === "" && section.course_id ===""
      );
    }, [section.name,  section.content, section.capacity, section.course_id]);

    const handleSubmit = (event) => {
      event.preventDefault();
      const token = Cookies.get("auth");
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
            course_id:""
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
          {/* add disabled prop */}
        </DialogActions>
      </Dialog>
    );
  };

  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  };

  return (
    <>
      <div className="table-container">
      <Dropdown labelName="Classes" options={["Section A", "Section B"]}/>

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
          data={data}
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
};

export default Sections;