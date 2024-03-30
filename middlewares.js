import { authMiddleware } from "./tools/auth_middleware.js";
import bodyParser from "body-parser";
const middlewares = {};

middlewares.setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    authMiddleware.myPassport();
    app.use(authMiddleware.protectWithJwt);
}

export { middlewares }