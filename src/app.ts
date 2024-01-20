import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import { EndpointConfig, CdrConfig, cdrScopeValidator, cdrHeaderValidator, cdrResourceValidator, cdrEndpointValidator, IUserService, cdrTokenValidator, cdrJwtScopes, DsbAuthConfig}  from '@cds-au/holder-sdk'
import { CdrUser } from '@cds-au/holder-sdk/src/models/user';
import http from 'http'
import https from 'https'

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


// Used in the and cdrEndpointValidatorfunctions
const endpointConfig: CdrConfig = {
    endpoints: sampleEndpoints,
    // basePath: '/prod-data'
    //specifiedEndpointsOnly: false
}

// Used in the cdrHeaderValidator function
const headerConfig: CdrConfig = {
    endpoints: sampleEndpoints
}

// Used in the cdrJwtScopes function
const jwtConfig: DsbAuthConfig = {
    endpoints: sampleEndpoints,
    scopeFormat: 'LIST'
}

// Some middleware requires a IUserService, which will be called at runtime to get the current user
// This is the case for the
//   - cdrResourceValidator as this requires knowledge about accessible accounts
//   - cdrScopeValidator as this requires knowledge about scopes assigned by the IdP
// Below is an example.
const userService: IUserService = {
    getUser(): CdrUser {
        let usr : CdrUser = {
            accountsEnergy:['12345'],
            accountsBanking:['6789'],
            energyServicePoints: ['34563'],
            scopes_supported: [
                'energy:accounts.basic:read',
                'energy:accounts.detail:read',
                'bank:payees:read',
                'energy:electricity.servicepoints.basic:read',
                'energy:electricity.servicepoints.detail:read',
                'bank:accounts.basic:read']
        }
        return usr;
    }
}

// Used in the cdrTokenValidator function
const tokenConfig: CdrConfig = {
    endpoints: sampleEndpoints,
}

// function used to determine if the middleware is to be bypassed for the given 'paths'
function unless(middleware: any, ...paths: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        const pathCheck = paths.some((path: string) => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
};

// This function will check if this is a CDR endpoint and if it has been implemented
app.use(cdrEndpointValidator(endpointConfig));
// This function will validate various headers required under the CDR
app.use(cdrHeaderValidator(headerConfig));

app.use(cdrScopeValidator(userService));
// **** An alternative method to valid scop is to use cdrJwtScopes in combination with cdrTokenValidator
// app.use(cdrJwtScopes(jwtConfig))
// app.use(cdrTokenValidator(tokenConfig));

// This function will validate consent has been given to specific accounts
app.use(cdrResourceValidator(userService));


// This function will validate the accounts of the user in the request url
// app.use(cdrResourceValidator(userService));
// // This function will validate the scope assigned to the user against scope required
// app.use(cdrScopeValidator(userService));
// // this function will handle the boilerplate validation and setting for a number of header parameters
// app.use(cdrHeaderValidator(config));

// this endpoint is not a CDR endpoint, but is marked to by pass the cdrEndpointValidator
app.get(`/ignore-me`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

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

// this endpoint requires authentication and a consented accountId
app.get(`${standardsVersion}/energy/accounts/:accountId`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint is not a CDR endpoint
app.get(`/health`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/accounts/:accountId`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`/prod-data${standardsVersion}/banking/accounts`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});



// // this endpoint requires authentication
// app.get(`${standardsVersion}/banking/accounts/:accountId/balance`, (req: Request, res: Response, next: NextFunction) => {
//     let st = `Received request on ${port} for ${req.url}`;
//     console.log(st);
//     res.send(st);
// });


// // this endpoint requires authentication
// app.get(`${standardsVersion}/banking/accounts/:accountId/payments/scheduled`, (req: Request, res: Response, next: NextFunction) => {
//     let st = `Received request on ${port} for ${req.url}`;
//     console.log(st);
//     res.send(st);
// });

// // this endpoint requires authentication
// app.get(`${standardsVersion}/banking/payments/scheduled`, (req: Request, res: Response, next: NextFunction) => {
//     let st = `Received request on ${port} for ${req.url}`;
//     console.log(st);
//     res.send(st);
// });

// // this endpoint requires authentication
// app.get(`${standardsVersion}/banking/payees`, (req: Request, res: Response, next: NextFunction) => {
//     let st = `Received request on ${port} for ${req.url}`;
//     console.log(st);
//     res.send(st);
// });

app.get('/', (req, res, next) => {
    console.log(`Received request on BASE ${port}`);
    res.send();
});


http.createServer(app).listen(80);

https.createServer(app).listen(443);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    console.log('Listening for requests....');
});


