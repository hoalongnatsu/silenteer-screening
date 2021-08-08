import { CURRENT_ENV } from "configs/env";
import a from "axios";

const axios = a.create({ baseURL: CURRENT_ENV.API_URL });

export const stateService = {
  getList: () => {
    return axios.get("/states");
  },
  reset: () => {
    return axios.post("/states", JSON.stringify({ reset: true }));
  },
};

export const transitionService = {
  changeState: (name: string) => {
    return axios.post(
      "/transition",
      JSON.stringify({ next_state: name }),
    );
  },
};
