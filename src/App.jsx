import './App.css';
import { Button } from './common/Button/Button';
import { useState, useEffect } from 'react';

import { URL } from './apiEndPoint';
import { Error } from './common/Error/Error';
import { Loading } from './common/Loading/Loading';

function App() {
	const [isFetched, setIsFetched] = useState(false);
	const [spreadsheetID, setspreadsheetsID] = useState('');
	const [spreadSheetURL, setspreadSheetURL] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const createSS = async () => {
		setLoading(true);
		await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				setLoading(false);
				setspreadsheetsID(data.spreadsheetId);
				setspreadSheetURL(
					`https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit#gid=1`
				);
			})
			.catch((err) => {
				setLoading(false);
				setError('fail:' + err.message);
			});
	};
	useEffect(() => {
		createSS();
	}, []);

	async function handleClick() {
		setLoading(true);
		await fetch(`http://localhost:8080/fetchdata/${spreadsheetID}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				response.json();
				console.log(response);
			})
			.then(() => {
				setLoading(false);
				setIsFetched(true);
			})
			.catch((err) => {
				setLoading(false);
				setError('fail:' + err.message);
			});
	}

	return (
		<div className='App'>
			<div className='info-block'>
				{error ? <Error errortext={error} /> : ''}
				{loading ? <Loading /> : ''}
			</div>

			<div className='container'>
				<Button buttonText={'fetch data'} onClick={handleClick}></Button>
				{isFetched ? (
					<a href={spreadSheetURL} className='linktosheets'>
						GO TO GOOGLESHEETS
					</a>
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default App;
