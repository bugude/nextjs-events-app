import React from 'react';
import EventCategory from '@/src/components/events/eventCategory';

const EventsCategoryPage = ({ cat, data }) => {
	return <EventCategory cat={cat} data={data} />;
};

export default EventsCategoryPage;

export async function getStaticPaths() {
	const data = await import('/data/data.json');
	const { events_categories } = data;
	// console.log(events_categories);
	const allPaths = events_categories.map((ec) => {
		return {
			params: {
				cat: ec.id.toString(),
			},
		};
	});
	// console.log(allPaths);

	return {
		paths: allPaths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const cat = context?.params.cat;
	// console.log(id);
	const { allEvents } = await import('/data/data.json');
	const data = allEvents.filter((ev) => ev.city.toString().toUpperCase() === cat.toString().toUpperCase());
	// console.log(data);
	return {
		props: {
			data,
			cat,
		},
	};
}
