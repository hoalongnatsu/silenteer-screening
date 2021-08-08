import fs from "fs";
import path from "path";

const baseDir = path.join(__dirname, "..", ".data");

const read = async (file: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${baseDir}/${file}.json`, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        if (data) {
          const dataJson = JSON.parse(data);
          resolve(dataJson);
        } else {
          resolve({});
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

const update = async (file: string, data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let stringData;
    try {
      stringData = JSON.stringify(data, null, 2);
    } catch (error) {
      reject(error);
      return;
    }

    fs.writeFile(`${baseDir}/${file}.json`, stringData, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(true);
    });
  });
};

export default {
  read,
  update,
};
