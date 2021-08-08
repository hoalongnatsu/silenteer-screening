import http from "http";

const response = (res: http.ServerResponse, status = 200, payload = {}) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  };

  res.setHeader("Content-Type", "application/json");
  res.writeHead(status, headers);
  res.end(JSON.stringify(payload));
};

export default response;
