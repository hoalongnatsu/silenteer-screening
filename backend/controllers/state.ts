import { Controllers } from "controllers";
import bodyParse from "libs/bodyParse";
import data from "libs/data";
import http from "http";
import response from "libs/response";

class State implements Controllers {
  async get(req: http.IncomingMessage, res: http.ServerResponse) {
    const states = await data.read("states");
    response(res, 200, states);
  }
  async post(req: http.IncomingMessage, res: http.ServerResponse) {
    const { reset } = await bodyParse(req);

    if (!reset) {
      response(res, 400, { message: "Invalid params" });
      return;
    }

    const states = {
      current: "blue",
      data: {
        blue: {
          name: "blue",
          enable: {
            blue: true,
            green: true,
            yellow: true,
          },
        },
        green: {
          name: "green",
          enable: {
            blue: true,
            green: true,
            yellow: false,
          },
        },
        yellow: {
          name: "yellow",
          enable: {
            blue: true,
            green: false,
            yellow: true,
          },
        },
      },
    };

    await data.update("states", states);

    response(res, 200, states);
  }
}

export default new State();
