import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "shards-ui/dist/css/shards.min.css"
import 'react-dropdown/style.css';
import "react-vis/dist/style.css";

import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import AirbnbPriceRow from './AirbnbPriceRow';
import FindReviewRow from './FindReviewRow';
import AggFindNeighbourhood from './AggFindNeighbourhood';
import Footer from "./Footer";

import Dropdown from 'react-dropdown';
import Select from 'react-select';
import { Slider } from "shards-react";
import { Button } from "shards-react";
import { FormInput } from "shards-react";
import { FormCheckbox } from "shards-react";
import { FormRadio } from "shards-react";
import {XYPlot, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines, LineSeries} from 'react-vis';

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movieName: "",
			recMovies: [],
			numberOfPeople: 1,
			superHostNeeded: "Yes",
			amenityVerification: "Yes",
			prefPrice:250,
			selectedFilter: "minimum_nights",
			selectedBorough_T10: "Manhattan",
			decades: [],
			selectedBorough_topHosts: "Manhattan",
			hostResults: [],
			reviewResults: [],
			hostChart: [],
			neighbourhoodChart: [],
			refrigerator: false,
			bathtub: false,
			heating: false,
			smokeAlarm: false,
			wifiPresent: false,
			TVPresent: false,
			kitchenPresent: false,
			washerPresent: false,
			recentReviewBorough: "Manhattan",
			filterResults: [],
			x: "two",
			y: "three",
			options: [
				{ value: 'Manhattan', label: 'Manhattan' },
				{ value: 'Queens', label: 'Queens' },
				{ value: 'Brooklyn', label: 'Brooklyn' },
				{value: 'Bronx', label: 'Bronx'},
				{value: 'Staten Island', label: 'Staten Island'}
			  ]
		};

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleSuperHostChange = this.handleSuperHostChange.bind(this);
		this.handleSlide = this.handleSlide.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleBoroughT10Change = this.handleBoroughT10Change.bind(this);
		this.handleBoroughTopHostsChange = this.handleBoroughTopHostsChange.bind(this);
		this.handleAmenityVerificationChange = this.handleAmenityVerificationChange.bind(this);
		this.handleFridgeChange = this.handleFridgeChange.bind(this);
		this.handleTVChange = this.handleTVChange.bind(this);
		this.handleWifiChange = this.handleWifiChange.bind(this);
		this.handleKitchenChange = this.handleKitchenChange.bind(this);
		this.submitFilterAndBorough = this.submitFilterAndBorough.bind(this);
		this.submitBoroughToHosts = this.submitBoroughToHosts.bind(this);
		this.handleReviewBoroughChange = this.handleReviewBoroughChange.bind(this);
		this.submitReviews = this.submitReviews.bind(this);
		this.handleDropDownBoroughChange = this.handleDropDownBoroughChange.bind(this);
		this.handleDropDownTopHostsBoroughChange = this.handleDropDownTopHostsBoroughChange.bind(this);
		this.handleDropDownRecentReviewBoroughChange = this.handleDropDownRecentReviewBoroughChange.bind(this);
		
		const options = [
			{ value: 'Manhattan', label: 'Manhattan' },
			{ value: 'Queens', label: 'Queens' },
			{ value: 'Brooklyn', label: 'Brooklyn' },
			{value: 'Bronx', label: 'Bronx'},
			{value: 'Staten Island', label: 'Staten Island'}
		  ];
	};

	handleKitchenChange(e9) {
		this.setState({
			kitchenPresent: e9.target.checked
		})
	}

	handleTVChange(e9) {
		this.setState({
			TVPresent: e9.target.checked
		})
	}

	handleWifiChange(e9){
		this.setState({
			wifiPresent: e9.target.checked
		})
	}

	handleFridgeChange(e8) {
		this.setState({
			refrigerator : e8.target.checked
		})
	}

	handleReviewBoroughChange(e9) {
		this.setState({
			recentReviewBorough: e9.target.value
		})
	}

	handleAmenityVerificationChange(e7) {
		this.setState({
			amenityVerification : e7.target.value
		})
	}

	handleBoroughT10Change(e5) {
		this.setState({
			selectedBorough_T10 : e5.target.value
		})
	}

	handleBoroughTopHostsChange(e6) {
		this.setState({
			selectedBorough_topHosts : e6.target.value
		})
	}

	handleSuperHostChange(e2) {
		this.setState({
			superHostNeeded : e2.target.value
		})
	}

	handleFilterChange(e4) {
		this.setState({
			selectedFilter : e4.target.value
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

	handleDropDownBoroughChange = (selectedOption) => {
		this.setState({selectedBorough_T10: selectedOption.value }, () =>
		  console.log(`Option selected:`, this.state.selectedBorough_T10)
		);
	  };

	handleDropDownTopHostsBoroughChange = (selectedOption) => {
	this.setState({selectedBorough_topHosts: selectedOption.value }, () =>
		console.log(`Option selected:`, this.state.selectedBorough_topHosts)
	);
	};

	handleDropDownRecentReviewBoroughChange = (selectedOption) => {
	this.setState({recentReviewBorough: selectedOption.value }, () =>
		console.log(`Option selected:`, this.state.recentReviewBorough)
	);
	};

	componentDidMount() {
		fetch("http://localhost:8081/find",
		{
		  method: 'GET'
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(decadesList => {
		  if (!decadesList) return;
		  const decadeDivs = decadesList.map((movieObj, i) =>
			<option className="decadesOption" value={movieObj.neighbourhood}>{movieObj.neighbourhood}</option>
          );
		  this.setState({
			decades: decadeDivs
		  });
		});
	}

	submitMovie() {
		const l = document.querySelector(".hello");

		if (this.state.movieName === "") {
			this.setState({
				movieName: " "
			  });
		}
        fetch("http://localhost:8081/find/" + this.state.movieName + "/" + this.state.numberOfPeople + "/" + this.state.superHostNeeded + "/" + this.state.prefPrice + "/" + this.state.wifiPresent + "/" + this.state.TVPresent + "/" + this.state.kitchenPresent + "/" + this.state.refrigerator,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          if(movieList.length === 0) {
          	console.log("error");
          	l.style.opacity = "1";
          } else {
          	l.style.opacity = "0";
          }
          const recommendedDivs = movieList.map((movieObj, i) =>
            <RecommendationsRow movie = {movieObj}
            /> 
          );
          this.setState({
            recMovies: recommendedDivs
          });
        });

	};

	submitFilterAndBorough() {
		console.log(this.state.selectedBorough_T10);
		fetch("http://localhost:8081/find/" + this.state.selectedFilter + "/" + this.state.selectedBorough_T10,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          const movieDivs = movieList.map((movieObj, i) =>
            <AirbnbPriceRow movie = {movieObj}/> 
          );
          this.setState({
            filterResults: movieDivs
          });
        }, err => {
          console.log(err);
        });
	};

	submitBoroughToHosts() {
		fetch("http://localhost:8081/find/" + this.state.selectedBorough_topHosts,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
			if (!movieList) return;
			console.log(movieList);
			const movieDivs = movieList.map((movieObj, i) =>
				<FindReviewRow movie = {movieObj}/> 
			);
			const graphData = movieList.map((movieObj, i) =>
				({x: movieObj.host_name, y: movieObj.avg})
			);
			const maxRating = Math.max.apply(Math, graphData.map(function(o) { return o.y; }))
			const graphImage = 
			<XYPlot xType="ordinal" width={450} height={300} yDomain={[0, maxRating]}>
				<XAxis />
				<YAxis />
				<VerticalBarSeries data={graphData}/>
			</XYPlot>
          this.setState({
            hostResults: movieDivs,
			hostChart: graphImage
          });
        }, err => {
          console.log(err);
        });
	};

	submitReviews() {
		fetch("http://localhost:8081/find/" + this.state.recentReviewBorough + "/" +  this.state.x + "/" +  this.state.y,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
			if (!movieList) return;
			const movieDivs = movieList.map((movieObj, i) =>
				<AggFindNeighbourhood movie = {movieObj}/> 
			);
			const graphData = movieList.map((movieObj, i) =>
				({x: movieObj.locality, y: movieObj.num})
			);
			const maxListings = Math.max.apply(Math, graphData.map(function(o) { return o.y; }))
			const graphImage = 
			<XYPlot xType="ordinal" width={450} height={300} yDomain={[0, maxListings]}>
				<XAxis />
                <YAxis />
                <VerticalBarSeries data={graphData}/>
      		</XYPlot>
			this.setState({
				reviewResults: movieDivs,
				neighbourhoodChart: graphImage
			});
        }, err => {
          console.log(err);
        });
	};
	
	render() {
		const { selectedBorough_T10 } = this.state;
		return (
			<div className="Recommendations">
				{/* <PageNavbar active="Find an Airbnb" /> */}
				<div className="heading"> 
						<div className="headingText"> 
						Find an Airbnb
						</div>
				</div>
				<br />
				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Top 5 Filter</div>
						<br></br>

						<div>
							<header><strong>Filter</strong></header>
							<FormRadio inline value="minimum_nights" name="Filter"  onChange = {this.handleFilterChange} checked = {this.state.selectedFilter === "minimum_nights" ? "checked": null}>
            					Minimum Nights
         		 			</FormRadio>
							<FormRadio inline value="price" name="Filter"  onChange = {this.handleFilterChange} checked = {this.state.numberOfPeople === "price" ? "checked": null}>
            					Price
         		 			</FormRadio>
							<FormRadio inline value="number_of_reviews" name="Filter"  onChange = {this.handleFilterChange} checked = {this.state.numberOfPeople === "number_of_reviews" ? "checked": null}>
            					Number of Reviews
         		 			</FormRadio>
						</div>

						<div className="dropdown-container">
							<strong>Borough</strong>:
							<br></br>
							<Select
								value={{label : this.state.selectedBorough_T10}}
								onChange={this.handleDropDownBoroughChange}
								options={this.state.options}
							/>
							<br></br>
							<Button pill theme="secondary" size="sm" className="submit-btn" id="submitT10Filter" onClick={this.submitFilterAndBorough}>Submit</Button>
						</div>
						
						<div className="header-container">
							<div className="headers">
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Room Type</strong></div>
								<div className="header"><strong>Price (per night)</strong></div>
								<div className="header"><strong>Number of Reviews</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.filterResults}
						</div>

					</div>
				</div>

				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Recommendations</div>
						<br></br>
						<div className="input-container">
							<header><strong>Search Description for Keywords</strong></header>
							<FormInput width="100" type='text' placeholder="Enter Description Keyword" required="required" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
						</div>
						<p class="hello">No Results Found: Adjust Keywords/Price</p>
						<div>
							<header><strong>Number of People</strong></header>
							<FormRadio inline value="1" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 1 ? "checked": null}>
            					1
         		 			</FormRadio>
							<FormRadio inline value="2" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 2 ? "checked": null}>
            					2
         		 			</FormRadio>
							<FormRadio inline value="3" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 3 ? "checked": null}>
            					3
         		 			</FormRadio>
							<FormRadio inline value="4" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 4 ? "checked": null}>
            					4
         		 			</FormRadio>
							<FormRadio inline value="5" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 5 ? "checked": null}>
            					5
         		 			</FormRadio>
						</div>

						<div>
							<header><strong>Superhost Required</strong></header>
							<FormRadio inline value="Yes" name="SuperHost" onChange = {this.handleSuperHostChange} checked = {this.state.superHostNeeded === "Yes" ? "checked": null}>
            					Yes
         		 			</FormRadio>
							<FormRadio inline value="No" name="SuperHost" onChange = {this.handleSuperHostChange} checked = {this.state.superHostNeeded === "No" ? "checked": null}>
            					No
         		 			</FormRadio>
						</div>

						<div>
						<strong>Amenities</strong>
						</div>

						<div>
							<FormCheckbox inline name="refrigerator" checked = {this.state.refrigerator} onChange = {this.handleFridgeChange}>
								Refrigerator
							</FormCheckbox>

							<FormCheckbox inline name="wifi" checked = {this.state.wifiPresent} onChange = {this.handleWifiChange}>
								Wifi
							</FormCheckbox>

							<FormCheckbox inline name="TV" checked = {this.state.TVPresent} onChange = {this.handleTVChange}>
								Television
							</FormCheckbox>

							<FormCheckbox inline name="Kitchen" checked = {this.state.KitchenPresent} onChange = {this.handleKitchenChange}>
								Kitchen
							</FormCheckbox>	
						</div>

						<div>
							<header><strong>Price Limit</strong></header>
							<Slider pips={{ mode: "steps", stepped: true, density: 10 }}
									step={50} onSlide={this.handleSlide} connect={[true, false]} 
									start={[this.state.prefPrice]} range={{ min: 0, max: 500 }}
							/>
						</div>

						<div>
						<Button pill theme="secondary" size="sm" id="submitSearch" className="submit-btn" onClick={this.submitMovie}>Submit</Button>
						</div>

						<div className="header-container">
							<div className="headers">
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Room Type</strong></div>
								<div className="header"><strong>Price (per night)</strong></div>
								<div className="header"><strong>Host Name</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.recMovies}
						</div>
					</div>
				</div>

				<div className="container recommendations-container">
						<div class="row">
							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header className="h6">Top Hosts by Reviews</header>
								<div className="movies-container">
									<div className="dropdown-container">
										<strong>Borough</strong>
										<br />
										<br />
										<Select
											value={{label : this.state.selectedBorough_topHosts}}
											onChange={this.handleDropDownTopHostsBoroughChange}
											options={this.state.options}
										/>
										<br />
										<Button pill theme="secondary" size="sm" className="submit-btn" id="submitHostFilter" onClick={this.submitBoroughToHosts}>Submit</Button>
										<br />
										<br />
									</div>									
									<div className="kushResults">
										<div className="header"><strong>Name</strong></div>
										<div className="header"><strong>Average Rating</strong></div>
									</div>
									<div className="movies-container" id="results">
										{this.state.hostResults}
									</div>
									<br />
									<div>
										{this.state.hostChart}
									</div>
								</div>
							</div>
							</div>
							
							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header className="h6">Neighbourhood Availability</header>
								<div className="movies-container">
									<div className="dropdown-container">
										<strong>Borough</strong>
										<br />
										<br />
										<Select
											value={{label : this.state.recentReviewBorough}}
											onChange={this.handleDropDownRecentReviewBoroughChange}
											options={this.state.options}
										/>
										<br />
										<Button pill theme="secondary" size="sm" className="submit-btn" id="submitReviewBorough" onClick={this.submitReviews}>Submit</Button>
										<br />
										<br />
									</div>
									<div className="kushResults">
										<div className="header"><strong>Borough</strong></div>
										<div className="header"><strong>Total Number of Listings</strong></div>
									</div>
									<div className="movies-container" id="results">
										{this.state.reviewResults}
									</div>
									<br />
									<div>
										{this.state.neighbourhoodChart}
									</div>
								</div>
							</div>
							</div>

						</div>

					</div>
					<div>
						<Footer />
					</div>
			</div>
			

		);
	};
};