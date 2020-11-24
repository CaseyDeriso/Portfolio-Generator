const fs = require("fs");

const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      // if there's an error, refust the Promise and send error to the Promise's '.catch()' method
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't execure the resolve() function
        return;
      }

      // if everything ent well, resolve the Promise and send the successful data to the '.then()' method
      resolve({
        ok: true,
        message: "File created in dist/ directory!",
      });
    });
  });
};

const copyFile = () => {
  return new Promise((resolve, reject) => {
    fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve({
        ok: true,
        message: "File coppied in dist/ directory!",
      });
    });
  });
};

module.exports = { writeFile, copyFile };
