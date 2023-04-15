import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EventsPage = ({ data }) => {
	return (
		<div>
			<h1> Events Page </h1>
			<div className="events_page">
				{data.map((ec) => (
					<Link className="card" key={ec.id} href={`/events/${ec.id}`}>
						<Image src={ec.image} alt={ec.title} height={500} width={500} />
						<h2>{ec.title}</h2>
					</Link>
				))}
			</div>
		</div>
	);
};

export default EventsPage;
