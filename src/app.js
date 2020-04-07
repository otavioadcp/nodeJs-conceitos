const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [{
  "id": "fbce6a43-3998-4188-9cd3-d52fa44ccaca",
  "title": "Otavio Augusto",
  "url": "http://github.com/...",
  "techs": [
      "Node.js",
      "React"
  ],
  "likes": 0
}];

app.get("/repositories", (request, response) => {

  return response.status(200).json(repositories);

});

app.post("/repositories", (request, response) => {
  console.log('aq', request.body)
  const {title, url, techs} = request.body;
  
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepository);

  return response.status(201).json(newRepository)

});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const index = repositories.findIndex(data => data.id === id)

  title ? repositories[index].title = title : null
  url ? repositories[index].url = url : null
  techs ? repositories[index].techs = techs : null 

  return response.status(200).json(repositories[index])


});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  
  repositories = repositories.filter(data => data.id !== id);

  return res.status(200).send()

});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const index = repositories.findIndex(data => data.id === id);

    repositories[index].likes = repositories[index].likes+1;

    return response.status(200).json(repositories[index]);

});

module.exports = app;
