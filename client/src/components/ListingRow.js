import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingRow extends React.Component {
	render() {
		return (
			<div className="listingResults">
                <div className="listingname">{this.props.movie.name}</div>
				<div className="neighbourhood">{this.props.movie.neighbourhood}</div>
			</div>
		);
	};
};