import http from "http";
import response from "libs/response";
import state from "./state";
import transition from "./transition";

export interface Controllers {
  get: (req: http.IncomingMessage, res: http.ServerResponse) => void;
  post: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

const notFound = (req: http.IncomingMessage, res: http.ServerResponse) => {
  response(res, 404);
}

export default {
  notFound,
  state,
  transition
}