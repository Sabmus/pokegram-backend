const usersModel = require("../models/schemas/usersSchema.js");
const { hashPassword } = require("../utils/hash");

const API_URL = "https://beta.pokeapi.co/graphql/v1beta";
const headers = {
  "content-type": "application/json",
};
const graphqlQuery = {
  operationName: "fetchData",
  query: `query fetchData {
        pokemon_v2_pokemon {
          id
          name
          password: name
        }
    }`,
  variables: {},
};
const options = {
  method: "POST",
  headers: headers,
  body: JSON.stringify(graphqlQuery),
};

const fetchData = async () => {
  /** Fetch data from GraphQL Endpoint */
  console.log("fetching data...");
  const response = await fetch(API_URL, options).catch((error) =>
    console.log(error)
  );
  const results = await response.json();

  return results.data.pokemon_v2_pokemon;
};

const loadData = async () => {
  /** loads data, then insert to mongodb */

  // check if db has users
  const hasUsers = await usersModel.findOne({ id: 1 });

  if (hasUsers) {
    console.log("DB already has users");
    return;
  }

  const users = await fetchData();
  // load to database
  try {
    console.log("inserting into database");
    users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      const userWithHashedPassword = {
        ...user,
        password: hashedPassword,
      };
      usersModel.create(userWithHashedPassword);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loadData };
