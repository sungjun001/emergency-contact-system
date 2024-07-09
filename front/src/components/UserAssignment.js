import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Select, MenuItem, Button, Box, InputLabel, FormControl } from '@mui/material';
import BackButton from './BackButton';

const UserAssignment = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const fetchDepartments = async () => {
    const response = await axios.get('/api/departments');
    setDepartments(response.data);
  };

  const assignUserToDepartment = async () => {
    await axios.post('/api/user-assignment', {
      userId: selectedUser,
      departmentId: selectedDepartment,
    });
    alert('사용자가 부서에 배치되었습니다.');
  };

  return (
    <Container>
      <BackButton />
      <h2>사용자 부서 배치</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <FormControl fullWidth>
          <InputLabel>사용자</InputLabel>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>부서</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={assignUserToDepartment}>
          배치
        </Button>
      </Box>
    </Container>
  );
};

export default UserAssignment;
