import SingleEvent from '@/src/components/events/single-event';
import React from 'react';

const SingleEventPage = ({ data }) => {
	return data.map((ev) => <SingleEvent key={ev.id} ev={ev} />);
};

export default SingleEventPage;

export async function getStaticPaths() {
	const { allEvents } = await import('/data/data.json');
	const allPaths = allEvents.map((path) => {
		return {
			params: {
				cat: path.city.toString().toLowerCase(),
				id: path.id,
			},
		};
	});

	return {
		paths: allPaths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const eventId = context?.params.id;
	const { allEvents } = await import('/data/data.json');
	const data = allEvents.filter((ev) => ev.id === eventId);
	return {
		props: {
			data,
		},
	};
}
