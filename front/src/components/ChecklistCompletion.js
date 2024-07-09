import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material';
import BackButton from './BackButton';

const ChecklistCompletion = () => {
  const [completions, setCompletions] = useState([]);
  const [selectedCompletion, setSelectedCompletion] = useState(null);
  const [reporter, setReporter] = useState('');

  useEffect(() => {
    fetchCompletions();
  }, []);

  const fetchCompletions = async () => {
    const response = await axios.get('/api/checklist-completion');
    setCompletions(response.data);
  };

  const reportCompletion = async () => {
    await axios.put(`/api/checklist-completion/${selectedCompletion.id}`, {
      ...selectedCompletion,
      reporter
    });
    fetchCompletions();
  };

  return (
    <Container>
      <BackButton />
      <h2>체크리스트 완료 보고</h2>
      <List>
        {completions.map((completion) => (
          <ListItem
            key={completion.id}
            button
            onClick={() => setSelectedCompletion(completion)}
          >
            <ListItemText
              primary={`Checklist ID: ${completion.checklist_id}`}
              secondary={`완료 시간: ${completion.completed_at}`}
            />
          </ListItem>
        ))}
      </List>
      {selectedCompletion && (
        <Box display="flex" flexDirection="column" gap="16px">
          <TextField
            label="보고자"
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={reportCompletion}>
            보고
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ChecklistCompletion;
