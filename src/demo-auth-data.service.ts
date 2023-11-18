
import * as mongoDB from "mongodb";
import {IAuthServiceData, AccountModel, CustomerModel, DsbAuthConfig, DsbAuthServerConfig} from "@cds-au/holder-sdk"


export class DsbAuthDataService implements IAuthServiceData {

    public collections: mongoDB.Collection[] = [];
    private client: mongoDB.MongoClient;
    private dsbData: mongoDB.Db;

    constructor(config: DsbAuthServerConfig) {
        this.client = new mongoDB.MongoClient(process.env.CONNECTION_STRING ?? "mongodb://127.0.0.1:27017" , { monitorCommands: true });
        this.dsbData = this.client.db(process.env.DATABASE_NAME);
    }

    // The method which maust be implemented. Will be called by middleware
    async getUserForLoginId(loginId: string): Promise<string | undefined> {
        // split loginId into first and last name
        var customerId;
        let arr: string[] = loginId.split('.');
        if (arr.length < 2)
            return undefined;
        let firstName = arr[1];
        let lastName = arr[0];
        let allDataCollection: mongoDB.Collection = this.dsbData.collection(process.env.CONTAINER_NAME as string);
        let allData = await allDataCollection.findOne();
        if (allData?.holders != undefined) {
            let allCustomers = allData?.holders[0]?.holder?.authenticated?.customers;
            if (allCustomers.length < 1)
                return undefined;
            allCustomers.forEach((c: any) => {
                if (c?.customer?.person?.firstName.toUpperCase() == firstName.toUpperCase()
                    && c?.customer?.person?.lastName.toUpperCase() == lastName.toUpperCase()) {
                    customerId = c.customerId;
                }
            })
        }
        return customerId;
    }

    async connectDatabase() {
        try {
            await this.client.connect();
        }
        catch (e) {
            console.log(`Failed to connet to MongoDB${JSON.stringify(e)}`)
        }

    }

    async disconnectDatabase() {
        try {
            await this.client.close();
        }
        catch (e) {
            console.log(`Failed to connet to MongoDB${JSON.stringify(e)}`)
        }
    }

}
