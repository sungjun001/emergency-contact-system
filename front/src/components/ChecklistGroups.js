import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material';
import BackButton from './BackButton';

const ChecklistGroups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await axios.get('/api/checklist-groups');
    setGroups(response.data);
  };

  const addGroup = async () => {
    const response = await axios.post('/api/checklist-groups', { name: newGroup });
    setGroups([...groups, response.data]);
    setNewGroup('');
  };

  return (
    <Container>
      <BackButton />
      <h2>체크리스트 그룹</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField
          label="새 그룹"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addGroup}>
          추가
        </Button>
      </Box>
      <List>
        {groups.map((group, index) => (
          <ListItem key={index}>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ChecklistGroups;
