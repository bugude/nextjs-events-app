import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const SingleEvent = ({ ev }) => {
	const inputEmailRef = useRef();
	const router = useRouter();
	const [message, setMessage] = useState();

	const onSubmit = async (e) => {
		e.preventDefault();
		const emailValue = inputEmailRef?.current.value;
		const eventId = router?.query.id;

		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!emailValue.match(validRegex)) {
			setMessage('Please enter correct Email Address');
		}

		try {
			const res = await fetch('/api/email-registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: emailValue,
					eventId,
				}),
			});
			const data = await res.json();
			console.log(data);
			setMessage(data.message);
			if (!res.ok) throw new Error(`Error: ${res.status} ${data.message}`);
			inputEmailRef.current.value = '';
		} catch (error) {
			console.log('ERROR', e);
		}
	};
	return (
		<div key={ev.id} className="event_single_page">
			<h2>{ev.title}</h2>
			<Image src={ev.image} alt={ev.title} width="0" height="0" sizes="100vw" style={{ width: '75%', height: 'auto' }} />
			<p>{ev.description}</p>
			<form onSubmit={onSubmit} className="email_registration">
				<label>Register for the Event: </label>
				<input ref={inputEmailRef} type="email" name="userEmail" id="userEmail" placeholder=" Email Address" />
				<button type="submit"> Submit</button>
			</form>
			<p>{message}</p>
		</div>
	);
};

export default SingleEvent;
