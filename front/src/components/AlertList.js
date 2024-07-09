import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Box } from '@mui/material';
import BackButton from './BackButton';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const response = await axios.get('/api/alerts');
    setAlerts(response.data);
  };

  return (
    <Container>
      <BackButton />
      <h2>알림 리스트</h2>
      <Box display="flex" flexDirection="column" gap="16px">
        <List>
          {alerts.map((alert, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`메시지: ${alert.message}`}
                secondary={`수신 대상: ${alert.recipients.join(', ')}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AlertList;
