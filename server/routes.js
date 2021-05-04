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
  SELECT name, room_type, price, number_of_reviews FROM Airbnb
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
  var c;
  var d;
  
  console.log("Borough is:" +x);

  var Manhattan = [0, 10, 25, 50, 100, 300];
  var Brooklyn = [0, 10, 20, 40, 100, 2000];
  var StatenIsland = [0, 2, 10, 21, 40, 65];
  var Queens = [0, 6, 10, 25, 50, 150];
  var Bronx = [0, 10, 30, 50, 100, 600];

  var Manhattan2 = [0, 10, 20, 40, 100, 1300];
  var Brooklyn2 = [0, 10, 20, 40, 100, 2000];
  var StatenIsland2 = [0, 10, 20, 40, 60, 250];
  var Queens2 = [0, 10, 20, 85, 120, 400];
  var Bronx2 = [0, 10, 20, 50, 100, 200];

  if(x === "Manhattan"){
    a = Manhattan[y-1];
    b = Manhattan[y];
    c = Manhattan2[y-1];
    d = Manhattan2[y];
  } else if(x === "Brooklyn") {
    a = Brooklyn[y-1];
    b = Brooklyn[y];
    c = Brooklyn2[y-1];
    d = Brooklyn2[y];
  } else if(x === "Queens"){
    a = Queens[y-1];
    b = Queens[y];
    c = Queens2[y-1];
    d = Queens2[y];
  } else if(x === "Staten Island"){
    a = StatenIsland[y-1];
    b = StatenIsland[y];
    c = StatenIsland2[y-1];
    d = StatenIsland2[y];
  } else{
    a = Bronx[y-1];
    b = Bronx[y];
    c = Bronx2[y-1];
    d = Bronx2[y];
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
    (SELECT * 
    FROM Listings
    WHERE neighbourhood LIKE '${x}' ORDER BY number_of_reviews * rating),
  tab4 AS
    (SELECT id, name, listing_url, price, rating, number_of_reviews, picture_url
    FROM tab3 JOIN tab2 ON ABS(tab3.latitude - tab2.latitude) <= .001 AND ABS(tab3.longitude - tab2.longitude) <= .001
    LIMIT 20),
  tab5 AS 
    (SELECT * FROM Bars 
    WHERE Borough LIKE '${x}' and num_calls > '${c}' and num_calls <= '${d}'),
  tab6 AS
    (SELECT tab3.id, name, listing_url, price, rating, number_of_reviews, picture_url
    FROM tab3 JOIN tab5 ON ABS(tab3.latitude - tab5.latitude) <= .001 AND ABS(tab3.longitude - tab5.longitude) <= .001
    LIMIT 20),
  tab7 AS
    (SELECT * FROM tab4
    UNION
    SELECT * FROM tab6)
  SELECT DISTINCT id, name, listing_url, price, rating, number_of_reviews, picture_url FROM tab7
  ORDER BY number_of_reviews * rating DESC
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
