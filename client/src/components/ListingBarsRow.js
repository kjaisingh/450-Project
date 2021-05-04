import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingBarsRow extends React.Component {
	render() {
		return (
			<div className="barResults">
                <div className="address">{this.props.movie.Incident_ZIP}</div>
				<div className="distance">{this.props.movie.num_calls}</div> 
			</div>
		);
	};
};
