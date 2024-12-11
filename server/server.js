// const app = require("./app.js");
// const { connect, connection } = require("mongoose");
// const dotenv = require('dotenv');
// dotenv.config();

// async function server() {
//   try {
//     const mongoUrl = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_LOCAL;

//     app.listen(process.env.PORT_LOCAL, () => console.log(`Listening on port ${process.env.PORT_LOCAL}`));
//     connect(`${mongoUrl}/${process.env.DATABASE_NAME}`,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       }
//     )
//     connection.on('connected', () => {
//       console.log('Connected to MongoDB');
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// server();
const app = require("./app.js");
const { connect, connection } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

async function server() {
  try {
    const mongoUrl = process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URL_PROD
      : process.env.MONGO_URL_LOCAL;

    console.log(`Connecting to MongoDB (${process.env.NODE_ENV} environment)...`);

    // MongoDB Event Listeners
    connection.on('connected', () => {
      console.log('Successfully connected to MongoDB');
    });
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });
    connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    // Connect to MongoDB
    await connect(`${mongoUrl}/${process.env.DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Start the server after successful DB connection
    app.listen(process.env.PORT_LOCAL, () =>
      console.log(`Listening on port ${process.env.PORT_LOCAL}`)
    );

  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1); // Exit process on failure
  }
}

server();
