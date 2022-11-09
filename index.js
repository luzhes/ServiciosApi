const express = require('express');
const bodyParser = require('body-parser');
const tour_route = require('./routes/tourRoute');
const concert_route = require('./routes/concertRoute');
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const app = express();
var PORT = process.env.PORT || 8088;


const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dynamon Tour - Concert Service",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8082"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.json({ "Hi": "Hello World" })
})

app.use('/api', tour_route);
app.use('/api', concert_route);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))
app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})
