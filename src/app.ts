import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import { EndpointConfig, CdrConfig, cdrScopeValidator, cdrHeaderValidator, cdrAuthenticationValidator, cdrEndpointValidator, IUserService}  from '@cds-au/holder-sdk'
import { CdrUser } from '@cds-au/holder-sdk/src/models/user';


const exp = express;
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
let standardsVersion = '/cds-au/v1';

// the endpoint configuration file fort this server, which endpoints does this server implement
// The dsb-middleware also has constants for DefaultBankingEndpoints and DefaultEnergyEndpoints
// These can be used as defaults if the server implements all CDR endpoints
// eg 
//          const dsbOptions: CdrConfig = {
//              endpoints: DefaultBankingEndpoints
//          }
const sampleEndpoints = [...endpoints] as EndpointConfig[];


// Used in the cdrAuthorisation and cdrHeaders functions. 
const dsbOptions: CdrConfig = {
    endpoints: sampleEndpoints
}

const userService: IUserService = {
    getUser(): CdrUser {
        let usr : CdrUser = {
            accountsEnergy:['12345'],
            scopes_supported: ['energy:accounts.basic:read', 'bank:payees:read']
        }
        return usr;
    }
}

// This function will validate the accounts of the user in the request url
app.use(cdrAuthenticationValidator(dsbOptions, userService));
// This function will check if this is a CDR endpoint, and return appropriate error if it is not
app.use(cdrEndpointValidator(dsbOptions));
// This function will validate the scope assigned to the user against scope required
app.use(cdrScopeValidator(dsbOptions, userService));
// this function will handle the boilerplate validation and setting for a number of header parameters
app.use(cdrHeaderValidator(dsbOptions));



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
    let user = userService.getUser();
    res.send(user?.accountsEnergy);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/electricity/servicepoints`, (req: Request, res: Response, next: NextFunction) => {
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

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/payees`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    let user = userService.getUser();
    res.send(user?.accountsEnergy);
});

app.get('/', (req, res, next) => {
    console.log(`Received request on BASE ${port}`);
    res.send();
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    console.log('Listening for requests....');
});


