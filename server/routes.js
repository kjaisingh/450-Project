const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Dashboard ---- */
const getTop20Keywords = (req, res) => {
  /*
  TEST CODE
  */
  const query = `
    SELECT DISTINCT neighbourhood_cleansed AS neighbourhood
    FROM Lsting WHERE neighbourhood LIKE 'Manhattan' AND neighbourhood_cleansed NOT LIKE '%Harlem%'
    LIMIT 20;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getTopMoviesWithKeyword = (req, res) => {
  const inputKwd = "%"+req.params.keyword+"%";
  const query = `
  SELECT name, room_type, price 
  FROM Lsting
  WHERE neighbourhood_cleansed LIKE '${inputKwd}' 
  ORDER BY reviews_per_month DESC 
  LIMIT 10;
`;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getLoudListings = (req, res) => {
  const query = `
    SELECT name, neighbourhood_cleansed AS neighbourhood
    FROM Lsting
    WHERE price > 100
    LIMIT 5;
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getQuietListings = (req, res) => {
  const query = `
    SELECT DISTINCT name, neighbourhood_cleansed AS neighbourhood
    FROM Lsting
    WHERE price < 100
    LIMIT 5;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Find an AirBNB ---- */
const getRecs = (req, res) => {
  const movie = req.params.movieName;
  const price = req.params.prefPrice;
  const super_host = req.params.superHostNeeded;
  const ppl = req.params.numberOfPeople;
  var sh;

  if (super_host === "No") {
    sh = 0;
  } else {
    sh = 1;
  }
  console.log(movie);
  console.log(price);
  console.log(ppl);
  console.log(super_host);

  const query = `
  SELECT DISTINCT name, room_type, price, number_of_reviews 
  FROM Lsting
  WHERE host_is_superhost = '${sh}' AND accommodates >= '${ppl}'
  AND amenities LIKE '%${movie}' AND price <= '${price}'
  LIMIT 10;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};

const getFilter = (req, res) => {
  const query = `
  SELECT DISTINCT neighbourhood
  FROM Lsting
  LIMIT 5;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};

const getReviewPic = (req, res) => {

  const borough = req.params.selectedBorough_topHosts;
  console.log(borough);

  const query = `
  SELECT DISTINCT name, picture_url
  FROM Lsting
  WHERE neighbourhood = '${borough}'
  ORDER BY number_of_reviews DESC
  LIMIT 5;
`;
console.log(query);

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


const getAgg = (req, res) => {

  const borough = req.params.recentReviewBorough;
  console.log(borough);

  const query = `
  SELECT neighbourhood_cleansed AS locality, Count(*) AS num, name, price 
  FROM Lsting 
  WHERE neighbourhood = '${borough}' 
  GROUP BY neighbourhood_cleansed 
  ORDER BY num DESC
  LIMIT 5;
`;
console.log(query);

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


const getAirbnbPrice = (req, res) => {

  const filter = req.params.selectedFilter;
  const borough = req.params.selectedBorough_T10;
  var query;

  console.log(filter);
  console.log(borough);


  if (filter == "price") {
    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews 
    FROM Lsting
    WHERE neighbourhood = '${borough}'
    ORDER BY price
    LIMIT 10;
  `;
  } else if (filter == "minimum_nights") {
    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews 
    FROM Lsting
    WHERE neighbourhood = '${borough}'
    ORDER BY minimum_nights DESC
    LIMIT 10;
    `;
  } else {
    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews 
    FROM Lsting
    WHERE neighbourhood = '${borough}'
    ORDER BY reviews_per_month DESC
    LIMIT 10;
  `;
  }

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


/* ---- The New York Party Experience ---- */
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

const getPartyBnb = (req, res) => {
  const x = req.params.selectedBorough;
  var y = req.params.selectedParty;
  var z = req.params.selectedBar;
  var a;
  var b;
  var c;
  var d;
  
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
    c = Manhattan2[z-1];
    d = Manhattan2[z];
  } else if(x === "Brooklyn") {
    a = Brooklyn[y-1];
    b = Brooklyn[y];
    c = Brooklyn2[z-1];
    d = Brooklyn2[z];
  } else if(x === "Queens"){
    a = Queens[y-1];
    b = Queens[y];
    c = Queens2[z-1];
    d = Queens2[z];
  } else if(x === "Staten Island"){
    a = StatenIsland[y-1];
    b = StatenIsland[y];
    c = StatenIsland2[z-1];
    d = StatenIsland2[z];
  } else{
    a = Bronx[y-1];
    b = Bronx[y];
    c = Bronx2[z-1];
    d = Bronx2[z];
  }

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
      FROM Lsting
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
    LIMIT 10;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getBarResults = (req, res) => {
  const inputId = req.params.id;
  const query = `
  WITH tab1 as
	(Select latitude, longitude 
    FROM Lsting WHERE id = '${inputId}'),
tab2 as
	(Select a.address, a.latitude, a.longitude
	From tab1 
	JOIN addresses a ON ABS(a.latitude - tab1.latitude) <= .01 AND ABS(a.longitude - tab1.longitude) <= .01
	LIMIT 10)
  SELECT * FROM tab2;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getReviewResults = (req, res) => {
  const inputId = req.params.id;
  const query = `
    SELECT reviewer_name, comments
    FROM reviews
    WHERE listing_id = '${inputId}' AND LENGTH(comments) > 200 AND LENGTH(comments) < 350
    LIMIT 5;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- App ---- */
module.exports = {
	getTop20Keywords: getTop20Keywords,
	getTopMoviesWithKeyword: getTopMoviesWithKeyword,
  getLoudListings: getLoudListings,
  getQuietListings: getQuietListings,

	getRecs: getRecs,
  getFilter: getFilter,
  getAirbnbPrice: getAirbnbPrice,
  getReviewPic: getReviewPic,
  getAgg: getAgg,

  getDecades: getDecades,
  getGenres: getGenres,

  getPartyBnb: getPartyBnb,
  getBarResults: getBarResults,
  getReviewResults: getReviewResults
};
