import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { CSVLink } from 'react-csv';

const InspectionStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const response = await axios.get('/api/stats');
    setStats(response.data);
  };

  return (
    <Container>
      <h2>점검 통계</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>점검 항목</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow key={index}>
              <TableCell>{stat.date}</TableCell>
              <TableCell>{stat.item}</TableCell>
              <TableCell>{stat.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary">
        <CSVLink data={stats} filename="inspection_stats.csv" style={{ textDecoration: 'none', color: 'white' }}>
          엑셀로 추출
        </CSVLink>
      </Button>
    </Container>
  );
};

export default InspectionStats;
