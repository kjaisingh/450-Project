import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingBarsRow extends React.Component {
	render() {
		return (
			<div className="barResults">
                <div className="address">{this.props.movie.address}</div>
			</div>
		);
	};
};