import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import { EndpointConfig, CdrConfig, cdrScopeValidator, cdrHeaderValidator, cdrResourceValidator,
    cdrEndpointValidator, IUserService, cdrTokenValidator, cdrJwtScopes, DsbAuthConfig}  from '@cds-au/holder-sdk'
import http from 'http'
import https from 'https'
import { CdrUser } from '@cds-au/holder-sdk';

const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const baseUrl = '/cds-au/v1'

// The endpoint configuration file fort this server, which endpoints does this server implement.
// In this example the implemented endpoints are read from a file (endpoints.json)
// The dsb-middleware also has constants for DefaultBankingEndpoints and DefaultEnergyEndpoints
// These can be used as defaults if the server implements all CDR endpoints
// eg 
//          const dsbOptions: CdrConfig = {
//              endpoints: DefaultBankingEndpoints
//          }
const sampleEndpoints = [...endpoints] as EndpointConfig[];


// Use this config file for cdrEndpointValidator and cdrHeaderValidator
// If the baseUrl is http://<HOST>:<PORT>/cds-au/v1
const configDefault: CdrConfig = {
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
                'energy:electricity.servicepoints.detail:read']
        }
        return usr;
    }
}

// Used in the cdrTokenValidator function
const tokenConfig: CdrConfig = {
    endpoints: sampleEndpoints,
}

// This function will check if this is a CDR endpoint and if it has been implemented
app.use(cdrEndpointValidator(configDefault));
// This function will validate various headers required under the CDR
app.use(cdrHeaderValidator(configDefault));

app.use(cdrScopeValidator(userService));

// **** An alternative method to valid scop is to use cdrJwtScopes in combination with cdrTokenValidator
// **** This may be suitable in some scenarios where the IdP use JWT access tokens
// **** The cdrJwtScopes function will read the scopes from a JWT access token and extend the request object 
// **** The cdrTokenValidator function will use the scopes from the request object and evaluate
// app.use(cdrJwtScopes(jwtConfig))
// app.use(cdrTokenValidator(tokenConfig));

// The cdrResourceValidator function will validate consent has been given to specific accounts
app.use(cdrResourceValidator(userService));


// this endpoint does NOT reequire authentication
app.get(`${baseUrl}/energy/plans`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${baseUrl}/energy/accounts`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication and a consented accountId
app.get(`${baseUrl}/energy/accounts/:accountId`, (req: Request, res: Response, next: NextFunction) => {
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
app.get(`${baseUrl}/banking/accounts/:accountId`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});

// this endpoint requires authentication
app.get(`${baseUrl}/banking/accounts`, (req: Request, res: Response, next: NextFunction) => {
    let st = `Received request on ${port} for ${req.url}`;
    console.log(st);
    res.send(st);
});


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

// function can used to determine if the middleware is to be bypassed for the given 'paths'
function unless(middleware: any, ...paths: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        const pathCheck = paths.some((path: string) => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
};


