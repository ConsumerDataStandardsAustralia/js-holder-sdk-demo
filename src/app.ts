import express from 'express';
import endpoints from './data/endpoints.json';
import {cdrHeaders, cdrAuthorisation}  from 'dsb-middleware'
import { EndpointConfig } from 'dsb-middleware/src/models/endpoint-config';
import { ResponseErrorListV2 } from 'consumer-data-standards/common';


const app = express();
const port = 3000;

// the endpoint configuration file fort this server
const cdrOptions = [...endpoints] as EndpointConfig[];

app.use(cdrAuthorisation(cdrOptions));
app.use(cdrHeaders(cdrOptions));

let standardsVersion = '/cds-au/v1';

// this endpoint does NOT reequire authentication
app.get(`${standardsVersion}/energy/plans`, (req, res, next) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/accounts`, (req, res, next) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/accounts/:accountId`, (req, res, next) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});


// this endpoint requires authentication
app.get(`${standardsVersion}/banking/accounts/:accountId/balance`, (req, res, next) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/payments/scheduled`, (req, res, next) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

app.get('/', (req, res, next) => {
    console.log(`Received request on BASE ${port}`);
    res.send();
});


app.listen(port)
