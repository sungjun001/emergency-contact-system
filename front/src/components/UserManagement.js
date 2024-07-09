import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import BackButton from './BackButton';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    const response = await axios.post('/api/users', newUser);
    setUsers([...users, response.data]);
    setNewUser({ name: '', email: '', phone: '' });
  };

  return (
    <Container>
      <BackButton />
      <h2>사용자 관리</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField
          label="이름"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="이메일"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="전화번호"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addUser}>
          추가
        </Button>
      </Box>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${user.name} - ${user.email} - ${user.phone}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserManagement;
