import {appConfig} from "./src/configs/config.js";
import app from "./src/app.js";
import connectToDB from "./src/configs/db.config.js";

const PORT = appConfig.PORT || 3000;

const startServer = () => {
    connectToDB();

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

startServer();