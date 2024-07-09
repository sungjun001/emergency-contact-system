import React from 'react';
import { Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Menu = () => {
  return (
    <Container>
      <BackButton />
      <h1>메뉴</h1>
      <Box display="flex" flexDirection="column" gap="16px">
        <Button variant="contained" component={Link} to="/users" fullWidth>사용자 관리</Button>
        <Button variant="contained" component={Link} to="/departments" fullWidth>부서 관리</Button>
        <Button variant="contained" component={Link} to="/alerts" fullWidth>알림 전송</Button>
        <Button variant="contained" component={Link} to="/alert-list" fullWidth>알림 리스트</Button>
        <Button variant="contained" component={Link} to="/checklist" fullWidth>점검 체크리스트</Button>
        <Button variant="contained" component={Link} to="/checklist-groups" fullWidth>체크리스트 그룹</Button>
        <Button variant="contained" component={Link} to="/stats" fullWidth>점검 통계</Button>
      </Box>
    </Container>
  );
};

export default Menu;
