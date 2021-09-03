import express from 'express';
import validateTask from './schema';

const tasksRoute = express.Router();

/* ----- TEMP ------ */
let data = [];

const isValidID = (db, id) => (id < db.length && db[id] !== undefined);

/* ----------------- */

// POST method route
tasksRoute.post('/', async (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to insert a new task'

        #swagger.parameters['Task'] = {
            in: 'body',
            description: 'Task JSON.',
            required: true,
            schema: {
                id: 12,
                data: {
                    $title: "Example title, it must 1~30 chars long",
                    body: " This is a body example. And it must be 0~500 characters long. "
                }
            }
        }

        #swagger.responses[200] = { description: 'Inserted successfully' }
    */

    try {
        const taskData = await validateTask(req.body);
        data.push(taskData);
        res.status(200).send(`{"id": "${data.length - 1}"}`);
    } catch (err) {
        res.status(400).send(err);
    }
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
                    data: {
                        $title: "Title 1 ",
                        body: ""
                    }
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
                id: 12,
                data: {
                    $title: "Title 1",
                    body: ""
                }
            }
        }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (isValidID(data, req.params.id)) {
        res.status(200).send(`{"Data": "${data[req.params.id]}"}`);
    } else {
        res.status(404).send('Resource not found');
    }
});

// PUT method route
tasksRoute.put('/:id', async (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to update the task with id equal to {id}'

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['Task'] = {
            in: 'body',
            description: 'Task JSON.',
            required: true,
            schema: {
                id: 12,
                data: {
                    $title: "Example title, it must 1~30 chars long",
                    body: " This is a body example. And it must be 0~500 characters long. "
                }
            }
        }

        #swagger.responses[204] = { description: 'Task edited successfully' }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (isValidID(data, req.params.id)) {
        try {
            const taskData = await validateTask(req.body);
            data[req.params.id] = taskData;
            res.status(204).send();
        } catch (err) {
            res.status(400).send(err);
        }
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

    if (isValidID(data, req.params.id)) {
        data[req.params.id] = undefined;
        res.status(204).send();
    } else {
        res.status(404).send('Resource not found');
    }
});

module.exports = tasksRoute;
