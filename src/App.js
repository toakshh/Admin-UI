import './App.css';
import React, { useState, useEffect } from "react";
import Input from './components/minor/Input';
import Table from './components/major/Table';
import Pagination from './components/major/Pagination';
import Message from './components/minor/Message';

function App() {
  const [allUsers, setAllUsers] = useState([]); // all user data
  const [search, setSearch] = useState(""); //searched data
  const [selectedRows, setSelectedRows] = useState([]); // marked rows 
  const [currentPage, setCurrentPage] = useState(1); // to update current page 
  const [rowsPerPage] = useState(10); // items per page
  const [loading, setLoading] = useState(false) //loading State 
  const [selectAll, setSelectAll] = useState(false); // mark all checkbox

  //Fetch data form API on component mount
  useEffect(() => {
    const getResponse = async () => {
      try{
        setLoading(true)
        const URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
        const data = await fetch(URL);
        const response = await data.json();
        setAllUsers(response)
        setLoading(false)
      }catch(e){
        alert(e);
        console.log(e)
      }
    }
    getResponse()
  }, []);

  // Calculate the index range of the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Filter the allUsers based on the search term
  const filteredallUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );
   // Get current rows to display on the current page
  const currentRows = filteredallUsers.slice(indexOfFirstRow, indexOfLastRow);

  // Handle search term change
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    const selectedRowIds = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(selectedRowIds);
  };

  // Handle row deletion
  const handleRowDelete = (id) => {
    const updatedallUsers = allUsers.filter((user) => user.id !== id);
    setAllUsers(updatedallUsers);

  };
  // Handle marked deletion
  const handleMarkDeleteAll = () => {
    if (selectedRows.length > 0) {
      const updatedallUsers = allUsers.filter((user) => !selectedRows.includes(user.id));
      setAllUsers(updatedallUsers);
      setSelectedRows([]);
    } else {
      setAllUsers([]);
    }
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredallUsers.length / rowsPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   // Handle select all checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const currentPageIds = currentRows.map((row) => row.id);
      setSelectedRows(currentPageIds);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="container">
      <h2 style={{color:"#3D8CFF",fontSize:"xx-large"}}><Message messageData="Admin UI"/></h2>
      {/* Search input */}
      <Input 
        placeholder='Enter name, email or role to filter results' 
        type="text"
        value={search} 
        clickProp={handleSearch} 
        classProp="search"
      />
       {/* Table */}
      {loading ? <h2 style={{color:"white"}}><Message messageData="Loading Data... Please wait"/></h2> : <Table 
        selectAll={selectAll} 
        handleSelectAll={handleSelectAll} 
        currentRows={currentRows} 
        selectedRows={selectedRows} 
        handleRowSelect={handleRowSelect} 
        allUsers={allUsers} 
        setAllUsers={setAllUsers} 
        handleRowDelete={handleRowDelete}
      />}
       {/* Pagination */}
      {filteredallUsers.length === 0 && loading === false ? 
        <h2 style={{color:"white"}}><Message messageData="No Data Found"/></h2>
        :
       <Pagination 
        pageNumbers={pageNumbers} 
        currentPage={currentPage} 
        handlePageChange={handlePageChange} 
        selectedRows={selectedRows} 
        handleMarkDeleteAll={handleMarkDeleteAll} 
        totalPages={totalPages} 
      />}
    </div>
  );
}

export default App;

