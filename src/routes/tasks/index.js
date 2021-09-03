import express from 'express';

const tasksRoute = express.Router();

/* ----- TEMP ------ */
let data = [];

const IsValid = (db, id) => (id < db.length && db[id] !== undefined);

/* ----------------- */

// POST method route
tasksRoute.post('/', (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to insert a new task'

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Task JSON.',
            required: true,
        }

        #swagger.responses[200] = { description: 'Inserted successfully' }
    */

    // Add validation logic
    data.push(req.body.data);
    res.status(200).send(`{"id": "${data.length-1}"}`);
});

// GET method route
tasksRoute.get('/', (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to get all tasks'

        #swagger.responses[200] = {
            description: 'Successful GET',
            schema: [
                {
                    id: 12,
                    data: "any"
                }
            ]
        }
    */

    // Add validation logic
    const formatedArray = data.reduce((result, elm, idx) => {
        if (elm !== undefined) {
            result.push(JSON.parse(`{"id": ${idx},\n"data": "${elm}"}`));
        }
        return result;
    }, []);
    res.status(200).send(formatedArray);
});

// GET method route
tasksRoute.get('/:id', (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to get the task.'

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'integer'
        }

        #swagger.responses[200] = {
            description: 'Successful GET',
            schema: {
                $data: "any"
            }
        }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (IsValid(data, req.params.id)) {
        res.status(200).send(`{"Data": "${data[req.params.id]}"}`);
    } else {
        res.status(404).send('Resource not found');
    }
});

// PUT method route
tasksRoute.put('/:id', (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to update the task with id equal to {id}'

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Task JSON.',
            required: true,
        }

        #swagger.responses[204] = { description: 'Task edited successfully' }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (IsValid(data, req.params.id)) {
        // Add validation logic
        data[req.params.id] = req.body.data;
        res.status(204).send();
    } else {
        res.status(404).send('Resource not found');
    }
});

// DELETE method route
tasksRoute.delete('/:id', (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to delete the task with id equal to {id}'

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'integer'
        }

        #swagger.responses[204] = { description: 'Task deleted successfully' }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (IsValid(data, req.params.id)) {
        data[req.params.id] = undefined;
        res.status(204).send();
    } else {
        res.status(404).send('Resource not found');
    }
});

module.exports = tasksRoute;
