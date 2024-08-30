import React, { useEffect, useState } from 'react';
import { fetchDrupalData } from './services/drupalApi';
import { Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDrupalData().then(data => {
      setData(data);
      setFilteredData(data);
    });
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter(item =>
        item.first_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    };
    filterData();
  }, [searchTerm, data]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Filtrar por nombre..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <div className="mb-3">
        <select
          className="form-select"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
          <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Document Type</th>
            <th>Document Number</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.document_type}</td>
              <td>{item.document_number}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default App;

