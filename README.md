# JS Holder SDK  Demo

## Disclaimer

The artefacts in this repo are offered without warranty or liability, in accordance with the [MIT licence.](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE)

[The Data Standards Body](https://www.csiro.au/en/News/News-releases/2018/Data61-appointed-to-Data-Standards-Body-role)
(DSB) develops these artefacts in the course of its work, in order to perform quality assurance on the Australian Consumer Data Right Standards (Data Standards).

The DSB makes this repo, and its artefacts, public [on a non-commercial basis](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE)
in the interest of supporting the participants in the CDR eco-system.

The resources of the DSB are primarily directed towards assisting the [Data Standards Chair](https://consumerdatastandards.gov.au/about/)
for [developing the Data Standards](https://github.com/ConsumerDataStandardsAustralia/standards).

Consequently, the development work provided on the artefacts in this repo is on a best-effort basis,
and the DSB acknowledges the use of these tools alone is not sufficient for, nor should they be relied upon
with respect to [accreditation](https://www.accc.gov.au/focus-areas/consumer-data-right-cdr-0/cdr-draft-accreditation-guidelines),
conformance, or compliance purposes.

## Overview

This is a simple NodeJS server implementation which utilises the middleware functions exposed by [holder-sdk](https://github.com/ConsumerDataStandardsAustralia/holder-sdk) package.

It demonstrate how different client request will trigger the generation of error objects and Http return code where this is required under published technical [standard](https://github.com/ConsumerDataStandardsAustralia/standards)

The `endpoints.json` file used in the configuration options `configDefault` lists which endpoints this server implements.

## Validation of Scopes

### Method 1 : Validate scopes with a callback function

This implementation assumes that an authenticated user exists and information such as scopes and consented account ids are available. This is achived by implementing an IUserService as defined in the js-holder-sdk package.

The middleware functions will call the `getUser()` method where this is applicable.

````javascript
const userService: IUserService = {
    getUser(): CdrUser {
        let usr : CdrUser = {
            accountsEnergy:['12345'],
            accountsBanking:['234324'],
            energyServicePoints: ['34563'],
            scopes_supported: [
                'energy:accounts.basic:read',
                'bank:payees:read',
                'energy:accounts.detail:read',
                'energy:electricity.servicepoints.basic:read',
                'energy:electricity.servicepoints.detail:read',
                'bank:accounts.basic:read']
        }
        return usr;
    }
}
````

### Method 2 : Validate scopes by reading the access token

This method can be used where the access token is a JWT and scopes withing that token are either comma or space separated.
It will read scopes from the access token provided in the request header and extend the Request object with that token (cdrJwtScopes). The access token can then be read from the extended Request object as it is passed through the Http request pipeline. For this implementation the `cdrTokenValidator` will evaluate provided scope against required scope.
```
app.use(cdrJwtScopes(jwtConfig))
app.use(cdrTokenValidator(tokenConfig));
``````
## How to use

Build this project with `npm run build`

Run this project with `npm start`

The Postman collection `/src/postman/MiddlewareDemo.postman_collection.json` has some examples for common scenarios, eg invalid header. This collection exists to demonstrate functionality.

Run the Postman collection with the environment file in `src/postman/MiddleWare Demo.postman_environment.json`. This file contains an JWT access token with scopes.

*Note: This demo project was tested with NodeJS  v18.12.1*
