import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AggFindNeighbourhood extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="reviewResults">
				<div className="Neighbourhood">{this.props.movie.locality}</div>
				<div className="Number">{this.props.movie.num}</div>
			</div>
		);
	};
};