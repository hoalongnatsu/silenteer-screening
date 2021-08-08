import controllers, { Controllers } from "controllers";

import dotenv from "dotenv";
import http from "http";
import response from "libs/response";
import url from "url";

dotenv.config();

interface Router {
  [key: string]: Controllers;
}

const router: Router = {
  "api/states": controllers.state,
  "api/transition": controllers.transition,
};

type Method = "get" | "post";

const httpServer = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parseUrl = new url.URL(
      req.url,
      `${process.env.HOST}:${process.env.PORT}`
    );
    const path = parseUrl.pathname.replace(/^\/+|\/+$/, ""); // path /foo/bar/ => foo/bar

    const acceptMethods = ["get", "post"];
    const method = req.method.toLocaleLowerCase() as Method;
    if (!acceptMethods.includes(method)) {
      response(res, 405);
      return;
    }

    const controller = router[path]?.[method] || controllers.notFound;
    controller(req, res);
  }
);
httpServer.listen(process.env.PORT, () => {
  console.log("http server start on port ", process.env.PORT);
});
