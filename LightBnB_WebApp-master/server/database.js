const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  console.log("email:", email);
  const email2 = 'allisonjackson@mail.com'
  return pool
  // .query(`SELECT * FROM users WHERE users.email = '${email}';`)
  .query(`SELECT * FROM users WHERE users.email = $1;`, [email])
  .then((result) => {
    const user = result.rows[0];
    console.log(user);
    if (!user) {
      return console.log("Enter correct email/password!");
    }
    return user;
  })
  .catch((err) => {
    console.log("error:", err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  console.log("id:", id);
  return pool
  .query(`SELECT * FROM users WHERE users.id = $1;`, [id])
  .then((result) => {
    const user = result.rows[0];
    console.log("user:", user);
    if (!user) {
      return console.log("No ID!!");
    }
    return user;
  })
  .catch((err) => {
    console.log("error:", err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user.name, user.email, user.password]
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, values)
  .then((result) => {
    const newUser = result.rows[0].id;    
    return newUser;
  })
  .catch((err) => {
    console.log("error:", err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit];  
  return pool
    .query(`
    SELECT reservations.*, properties.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2
    ;`, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // console.log("options:", options);
  // console.log("opId:", options.owner_id);
  const city = options.city;
  const minPrice = options.minimum_price_per_night * 100;
  const maxPrice = options.maximum_price_per_night * 100;
  const minRating = options.minimum_rating;

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (city) {
    queryParams.push(`%${city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (minPrice) {
    queryParams.push(`${minPrice}`)
    if (queryParams.length >= 2) {
      queryString += `AND properties.cost_per_night >= $${queryParams.length} `;
    } else {
      queryString += `WHERE properties.cost_per_night >= $${queryParams.length} `;
    }
  }

  if (maxPrice) {
    queryParams.push(`${maxPrice}`)
    if (queryParams.length >= 2) {
      queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `WHERE properties.cost_per_night <= $${queryParams.length} `;
    }
  }

  if (minRating) {
    queryParams.push(`${minRating}`)
    if (queryParams.length >= 3) {
      queryString += `AND property_reviews.rating >= $${queryParams.length} `;
    } else {
     queryString += `WHERE property_reviews.rating >= $${queryParams.length} `;
    }
  }
  
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // console.log("qpl:", queryParams.length);
  // console.log();
  // console.log("qP:", queryParams);
  // console.log();
  // console.log("compass:", queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);


  // return pool
  //   .query(`SELECT * FROM properties LIMIT $1`, [limit])
  //   .then((result) => {
  //     return result.rows;
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });



//     SELECT properties.id, title, cost_per_night, AVG(property_reviews.rating) AS average_rating
// FROM properties
// JOIN property_reviews ON properties.id = property_id
// WHERE city
// LIKE '%ancouve%'
// GROUP BY properties.id
// HAVING AVG(property_reviews.rating) >= 4
// ORDER BY cost_per_night
// LIMIT 10
// ;



}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
