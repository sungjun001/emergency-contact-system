import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
    >
      뒤로가기
    </Button>
  );
};

export default BackButton;
