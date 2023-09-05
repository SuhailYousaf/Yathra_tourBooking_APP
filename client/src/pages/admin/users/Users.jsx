import React, { useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/admin/DataTable/DataTable';
import { getUsers } from '../../../redux/features/userrSlice'; // Correct the import path
import './users.css';

const Users = () => {
  const { users, loading } = useSelector((state) => state.userr);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers()); // Dispatch the action to fetch users
  }, [dispatch]);

  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // if (!users) {
  //   console.log("No users data!"); // Debugging log
  //   return <h2>No users found.</h2>;
  // }

  const rows = users.map((userr, index) => ({
    id: index, 
    ...userr,
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstname',
      type: 'string',
      headerName: 'Name',
      width: 150,
    },
    
    {
      field: 'email',
      type: 'string',
      headerName: 'Email',
      width: 200,
    },
    // Uncomment the following block if you intend to display the "phone" field
    // {
    //   field: 'phone',
    //   type: 'string',
    //   headerName: 'Phone',
    //   width: 200,
    // },
  ];

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>
      <DataTable slug="userr" columns={columns} rows={rows} />
    </div>
  );
};

export default Users;
