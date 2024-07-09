import React from 'react';
import { Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <h1>비상 연락망 및 현장 점검 시스템</h1>
      <Box display="flex" flexDirection="column" gap="16px">
        <Button variant="contained" component={Link} to="/menu" fullWidth>메뉴</Button>
      </Box>
    </Container>
  );
};

export default Home;
