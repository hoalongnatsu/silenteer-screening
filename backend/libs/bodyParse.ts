import http from "http";

const bodyParse = async (req: http.IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    })

    req.on("end", () => {
      if (body) {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      }

      resolve({});
    })

    req.on("error", function (err: Error) {
      reject(err);
    });
  })
}

export default bodyParse;
