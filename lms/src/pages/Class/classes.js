import React, { useState, useEffect, useRef } from 'react';
// import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Sidebar from '../../component/Sidebar/Sidebar';
import './Class.css'
import Cookies from 'js-cookie';


import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import Topbar from '../../topbar/topbar';


function Classes() {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);

  useEffect(() => {
    const token = Cookies.get('auth');
    axios.get('http://localhost:8000/api/auth/course',
    {
      headers: { Authorization: `Bearer ${token}` },
  })
      .then(response => {
        console.log(response.data); // log the data variable
        if (response.data && Array.isArray(response.data.courses)) {
          const formattedColumns = [
            { accessorKey: 'id', header: 'ID', type: 'numeric' },
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'description', header: 'Description' },
            {accessorKey: 'created_at', header: 'created-AT'},
            {accessorKey: 'updated_at', header: 'updates-AT'},
   
          ];
            
          setColumns(formattedColumns);
          setData(response.data.courses);
        } else {
          console.error('Invalid response format');
          setData([]);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleAdd = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/course', formData)
      .then(response => {
        console.log(response.data); // log the response data
        setData([...data, response.data]);
        setFormData({ name: '', description: '' });
      });
  }

  const handleEdit = (id) => {
    // implement the edit functionality here
    console.log(`Edit clicked for id: ${id}`);
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/course/${id}`)
      .then(response => {
        console.log(response.data); // log the response data
      });
  }

  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  }

  return (
    <>
    <div className='table-container'>
      <MaterialReactTable 
        columns={formattedColumns} 
        data={data} 
        enableColumnOrdering //enable some features
        // enableRowSelection 
        enablePagination={true} //disable a default feature
        // onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
        // state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
        tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
        />
    </div>
    </>
  );
}

     
export default Classes;
 

