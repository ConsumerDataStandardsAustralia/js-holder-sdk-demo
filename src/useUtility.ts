import { buildErrorMessage, paginateData, getLinksPaginated } from "@cds-au/holder-sdk";
import { DsbStandardError } from "@cds-au/holder-sdk/dist/src/error-messsage-defintions";
import { ResponseErrorListV2 } from "consumer-data-standards/admin";
import * as bankingData from './data/bankingAccountTransactions.json'

let data = bankingData?.data.transactions;


let mockQuery: any = {
   "page-size": "2",
   "page" : "2"
}

let mockRequestObject: any = {
    query: mockQuery,
    host: "www.dsb.gov.au",
    protocol: "https",
    originalUrl:  "https://www.dsb.gov.au/cds-au/v1/energy/plans?category=ALL&page=4&page-size=30",
    get(st: string) { 
        return this[st]
    }
}

function createErrorObject() {
        // create an error list
        let errList: ResponseErrorListV2 = buildErrorMessage(DsbStandardError.ADR_NOT_ACTIVE, "Some detail", undefined);
        // keep adding errors to list
        errList = buildErrorMessage(DsbStandardError.MISSING_REQUIRED_HEADER, "Additional Info", errList);
        console.log(JSON.stringify(errList));
}

function createPaginatedData() {
    // create an error list
    let pagData = paginateData(data, mockQuery);
    console.log(JSON.stringify(pagData));
}

function createLinksPaginated() {
    // this will require the Request object as it evaluates various properties, url/protocol/host
    let linksPaginated = getLinksPaginated(mockRequestObject, 1000);
    console.log(JSON.stringify(linksPaginated));
}


createErrorObject();
createPaginatedData();
createLinksPaginated();

