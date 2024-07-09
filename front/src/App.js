import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import SendAlert from './components/SendAlert';
import Checklist from './components/Checklist';
import InspectionStats from './components/InspectionStats';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DepartmentManagement from './components/DepartmentManagement';
import UserAssignment from './components/UserAssignment';
import AlertList from './components/AlertList';
import ChecklistGroups from './components/ChecklistGroups';
import ChecklistCompletionList from './components/ChecklistCompletionList';
import ChecklistCompletion from './components/ChecklistCompletion';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container style={{ padding: '16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/departments" element={<DepartmentManagement />} />
            <Route path="/user-assignment" element={<UserAssignment />} />
            <Route path="/alerts" element={<SendAlert />} />
            <Route path="/alert-list" element={<AlertList />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/checklist-groups" element={<ChecklistGroups />} />
            <Route path="/checklist-completion" element={<ChecklistCompletion />} />
            <Route path="/checklist-completion-list" element={<ChecklistCompletionList />} />
            <Route path="/stats" element={<InspectionStats />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
