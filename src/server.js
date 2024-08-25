import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./constants/index.js";
import { env } from "./utils/env.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { UPLOAD_DIR } from "./constants/index.js";


const PORT = Number(env(ENV_VARS.PORT, "3000"));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(cookieParser());
    app.use(pino({
        transport: {
            target: "pino-pretty",
        },
    }),
    );

    app.use(router);
    app.use("/uploads", express.static(UPLOAD_DIR));
    app.use("*", notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
