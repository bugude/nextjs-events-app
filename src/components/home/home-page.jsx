import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HomePage = ({ data }) => {
	return (
		<div className="home_page">
			{data.map((ec) => (
				<Link className="card" key={ec.id} href={`/events/${ec.id}`}>
					<Image src={ec.image} alt={ec.title} height="0" width="0" sizes="100vw" style={{ width: '50%', height: 'auto' }} />
					<div className="card_content">
						<h2> {ec.title}</h2>
						<p>{ec.description}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default HomePage;
