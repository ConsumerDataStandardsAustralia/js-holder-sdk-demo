import { IAuthService } from "@cds-au/holder-sdk/src/models/auth-service.interface";
import { CdrUser } from "@cds-au/holder-sdk/src/models/user";

export class DemoAuthService implements IAuthService {

    authUser: CdrUser = {
        customerId: "12345",
        loginId: "Doe.John",
        encodeUserId: "SOMEENCODEDSTUFF",
        encodedAccounts: ["SOMEENCODEDACCOUNTS"],
        accounts: ["534673247324", "787843785785"],
        scopes_supported: ["banking:accounts:read"]
    };

    async verifyAccessToken(token: string): Promise<boolean> {
        console.log(`verifying token: ${token}`);
        if (token == "Bearer THISISAVALIDTOKEN")
            return true;
        else
            return false;
    }

}