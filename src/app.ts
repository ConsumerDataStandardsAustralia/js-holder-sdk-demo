import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import {cdrHeaders, cdrAuthorisation, cdrJwtScopes, DsbAuthConfig, EndpointConfig, CdrConfig}  from 'dsb-middleware'
import bodyParser from 'body-parser';


const exp = express;
const app = express();
const port = 3000;

// the endpoint configuration file fort this server
const dsbEndpoints = [...endpoints] as EndpointConfig[];


const authOptions: DsbAuthConfig = {
    scopeFormat: 'STRING',
    endpoints: dsbEndpoints
}

const dsbOptions: CdrConfig = {
    endpoints: dsbEndpoints
}

//app.use(exp.json());
//app.use(cdrJwtScopesListSeparated);
app.use(bodyParser);
app.use(cdrJwtScopes(authOptions));
app.use(cdrAuthorisation(dsbOptions));
app.use(cdrHeaders(dsbOptions));


let standardsVersion = '/cds-au/v1';

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
