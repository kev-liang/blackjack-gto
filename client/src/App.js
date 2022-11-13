import './App.css';
import Table from './components/Table';
import CardActions from './components/CardActions';
import React from 'react';
import TableService from './services/TableService';

function App() {
	React.useEffect(() => {
		TableService.initTable(1);
		console.log('use effect');
	}, []);
	return (
		<div className='App'>
			<Table></Table>
			<CardActions></CardActions>
		</div>
	);
}

export default App;
