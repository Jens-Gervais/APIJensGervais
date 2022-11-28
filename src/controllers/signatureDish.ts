import { Request, Response, NextFunction } from 'express';
// import fs
import fs from 'fs';



interface SignatureDish {
    country: string;
    dish: string;
}


export const getSignatureDish = (req: Request, res: Response, next: NextFunction) => {
    const signatureDish: SignatureDish[] = require('../db.json');
    res.status(200).json(signatureDish);
};

export const addSignatureDish = (req: Request, res: Response, next: NextFunction) => {
    const signatureDish: SignatureDish[] = require('../db.json');
    const newSignatureDish: SignatureDish = {
        country: req.body.country,
        dish: req.body.dish
    };

    // if country already exists in db.json throw error
    const countryExists = signatureDish.find((country) => country.country === newSignatureDish.country);
    if (countryExists) {
        return res.status(400).json({ message: 'Country already exists' });
    }

    signatureDish.push(newSignatureDish);

    fs.writeFile('src/db.json', JSON.stringify(signatureDish), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.status(200).json(signatureDish);
}

export const deleteSignatureDish = (req: Request, res: Response, next: NextFunction) => {
    const signatureDish: SignatureDish[] = require('../db.json');
    const signatureDishCountry: string = req.params.country;
    const signatureDishIndex: number = signatureDish.findIndex(signatureDish => signatureDish.country === signatureDishCountry);
    signatureDish.splice(signatureDishIndex, 1);

    
    fs.writeFile('src/db.json', JSON.stringify(signatureDish), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.status(200).json(signatureDish);
}

export const updateSignatureDish = (req: Request, res: Response, next: NextFunction) => {
    const signatureDishes: SignatureDish[] = require('../db.json');
    const signatureDishCountry: string = req.params.country;
    const signatureDishIndex: number = signatureDishes.findIndex(signatureDish => signatureDish.country === signatureDishCountry);
    const signatureDish: SignatureDish = {
        country: signatureDishCountry,
        dish: req.body.dish
    };

    fs.writeFile('src/db.json', JSON.stringify(signatureDish), (err) => {
        if (err) {
            console.log(err);
        }
    });

    signatureDishes[signatureDishIndex] = signatureDish;
    res.status(200).json(signatureDish);
}

// Get signature dish by country
export const getSignatureDishByCountry = (req: Request, res: Response, next: NextFunction) => {
    // read from file db.json and return all signature dishes as json
    // file directory is src/db.json
    const signatureDishes: SignatureDish[] = require('../db.json');
    const signatureDishCountry: String = req.params.country;
    const ing = signatureDishes.find(signatureDish => signatureDish.country === signatureDishCountry);
    res.status(200).json(ing);
}


export default {
    getSignatureDish,
    addSignatureDish,
    deleteSignatureDish,
    updateSignatureDish,
    getSignatureDishByCountry
}