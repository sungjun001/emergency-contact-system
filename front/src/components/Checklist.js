import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Checkbox, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from './BackButton';

const Checklist = () => {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [reporter, setReporter] = useState('');

  useEffect(() => {
    fetchChecklist();
    fetchGroups();
  }, []);

  const fetchChecklist = async () => {
    const response = await axios.get('/api/checklist');
    setChecklist(response.data);
  };

  const fetchGroups = async () => {
    const response = await axios.get('/api/checklist-groups');
    setGroups(response.data);
  };

  const addItem = async () => {
    const response = await axios.post('/api/checklist', { item: newItem, group_id: selectedGroup });
    setChecklist([...checklist, response.data]);
    setNewItem('');
  };

  const toggleCheck = async (id) => {
    const updatedItem = checklist.find((item) => item.id === id);
    updatedItem.checked = !updatedItem.checked;
    await axios.put(`/api/checklist/${id}`, updatedItem);
    setChecklist([...checklist]);

    if (updatedItem.checked) {
      await axios.post('/api/checklist-completion', {
        checklist_id: id,
        reporter,
      });
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`/api/checklist/${id}`);
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <BackButton />
      <h2>안전 점검 체크리스트</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField
          label="새 항목"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>그룹</InputLabel>
          <Select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="보고자"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addItem}>
          추가
        </Button>
      </Box>
      <List>
        {checklist.map((check) => (
          <ListItem key={check.id}>
            <Checkbox checked={check.checked} onChange={() => toggleCheck(check.id)} />
            <ListItemText primary={check.item} />
            <Button variant="contained" color="secondary" onClick={() => deleteItem(check.id)}>
              삭제
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Checklist;
