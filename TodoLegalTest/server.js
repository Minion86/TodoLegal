var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');
http = require('http');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
        passengers(flightNumber: String): [Passenger]
    },

 type Passenger{
 id: Int
 passengerName: String
 passengerPassport: String
 flightNumber: String},

type Flight {
 id: Int
 flightNumber: String
 terminalNumber: String
 checkIn: String
 gate: String
 passengers: [Passenger]}
`);

var passengersData = [
    {
        id: 1,
        passengerName: 'Carlos',
        passengerPassport: 'A5511',
        flightNumber: '123'
    },
    {
        id: 2,
       passengerName: 'Rene',
        passengerPassport: 'A3344',
        flightNumber: '456'
    },
    {
        id: 3,
        passengerName: 'Diego',
        passengerPassport: 'A2233',
        flightNumber: '123'
    }
]

var getPassengersbyflight = function(args) {
    if (args.flightNumber) {
        var flightNumber = args.flightNumber;
        return passengersData.filter(passenger => passenger.flightNumber === flightNumber);
    } else {
        return passengersData;
    }
}

// The root provides a resolver function for each API endpoint
var root = {
    passengers: getPassengersbyflight
};




class Server {
    constructor(host, port) {
        this.express = express;
        this.app = express();
        this.app.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));
        this.server = http.Server(this.app);

        this.server.listen(port, (err) => {
            console.log('Running a GraphQL API server at http://localhost:4000/graphql');
        });

    }
}

module.exports = {
    server: Server
}





