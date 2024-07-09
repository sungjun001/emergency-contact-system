import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import BackButton from './BackButton';

const ChecklistCompletionList = () => {
  const [completions, setCompletions] = useState([]);

  useEffect(() => {
    fetchCompletions();
  }, []);

  const fetchCompletions = async () => {
    const response = await axios.get('/api/checklist-completion');
    setCompletions(response.data);
  };

  return (
    <Container>
      <BackButton />
      <h2>체크리스트 완료 목록</h2>
      <List>
        {completions.map((completion, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Checklist ID: ${completion.checklist_id}`}
              secondary={`완료 시간: ${completion.completed_at}, 보고자: ${completion.reporter}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ChecklistCompletionList;
