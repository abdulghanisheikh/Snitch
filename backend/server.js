import {appConfig} from "./src/configs/config.js";
import app from "./src/app.js";
import connectToDB from "./src/configs/db.config.js";

connectToDB();

app.listen(appConfig.PORT, () => {
    console.log(`server on ${appConfig.PORT}`);
});