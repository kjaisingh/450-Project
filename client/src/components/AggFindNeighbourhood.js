import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AggFindNeighbourhood extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="kushResults">
				<div className="name">{this.props.movie.locality}</div>
				<div className="picture">{this.props.movie.num}</div>
			</div>
		);
	};
};