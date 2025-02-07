import { useReducer, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BillsTable from './components/BillsTable';
import LegislatorsTable from './components/LegislatorsTable';

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

  if (state.loading) {
    return <div className="loading">Loading data...</div>;
  }

  if (state.error) {
    return <div className="error">Error: {state.error}</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-container">
        <section className="table-section">
          <h2>Bills</h2>
          <BillsTable bills={state.bills} />
        </section>
        <section className="table-section">
          <h2>Legislators</h2>
          <LegislatorsTable legislators={state.legislators} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
