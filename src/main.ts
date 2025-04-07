import express from 'express';

import * as http from 'http';
import * as url from 'url';
import {Centimeter, Kilometer, Meter, Unit} from "./converter.ts";


const PORT = 8000;

const server = express();

server.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
});

server.get('/km/:goal/:value', (req: express.Request, res: express.Response) => {
    const goal = req.params.goal;
    const value = Number(req.params.value);
    if (isNaN(value)) {
        res.status(400).send('Invalid value');
        return;
    }
    const km = new Kilometer(value);
    let result: Unit;
    switch (goal) {
        case 'm':  result = km.toMeter();       break;
        case 'cm': result = km.toCentimeter();  break;
        case 'mi': result = km.toMile();        break;
        case 'ft': result = km.toFeet();        break;
        case 'in': result = km.toInch();        break;
        default:
            res.status(400).send('Invalid goal');
            return;
    }
    res.status(200).send(result.value);
});

server.get('/m/:goal/:value', (req: express.Request, res: express.Response) => {
    const goal = req.params.goal;
    const value = Number(req.params.value);
    if (isNaN(value)) {
        res.status(400).send('Invalid value');
        return;
    }
    const meter = new Meter(value);
    let result: Unit;
    switch (goal) {
        case 'km': result = meter.toFeet().toMile().toKilometer();  break;
        case 'cm': result = meter.toFeet().toInch().toCentimeter(); break;
        case 'mi': result = meter.toFeet().toMile();                break;
        case 'ft': result = meter.toFeet();                         break;
        case 'in': result = meter.toFeet().toInch();                break;
        default:
            res.status(400).send('Invalid goal');
            return;
    }
    res.status(200).send(result.value);
});

server.get('/cm/:goal/:value', (req: express.Request, res: express.Response) => {
    const goal = req.params.goal;
    const value = Number(req.params.value);
    if (isNaN(value)) {
        res.status(400).send('Invalid value');
        return;
    }
    const cm = new Centimeter(value);
    let result: Unit;
    switch (goal) {
        case 'km': result = cm.toMeter().toFeet().toMile().toKilometer();   break;
        case 'm':  result = cm.toMeter();                                   break;
        case 'mi': result = cm.toMeter().toFeet().toMile();                 break;
        case 'ft': result = cm.toMeter().toFeet();                          break;
        case 'in': result = cm.toInch();                                    break;
        default:
            res.status(400).send('Invalid goal');
            return;
    }
    res.status(200).send(result.value);
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
