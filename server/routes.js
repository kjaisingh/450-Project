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
  WITH tab1 AS (
    SELECT Location_type, Incident_ZIP, City, Borough, latitude, longitude, COUNT(*) as NumParties
    FROM Parties
    WHERE Borough = 'MANHATTAN'
    GROUP BY Location_type, Incident_ZIP, City, Borough, latitude, longitude
    ORDER BY NumParties DESC
    LIMIT 3), 
    tab2 AS 
    (SELECT A.listing_url, A.id, A.latitude, A.longitude, A.description, A.rating, A.neighbourhood
    FROM Lsting as A),
    tab3 AS 
    (SELECT A.listing_url, A.id, A.latitude, A.longitude, A.description, A.rating, A.neighbourhood, B.latitude as Blat, B.longitude as Blon
    FROM tab1 as B,tab2 as A),
    tab4 AS
      (SELECT DISTINCT listing_url, description, (latitude - Blat)*(latitude - Blat) + (longitude - Blon)*(longitude - Blon) as distance
      FROM tab3
      WHERE neighbourhood = 'Manhattan' AND description LIKE '%Parties%' AND description NOT LIKE '%no%' AND description NOT LIKE '%spartan%' AND description NOT LIKE '%soho%' AND description NOT LIKE '%queen%' AND description NOT LIKE '%quiet%'
      AND LENGTH(description) < 1000
      AND EXISTS
        (SELECT * 
        FROM Bars 
        WHERE ABS(Bars.latitude - tab3.latitude) <= .005 AND ABS(Bars.longitude - tab3.longitude) <= .005)
      ORDER BY (latitude - Blat)*(latitude - Blat) + (longitude - Blon)*(longitude - Blon) DESC)
    SELECT DISTINCT listing_url, description
    FROM tab4
    LIMIT 3;
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getQuietListings = (req, res) => {
  const query = `
  SELECT * FROM peacefulBnbs
  WHERE description LIKE '%peaceful%' AND description LIKE '%relax%'
  LIMIT 3;
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
  const wifi = req.params.wifiPresent;
  const tv = req.params.TVPresent;
  const refr = req.params.refrigerator;
  const kitch = req.params.kitchenPresent;
  var sh;
  var query;
  var w;
  var t;
  var k;
  var r;

  if (super_host === "No") {
    sh = 0;
  } else {
    sh = 1;
  }

  if (wifi == 'true') {
    w = "Wifi";
  } else {
    w = "";
  }

  if (tv == 'true') {
    t = "TV";
  } else {
    t = "";
  }

  if (kitch == 'true') {
    k = "Kitchen";
  } else {
    k = "";
  }

  if (refr == 'true') {
    r = "Refrigerator";
  } else {
    r = "";
  }

  if (wifi == 'false' && kitch == 'false' && refr == 'false' && tv == 'false') {

    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews, listing_url, picture_url, host_name, host_url 
    FROM Lsting
    WHERE host_is_superhost = '${sh}' AND accommodates >= '${ppl}'
    AND description LIKE '%${movie}' AND price <= '${price}'
    LIMIT 10;
    `;  
  } else {

    query = `

    WITH tab1 AS (SELECT Lsting.id, Lsting.name, reviews.comments, Lsting.amenities, 
    Lsting.room_type, Lsting.price, Lsting.listing_url, Lsting.picture_url,
    Lsting.host_name, Lsting.host_url 
    FROM Lsting JOIN reviews ON Lsting.id = reviews.listing_id 
    WHERE Lsting.price <= '${price}' AND Lsting.host_is_superhost = '${sh}' 
    AND Lsting.accommodates >= '${ppl}' AND description LIKE '%${movie}%'),
    tab2 AS (SELECT id, name, comments, amenities, room_type, price, 
    listing_url, picture_url, host_url, host_name 
    FROM tab1 
    WHERE amenities LIKE '%${w}%'),
    tab3 AS (SELECT id, name, comments, amenities, room_type, price, 
    listing_url, picture_url, host_url, host_name 
    FROM tab2 WHERE amenities LIKE '%${t}%'),
    tab4 AS (SELECT id, name, comments, amenities, room_type, price, 
    listing_url, picture_url, host_url, host_name
    FROM tab3 
    WHERE amenities LIKE '%${k}%')
    SELECT DISTINCT id, name, room_type, price, 
    listing_url, picture_url, host_url, host_name
    FROM tab3 
    WHERE amenities LIKE '%${r}%' AND (comments LIKE '% ${r} %' 
    OR comments LIKE '% ${k} %' OR comments LIKE '% ${w} %' OR comments LIKE '% ${t} %')
    LIMIT 10;

    `; 
  }
  console.log(query);

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
  const query = `
  SELECT DISTINCT AVG(rating) as avg, host_url, host_name
  FROM Lsting
  WHERE neighbourhood = '${borough}' AND host_total_listings_count >= 3 
  AND host_is_superhost = 1 AND number_of_reviews >= 10
  GROUP BY host_name
  ORDER BY avg DESC
  LIMIT 5;
  `;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


const getAgg = (req, res) => {
  const borough = req.params.recentReviewBorough;

  const query = `
  SELECT neighbourhood_cleansed AS locality, Count(*) AS num
  FROM Lsting 
  WHERE neighbourhood = '${borough}' 
  GROUP BY neighbourhood_cleansed 
  ORDER BY num DESC
  LIMIT 5;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


const getAirbnbPrice = (req, res) => {

  const filter = req.params.selectedFilter;
  const borough = req.params.selectedBorough_T10;
  var query;

  if (filter == "price") {
    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews, listing_url, picture_url
    FROM Lsting
    WHERE neighbourhood = '${borough}'
    ORDER BY price
    LIMIT 10;
  `;
  } else if (filter == "minimum_nights") {
    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews, listing_url, picture_url 
    FROM Lsting
    WHERE neighbourhood = '${borough}'
    ORDER BY minimum_nights DESC
    LIMIT 10;
    `;
  } else {
    query = `
    SELECT DISTINCT name, room_type, price, number_of_reviews, listing_url, picture_url
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
