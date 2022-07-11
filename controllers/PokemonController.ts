import { Router, Request, Response } from "express";
import Pokemon from '../models/Pokemon';
import Ability from '../models/Ability';

class PokemonController {
    public path = '/pokemon';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllPokemon);
        this.router.get(this.path + '/:id', this.getPokemon);
        this.router.post(this.path, this.createPokemon);
        this.router.delete(this.path + '/:id', this.deletePokemon);
        this.router.put(this.path + '/:id', this.updatePokemon);
        this.router.put(this.path + '/:pokemonId/ability/:abilityId', this.addAbility);
        this.router.get(this.path + '/name/:name', this.getPokemonByName);
    }

    private getAllPokemon = (req: Request, res: Response) => {
        Pokemon.find().then((result) => {
            res.send({ search: result });
        })
            .catch((err) => {
                console.log(err);
            });
    }
    private getPokemon = (req: Request, res: Response) => {
        Pokemon.findById(req.params.id)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => { console.log(err) });
    }

    private createPokemon = (req: Request, res: Response) => {
        const pok = new Pokemon(req.body)

        pok.save()
            .then((result) => {
                res.send('Pokemon Created: ' + result);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    private deletePokemon = (req: Request, res: Response) => {
        Pokemon.findByIdAndDelete(req.params.id)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err));
    }

    private updatePokemon = (req: Request, res: Response) => {
        Pokemon.findByIdAndUpdate(req.params.id, req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => { console.log(err) })
    }

    private addAbility = (req: Request, res: Response) => {
        const pokID = req.params.pokemonId
        const abilityID = req.params.abilityId;

        Pokemon.findById(pokID)
            .then((result) => {
                console.log(result)
                result?.abilities.push(abilityID);
                result?.save().
                    then((result) => {
                        res.send(result)
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }

    private getPokemonByName = (req: Request, res: Response) => {
        const pname = req.params.name;

        Pokemon.findOne({name:pname}).then((result)=> {
            res.send({search: result})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export default PokemonController;