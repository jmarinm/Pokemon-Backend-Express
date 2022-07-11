import { Router, Request, Response } from "express";
import Ability from '../models/Ability';

class AbilityController {
    public path = '/ability';
    public router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path,this.getAllAbilities);
        this.router.get(this.path+'/:id',this.getAbility);
        this.router.post(this.path, this.createAbility);
        this.router.delete(this.path+'/:id', this.deleteAbility);
        this.router.put(this.path+'/:id', this.updateAbility);
    }

    private getAllAbilities = (req: Request, res: Response)=>{
        Ability.find().then((result)=>{
            res.send({search: result});
        })
        .catch((err)=> {console.log(err);
        }); 
    }
    private getAbility= (req: Request, res: Response)=>{
        Ability.findById(req.params.id)
        .then((result)=> {
            res.send(result);
        })
        .catch((err)=> {console.log(err)});
    }

    private createAbility = (req: Request, res: Response)=>{
        const pok = new Ability(req.body)

        pok.save()
            .then((result)=>{
                res.send({response: 'Ability Created',
                          object: result});
            })
            .catch((err)=>{
                console.log(err)
            });
    }

    private deleteAbility = (req: Request, res: Response)=>{
        Ability.findByIdAndDelete(req.params.id)
            .then((result)=> {res.send( result);
            })
            .catch((err)=> console.log(err));
    }

    private updateAbility = (req: Request, res: Response)=>{
        Ability.findByIdAndUpdate(req.params.id, req.body)
            .then((result)=>{res.send(result);
            })
            .catch((err)=> {console.log(err)})
    }
}

export default AbilityController;