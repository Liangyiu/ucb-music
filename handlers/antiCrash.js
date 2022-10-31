"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    process.on('unhandledRejection', function (reason, p) {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on('uncaughtException', function (err, origin) {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    });
    process.on('uncaughtExceptionMonitor', function (err, origin) {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
}
exports.default = default_1;
;
