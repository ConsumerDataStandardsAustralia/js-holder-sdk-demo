# DSB Middleware Testing Tool

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

## How to use

This is a simple NodeJS server implementation which utilises the middleware functions exposed by  
[dsb-middleware](https://github.com/ConsumerDataStandardsAustralia/dsb-middleware) package.

It demonstrate how different client request will trigger the generation of error objects and Http return code where this is required under published technical [standard](https://github.com/ConsumerDataStandardsAustralia/standards)

The `endpoints.json` file used in the configuration options `dsbOptions` and `authOptions` lists which endpoints this server implements.

This implementation assumes the access token is a JWT and the scopes within that token is a space separated string. This allows the use of `cdrJwtScopes` and requires this configuration 

````
const authOptions: DsbAuthConfig = {
    scopeFormat: 'STRING',
    endpoints: dsbEndpoints,
}
````

Build this project with `npm run build`
Run this project with `npm start`



The Postman collection has some examples for common scenarios, eg invalid header. This collection exists to demonstrate functionality.
