import express, { request }  from 'express';
import {NextFunction, Request, Response} from 'express';
import endpoints from './data/endpoints.json';
import {cdrJwtScopes, DsbAuthConfig, EndpointConfig, CdrConfig, DefaultBankingEndpoints, cdrTokenValidator, cdrHeaderValidator}  from '@cds-au/holder-sdk'
import { EnergyAccountDetail, EnergyAccountDetailResponseV2, EnergyAccountListResponseV2, EnergyPlanListResponse, EnergyServicePointListResponse, Links, LinksPaginated, Meta, MetaPaginated } from 'consumer-data-standards/energy';
import { ResponseBankingAccountsBalanceById, ResponseBankingPayeeListV2, ResponseBankingScheduledPaymentsList } from 'consumer-data-standards/banking';

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

// Used in cdrJwtScopes. This configuration assumes that the IdAM issues a JWT
// ie access token is JWT and scope in that token is a space delimited string
const authOptions: DsbAuthConfig = {
    scopeFormat: 'STRING',
    endpoints: sampleEndpoints,
}

// Used in the cdrAuthorisation and cdrHeaders functions. 
const dsbOptions: CdrConfig = {
    endpoints: sampleEndpoints
}

// This middle ware will extend the request object with the scopes.
// It can be used for any IdAM where the access token is a JWT and the 
// scope property is either an array of string or a space separated string
app.use(cdrJwtScopes(authOptions));

// This middle ware will check access tokens for existence and scope
app.use(cdrTokenValidator(dsbOptions));

// this middle ware will handle the boilerplate validation and setting for a number of header parameters
app.use(cdrHeaderValidator(dsbOptions));


// this endpoint does NOT reequire authentication
app.get(`${standardsVersion}/energy/plans`, (req: Request, res: Response, next: NextFunction) => {
    let links: LinksPaginated = {
        self: `${req.url}`
    }
    let meta: MetaPaginated = {
        totalPages: 0,
        totalRecords: 0
    }
    let payload : EnergyPlanListResponse = {
        data: {
            plans: []
        },
        links: links,
        meta: meta
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/accounts`, (req: Request, res: Response, next: NextFunction) => {
    let links: LinksPaginated = {
        self: `${req.url}`
    }
    let meta: MetaPaginated = {
        totalPages: 0,
        totalRecords: 0
    }
    let payload : EnergyAccountListResponseV2 = {
        data: [],
        links: links,
        meta: meta
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/energy/electricity/servicepoints`, (req: Request, res: Response, next: NextFunction) => {
    let links: LinksPaginated = {
        self: `${req.url}`
    }
    let meta: MetaPaginated = {
        totalPages: 0,
        totalRecords: 0
    }
    let payload : EnergyServicePointListResponse = {
        data: {
            servicePoints: []
        },
        links: links,
        meta: meta
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});


// this endpoint requires authentication
app.get(`${standardsVersion}/energy/accounts/:accountId`, (req: Request, res: Response, next: NextFunction) => {
    let links: Links = {
        self: `${req.url}`
    }
    let meta: Meta = {
    }
    let detail: EnergyAccountDetail = {
        plans: [],
        accountId: '',
        creationDate: ''
    }
    let payload : EnergyAccountDetailResponseV2 = {
        data: detail,
        links: links,
        meta: meta
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});


// this endpoint requires authentication
app.get(`${standardsVersion}/banking/accounts/:accountId/balance`, (req: Request, res: Response, next: NextFunction) => {

    let payload : ResponseBankingAccountsBalanceById = {
        data: {
            accountId: '',
            amortisedLimit: undefined,
            availableBalance: '',
            creditLimit: undefined,
            currency: undefined,
            currentBalance: '',
            purses: undefined
        },
        links: {
            self: `${req.url}`
        }
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/payments/scheduled`, (req: Request, res: Response, next: NextFunction) => {
    let payload : ResponseBankingScheduledPaymentsList = {
        data: {
            scheduledPayments: []
        },
        links: {
            first: `${req.url}`,
            last: `${req.url}`,
            self: `${req.url}`
        },
        meta: {
            totalPages: 0,
            totalRecords: 0
        }
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});

// this endpoint requires authentication
app.get(`${standardsVersion}/banking/payees`, (req: Request, res: Response, next: NextFunction) => {
    let payload : ResponseBankingPayeeListV2 = {
        data: {
            payees: []
        },
        links: {
            first: `${req.url}`,
            last: `${req.url}`,
            self: `${req.url}`
        },
        meta: {
            totalPages: 0,
            totalRecords: 0
        }
    }
    console.log(JSON.stringify(payload));
    res.send(payload);
});

app.get('/', (req, res, next) => {
    console.log(`Received request on BASE ${port}`);
    res.send();
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Listening for requests....');
});


