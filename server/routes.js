const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
// Equivalent to: function getTop20Keywords(req, res) {}
const getTop20Keywords = (req, res) => {
  const query = `
  WITH tab1 AS (SELECT city, COUNT(*) AS num 
  FROM Airbnb GROUP BY city) 
  SELECT DISTINCT city 
  FROM tab1 
  ORDER BY num DESC 
  LIMIT 20;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q1b (Dashboard) ---- */
const getTopMoviesWithKeyword = (req, res) => {
  const inputKwd = req.params.keyword
  const query = `
  SELECT name, room_type, price 
  FROM Airbnb 
  WHERE city LIKE '${inputKwd}' 
  ORDER BY reviews_per_month DESC 
  LIMIT 10;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


/* ---- Q2 (Recommendations) ---- */
const getRecs = (req, res) => {
  const movie = req.params.movieName;
  const query = `
  WITH popular AS
    (SELECT movie_id, count(*) as count
    FROM cast_in
    WHERE cast_id IN
    (SELECT cast_id
    FROM cast_in JOIN movie ON cast_in.movie_id = movie.movie_id
    WHERE movie.title LIKE '${movie}')
    GROUP BY movie_id
    ORDER BY count DESC
    LIMIT 11)
  SELECT movie.title, movie.movie_id, movie.rating, movie.num_ratings
  FROM popular
  JOIN movie ON popular.movie_id = movie.movie_id
  WHERE movie.title <> '${movie}'
  ORDER BY popular.count DESC, movie.rating DESC, num_ratings DESC
  LIMIT 10;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


/* ---- Q3a (Best Movies) ---- */
const getDecades = (req, res) => {
  const query = `
  SELECT DISTINCT 10*FLOOR(release_year / 10) as decade  
  FROM movie
  ORDER BY decade;  
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- (Best Movies) ---- */
const getGenres = (req, res) => {
  const query = `
    SELECT name
    FROM genre
    WHERE name <> 'genres'
    ORDER BY name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */

const getPartyBnb = (req, res) => {
  const x = req.params.selectedBorough;
  var y = req.params.selectedParty;
  var a;
  var b;
  
  console.log("Borough is:" +x);

  var Manhattan = [0, 10, 25, 50, 100, 300];
  var Brooklyn = [0, 10, 20, 40, 100, 2000];
  var StatenIsland = [0, 2, 10, 21, 40, 65];
  var Queens = [0, 6, 10, 25, 50, 150];
  var Bronx = [0, 10, 30, 50, 100, 600];

  if(x === "Manhattan"){
    a = Manhattan[y-1];
    b = Manhattan[y];
  } else if(x === "Brooklyn") {
    a = Brooklyn[y-1];
    b = Brooklyn[y];
  } else if(x === "Queens"){
    a = Queens[y-1];
    b = Queens[y];
  } else if(x === "Staten Island"){
    a = StatenIsland[y-1];
    b = StatenIsland[y];
  } else{
    a = Bronx[y-1];
    b = Bronx[y];
  }
  console.log("A is:" +a);
  console.log("B is:" +b);


  const query = `
  WITH tab1 AS (
    SELECT latitude, longitude, COUNT(*) as NumParties
    FROM Parties
    WHERE Borough LIKE '${x}'
    GROUP BY latitude, longitude),
    tab2 AS 
    (SELECT * FROM tab1
    WHERE NumParties > '${a}' and NumParties <= '${b}'),
    tab3 AS 
    (SELECT * FROM Listings
    WHERE neighbourhood LIKE '${x}' ORDER BY number_of_reviews * rating)
    SELECT listing_url, price, rating, number_of_reviews, picture_url
    FROM tab3 JOIN tab2 ON ABS(tab3.latitude - tab2.latitude) <= .001 AND ABS(tab3.longitude - tab2.longitude) <= .001
    LIMIT 10;`;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
  
};

module.exports = {
	getTop20Keywords: getTop20Keywords,
	getTopMoviesWithKeyword: getTopMoviesWithKeyword,
	getRecs: getRecs,
  getDecades: getDecades,
  getGenres: getGenres,
  getPartyBnb: getPartyBnb
};
