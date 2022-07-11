import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import PokemonController from "../controllers/PokemonController";
import AbilityController from '../controllers/AbilityController';

const app = express();

//Controllers
const pokemonController = new PokemonController();
const abilityController = new AbilityController();

const PORT = process.env.PORT;
const dbURI = 'mongodb://localhost:27017/pokemonDB'

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

connect(dbURI).then(()=>app.listen(PORT,() => {
  console.log(`App is running at http://localhost:${PORT}`)
})).catch((err)=> console.log(err))


app.use('/',pokemonController.router);
app.use('/',abilityController.router);