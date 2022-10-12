//  EX 1:

let express = require("express");
const { fchownSync, fstatSync } = require("node:fs");
const app = express();
const fs = require("node:fs");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end("Hello World");
});

// EX 2:

// B1:

app.get("/api/v1/todos", (req, res) => {
  fs.readFile(`./dev-data/todos.json`, (err, data) => {
    res.status(200).json(JSON.parse(data));
  });
});

// B2:

app.get("/api/v1/todos/:id", (req, res) => {
  let findId = req.params.id;
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    let Id = JSON.parse(data);
    let find = Id.find((e) => e.id == findId);
    res.status(200).json(find);
  });
});

// B3:

app.post(`/api/v1/todos`, (req, res) => {
  let usePost = req.body;
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let changeData = JSON.parse(data);
    let change = changeData.find((e) => e.title == usePost.title);
    if (!change) {
      let newToDo = {
        ...req.body,
        userId: Number(req.body.userId),
        id: Number(req.body.id),
        completed: Boolean(req.body.completed),
      };
      changeData.push(usePost);
      fs.writeFile(
        `${__dirname}/dev-data/todos.json`,
        JSON.stringify(changeData),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ message: "Creat Successfully" });
          }
        }
      );
    } else {
      res.status(200).json({ message: "Todo already exists" });
    }
  });
});

// B4:

app.put(`/api/v1/todos/:id`, (req, res) => {
  let usePut = req.body;
  let update = req.params.id;
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let changeUpdate = JSON.parse(data);
    let change = changeUpdate.find((e) => e.id == usePut.id);
    if (!change) {
      let newToDo = {
        ...req.body,
        userId: Number(req.body.userId),
        id: Number(req.body.id),
        completed: Boolean(req.body.completed),
      };
      res.status(200).json({ message: "Todo not found" });
    } else {
      let changeU = changeUpdate.indexOf(change);
      changeUpdate[changeU] = update;
      changeUpdate.push(usePut);
      fs.writeFile(
        `${__dirname}/dev-data/todos.json`,
        JSON.stringify(changeUpdate),
        (err) => {
          if (err) throw err;
          else {
            res.status(200).json({ message: "Update Successfully" });
          }
        }
      );
    }
  });
});

// B5:

app.delete("/api/v1/todos/:id", (req, res) => {
  let deleteId = req.params.id;
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    let changeDelete = JSON.parse(data);
    let change = changeDelete.find((e) => e.id == deleteId);
    if (!change) {
      let newToDo = {
        ...req.body,
        userId: Number(req.body.userId),
        id: Number(req.body.id),
        completed: Boolean(req.body.completed),
      };
      res.status(200).json({ message: "To do not found" });
    } else {
      let changeD = changeDelete.indexOf(change);
      changeDelete.splice(changeD, 1);
      fs.writeFile(
        `${__dirname}/dev-data/todos.json`,
        JSON.stringify(changeDelete),
        (err) => {
          if (err) throw err;
          else {
            res.status(200).json({ message: "Delete Successfully" });
          }
        }
      );
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port http://127.0.0.1:3000");
});
