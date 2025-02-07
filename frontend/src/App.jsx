import { useReducer, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BillsTable from './components/BillsTable';
import LegislatorsTable from './components/LegislatorsTable';

// MUI components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const initialState = {
  bills: {},
  legislators: {},
  loading: true,
  error: null,
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        bills: action.payload.bills,
        legislators: action.payload.legislators,
        loading: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billsRes, legislatorsRes] = await Promise.all([
          fetch('http://localhost:3000/api/bills'),
          fetch('http://localhost:3000/api/legislators'),
        ]);

        if (!billsRes.ok || !legislatorsRes.ok) {
          throw new Error('Failed to fetch data from the API.');
        }

        const billsData = await billsRes.json();
        const legislatorsData = await legislatorsRes.json();

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: { bills: billsData, legislators: legislatorsData },
        });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'FETCH_FAILURE', payload: { error: err.message } });
      }
    };

    fetchData();
  }, []);

  // Display a full-screen loading indicator while fetching data.
  if (state.loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Display an error alert if data fetching fails.
  if (state.error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Error: {state.error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'legislator.main' }}>
            Legislators&apos; Support on Bills
          </Typography>
          <LegislatorsTable legislators={state.legislators} />
        </Box>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'bill.main' }}>
            List of Bills
          </Typography>
          <BillsTable bills={state.bills} />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
