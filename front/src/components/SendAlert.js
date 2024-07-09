import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import BackButton from './BackButton';

const SendAlert = () => {
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const response = await axios.get('/api/departments');
    setDepartments(response.data);
  };

  const sendAlert = async () => {
    await axios.post('/api/alerts', { message, recipients });
    alert('알림이 전송되었습니다.');
    setMessage('');
    setRecipients([]);
  };

  return (
    <Container>
      <BackButton />
      <h2>알림 전송</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField
          label="알림 메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>수신 대상</InputLabel>
          <Select
            multiple
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.name}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={sendAlert}>
          전송
        </Button>
      </Box>
    </Container>
  );
};

export default SendAlert;
