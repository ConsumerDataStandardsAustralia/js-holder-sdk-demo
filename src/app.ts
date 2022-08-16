import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import {cdrHeaders, cdrAuthorisation, cdrJwtScopes, DsbAuthConfig, EndpointConfig, CdrConfig}  from 'dsb-middleware'
import bodyParser from 'body-parser';


const exp = express;
const app = express();
const port = 3000;
let standardsVersion = '/cds-au/v1';

// the endpoint configuration file fort this server
const dsbEndpoints = [...endpoints] as EndpointConfig[];

// Used in cdrJwtScopes. This configuration is specific to the DSB mock data holder
// ie access token is JWT and scope in that token is a space delimited string
const authOptions: DsbAuthConfig = {
    scopeFormat: 'STRING',
    endpoints: dsbEndpoints
}

// Used cdrAuthorisation and cdrHeaders. 
const dsbOptions: CdrConfig = {
    endpoints: dsbEndpoints
}

// This middle ware will extend the request object with the scopes.
// It can be used for any IDAM where the access token is a JWT and the 
// scope property is either an array of string or a space seperated string
app.use(cdrJwtScopes(authOptions));

// This middle ware will check access tokens for existence and scope
app.use(cdrAuthorisation(dsbOptions));

// this middle ware will handle the boilerplate validation and setting for a number of header parameters
app.use(cdrHeaders(dsbOptions));




// this endpoint does NOT reequire authentication
app.get(`${standardsVersion}/energy/plans`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/accounts`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/accounts/:accountId`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

app.post(`${standardsVersion}/energy/electricity/servicepoints/usage`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/accounts/:accountId/balance`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/payments/scheduled`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

app.get('/', (req, res, next) => {
    console.log(`Received request on BASE ${port}`);
    res.send();
});


app.listen(port)
