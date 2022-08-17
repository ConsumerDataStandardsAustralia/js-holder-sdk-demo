import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import {cdrHeaders, cdrAuthorisation, cdrJwtScopes, DsbAuthConfig, EndpointConfig, CdrConfig}  from 'dsb-middleware'

const exp = express;
const app = express();
const port = 3000;
let standardsVersion = '/cds-au/v1';

// the endpoint configuration file fort this server, which endpoints does this server implement
// The dsb-middleware also has constants for DefaultBankingEndpoints and DefaultEnergyEndpoints
// These can be used as defaults if the server implements all CDR endpoints
// eg 
//          const dsbOptions: CdrConfig = {
//              endpoints: DefaultBankingEndpoints
//          }
const dsbEndpoints = [...endpoints] as EndpointConfig[];

// Used in cdrJwtScopes. This configuration assumes that the IdAM issues a JWT
// ie access token is JWT and scope in that token is a space delimited string
const authOptions: DsbAuthConfig = {
    scopeFormat: 'STRING',
    endpoints: dsbEndpoints,
}

// Used in the cdrAuthorisation and cdrHeaders functions. 
const dsbOptions: CdrConfig = {
    endpoints: dsbEndpoints
}

// This middle ware will extend the request object with the scopes.
// It can be used for any IdAM where the access token is a JWT and the 
// scope property is either an array of string or a space separated string
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
