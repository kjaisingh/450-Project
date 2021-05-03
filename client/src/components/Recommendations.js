import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "shards-ui/dist/css/shards.min.css"
import { Slider } from "shards-react";



export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movieName: " ",
			recMovies: [],
			numberOfPeople: 1,
			superHostNeeded: "Yes",
			prefPrice:0
		};

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleSuperHostChange = this.handleSuperHostChange.bind(this);
		this.handleSlide = this.handleSlide.bind(this);
		
	};

	handleSuperHostChange(e2) {
		this.setState({
			superHostNeeded : e2.target.value
		})
	}

	handleSlide(e3) {
		this.setState({
			prefPrice: Math.round(parseFloat(e3[0]))
		});
	  }

	handleSizeChange(event) {
		this.setState({numberOfPeople: event.target.value
		})    
	  }

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	};

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitMovie() {
		// Send an HTTP request to the server.
        fetch("http://localhost:8081/find/" + this.state.movieName,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          // Map each keyword in this.state.keywords to an HTML element:
          // A button which triggers the showMovies function for each keyword.
          const recommendedDivs = movieList.map((movieObj, i) =>
            <RecommendationsRow movie = {movieObj}
            /> 
          );
    
          // Set the state of the keywords list to the value returned by the HTTP response from the server.
          this.setState({
            recMovies: recommendedDivs
          });
        });

	};

	
	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="Find an Airbnb" />

				<br />
				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Recommendations</div>
						<br></br>
						<div className="input-container">
							<input type='text' placeholder="Search for an Airbnb" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
						</div>
						<div>
							<header> Number of people</header>
							<input type="radio" value="1" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 1 ? "checked": null} /> 1
							<input type="radio" value="2" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 2 ? "checked": null} /> 2
							<input type="radio" value="3" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 3 ? "checked": null} /> 3
							<input type="radio" value="4" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 4 ? "checked": null}/> 4
							<input type="radio" value="5" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 5 ? "checked": null}/> 5
						</div>

						<div>
							<header> Is having a superhost essential to you?</header>
							<input type="radio" value="Yes" name="SuperHost" onChange = {this.handleSuperHostChange} checked = {this.state.superHostNeeded === "Yes" ? "checked": null}/> Yes 
							<input type="radio" value="No" name="SuperHost" onChange = {this.handleSuperHostChange} checked = {this.state.superHostNeeded === "No" ? "checked": null} /> No 
						</div>

						<div>
							<header>Price Limit</header>
							<Slider pips={{ mode: "steps", stepped: true, density: 10 }}
									step={50} onSlide={this.handleSlide} connect={[true, false]} 
									start={[this.state.prefPrice]} range={{ min: 0, max: 500 }}
							/>
						</div>

						<div className="header-container">
							<div className="headers">
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Room Type</strong></div>
								<div className="header"><strong>Price</strong></div>
								<div className="header"><strong>Number of Reviews</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.recMovies}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
