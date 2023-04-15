import EventsPage from '@/src/components/events/events-page';
import React from 'react';

const Events = ({ data }) => {
	return <EventsPage data={data} />;
};

export default Events;

export async function getStaticProps() {
	const { events_categories } = await import('/data/data.json');
	// console.log(events_categories);
	return {
		props: {
			data: events_categories,
		},
	};
}
