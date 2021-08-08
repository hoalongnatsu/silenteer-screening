import { Controllers } from "controllers"
import bodyParse from "libs/bodyParse";
import data from "libs/data";
import http from "http";
import response from "libs/response";

class Transition implements Controllers {
  async get(req: http.IncomingMessage, res: http.ServerResponse) {
    response(res);
  }
  async post(req: http.IncomingMessage, res: http.ServerResponse) {
    const { next_state } = await bodyParse(req);

    if (!next_state) {
      response(res, 400, { message: "Missing params" });
      return;
    }

    const states = await data.read("states");
    if (next_state === states.current) {
      response(res, 200, states);
      return;
    }

    const current = states.current;
    const state = states.data[current];

    if (!state.enable[next_state]) {
      response(res, 400, { message: "Invalid params to perform transition" });
      return;
    }

    if (next_state === "blue") {
      const buleState = states.data["blue"];
      Object.keys(buleState.enable).forEach((key) => {
        buleState.enable[key] = true;
      })

      buleState.enable[current] = false;
    }

    states.current = next_state;
    await data.update("states", states);

    response(res, 200, states);
  }
}

export default new Transition();
