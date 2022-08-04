"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoints_json_1 = __importDefault(require("./data/endpoints.json"));
var dsb_middleware_1 = require("dsb-middleware");
var app = (0, express_1.default)();
var port = 3000;
// the endpoint configuration file fort this server
var options = __spreadArray([], endpoints_json_1.default, true);
app.use((0, dsb_middleware_1.cdrAuthorisation)(options));
app.use((0, dsb_middleware_1.cdrHeaders)(options));
// this endpoint does NOT reequire authentication
app.get('/energy/plans', function (req, res, next) {
    console.log("Received request on " + port);
    res.send();
});
// this endpoint requires authentication
app.get('/energy/accounts', function (req, res, next) {
    console.log("Received request on " + port);
    res.send();
});
// this endpoint requires authentication
app.get('/banking/payments/scheduled', function (req, res, next) {
    console.log("Received request on " + port);
    res.send();
});
app.get('/', function (req, res, next) {
    console.log("Received request on BASE " + port);
    res.send();
});
app.listen(port);
//# sourceMappingURL=app.js.map