import { readFileSync, writeFile, writeFileSync } from 'fs';
import path from 'path';

function buildPath() {
	return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath) {
	const jsonData = readFileSync(filePath);
	const data = JSON.parse(jsonData);
	return data;
}

export default function handler(req, res) {
	const { method } = req;

	const filePath = buildPath();
	const data = extractData(filePath);
	if (!data) {
		return res.status(404).json({
			status: 404,
			message: 'Event Data not found',
		});
	}

	if (method === 'POST') {
		const { email, eventId } = req.body;

		const { allEvents } = data;

		if (!email | !email.includes('@')) {
			res.status(422).json({ message: 'Invalid Email Address' });
		}

		const newAllEvents = allEvents.map((event) => {
			if (event.id === eventId) {
				if (event.emails_registered.includes(email)) {
					res.status(409).json({
						message: `Email with ${email} has already been registered`,
					});
					return event;
				}
				return {
					...event,
					emails_registered: [...event.emails_registered, email],
				};
			}
			return event;
		});

		data.allEvents = newAllEvents;

		writeFileSync(filePath, JSON.stringify(data));

		res.status(200).json({ message: `You have been successfully registered: ${email}` });
	}
}
