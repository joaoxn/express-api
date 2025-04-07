import express from 'express';

import * as http from 'http';
import * as url from 'url';
import {get} from "oop-units-converter";


const PORT = 8000;

const server = express();

server.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
});
server.get('/:value/:source/:goal', (req: express.Request, res: express.Response) => {
    const value = Number(req.params.value);
    const source = req.params.source;
    const goal = req.params.goal;

    if (isNaN(value)) {
        res.status(400).send("Could not parse amount for unit " +
            "because it is not specified correctly in the first parameter. " +
            "Consider the following order: /amount/unit/new-unit");
        return;
    }

    const unit = get(value, source);
    if (!unit) {
        res.status(400).send("Cannot convert unit because it's acronym does not exist");
        return;
    }

    const newUnit = unit.to(goal);
    if (!newUnit) {
        res.status(400).send("Cannot convert to goal unit because it's acronym does not exist");
        return;
    }

    res.status(200).send(newUnit.value);
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
