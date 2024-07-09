import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import BackButton from './BackButton';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const response = await axios.get('/api/departments');
    setDepartments(response.data);
  };

  const addDepartment = async () => {
    const response = await axios.post('/api/departments', newDepartment);
    setDepartments([...departments, response.data]);
    setNewDepartment({ name: '' });
  };

  return (
    <Container>
      <BackButton />
      <h2>부서 관리</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField
          label="부서명"
          value={newDepartment.name}
          onChange={(e) => setNewDepartment({ name: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addDepartment}>
          추가
        </Button>
      </Box>
      <List>
        {departments.map((department, index) => (
          <ListItem key={index}>
            <ListItemText primary={department.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DepartmentManagement;
