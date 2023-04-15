import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EventCategory = ({ cat, data }) => {
	return (
		<div className="cat_events">
			<h1>EVENTS IN {cat.toString().toUpperCase()}</h1>
			<div className="content">
				{data.map((ev) => (
					<Link className="card" key={ev.id} href={`/events/${cat}/${ev.id}`} passHref>
						<Image src={ev.image} alt={ev.title} height={500} width={500} />
						<h2> {ev.title}</h2>
						<p> {ev.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default EventCategory;
