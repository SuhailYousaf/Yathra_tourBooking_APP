import React, { useState, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/admin/DataTable/DataTable';
import { Link } from 'react-router-dom';
import { getTours } from '../../../redux/features/tourSlice';
import './Products.css';

const Products = () => {
  const [open, setOpen] = useState(false);
  
  const { tours, loading } = useSelector((state) => state.tour);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const rows = tours.map((tour, index) => ({
    id: index, // You can use a unique identifier here if available
    ...tour,
  }));


  // Define your data grid columns here
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'imageFile',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.imageFile || '/noavatar.png'} alt="" />;
      },
    },
    
    {
      field: 'title',
      headerName: 'Title',
      width: 100,
    },
    {
      field: 'tags',
      headerName: 'tags',
      width: 100,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'Creator',
      headerName: 'Creator',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
    },
   
  ];

  return (
    <div className='products'>
      <div className='info'>
        <h1>Products</h1>
        <Link to='/admin/addProduct'>
        <button>Add New Place</button>
      </Link>
      </div>
      <DataTable slug='tours' columns={columns} rows={rows} />
    </div>
  );
};

export default Products;
