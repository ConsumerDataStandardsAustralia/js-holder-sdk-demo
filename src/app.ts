import express from 'express';
import endpoints from './data/endpoints.json';
import {cdrHeaders, cdrAuthorisation, DefaultBankingEndpoints}  from 'dsb-middleware'
import { EndpointConfig } from 'dsb-middleware/src/models/endpoint-config';


const app = express();
const port = 3000;

// the endpoint configuration file fort this server
const cdrOptions = [...endpoints] as EndpointConfig[];

app.use(cdrAuthorisation(cdrOptions));
app.use(cdrHeaders(cdrOptions));

// this endpoint does NOT reequire authentication
app.get('/energy/plans', (req, res, next) => {
    
    console.log(`Received request on ${port}`);
    res.send();
});

// this endpoint requires authentication
app.get('/energy/accounts', (req, res, next) => {
    console.log(`Received request on ${port}`);
    res.send();
});


// this endpoint requires authentication
app.get('/banking/accounts/:accountId/balance', (req, res, next) => {
    console.log(`Received request on ${port} for ${req.params.accountId}`);
    res.send(req.params.accountId);
});

// this endpoint requires authentication
app.get('/banking/payments/scheduled', (req, res, next) => {
    console.log(`Received request on ${port}`);
    res.send();
});

app.get('/', (req, res, next) => {
    console.log(`Received request on BASE ${port}`);
    res.send();
});


app.listen(port)
