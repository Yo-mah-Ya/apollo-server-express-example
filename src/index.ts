import { errorMessageOf, Logger } from "./common";
import { startService } from "./service";

startService().catch((error) => {
    Logger.critical({
        message: errorMessageOf(error),
        callSite: { file: __filename },
        exitReason: `failed invoking ${startService.name} function`,
    });
    throw error;
});
