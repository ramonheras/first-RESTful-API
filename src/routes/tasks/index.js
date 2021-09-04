import express from 'express';
import validateTask from './schema';

const tasksRoute = express.Router();

/* ----- TEMP ------ */
let data = [];

const isValidID = (db, id) => (id < db.length && db[id] !== undefined);

/* ----------------- */

// POST method route
tasksRoute.post('/', (req, res) => {
    /*  #swagger.tags = ['Tasks']
        #swagger.description = 'Endpoint to insert a new task'

        #swagger.parameters['Task'] = {
            in: 'body',
            description: 'Task JSON.',
            required: true,
            schema: {
                $title: "Example title 1~30 chars long",
                body: " This is a body example. And it must be 0~500 characters long. "
            }
        }

        #swagger.responses[200] = { description: 'Inserted successfully' }
    */
    const validation = validateTask(req.body);

    if (!validation.error) {
        data.push(validation.value);
        res.status(200).json({ id: data.length - 1 });
    } else {
        res.status(400).json(validation.error.message);
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
    const formatedArray = data.reduce((result, task, idx) => {
        if (task !== undefined) {
            result.push({
                id: idx,
                data: task,
            });
        }
        return result;
    }, []);
    res.status(200).json(formatedArray);
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
                $title: "Title 1",
                body: ""
            }
        }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (isValidID(data, req.params.id)) {
        res.status(200).json(data[req.params.id]);
    } else {
        res.status(404).json('Resource not found');
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
                $title: "Example title 1~30 chars long",
                body: " This is a body example. And it must be 0~500 characters long. "
            }
        }

        #swagger.responses[204] = { description: 'Task edited successfully' }
        #swagger.responses[404] = { description: 'Task not found' }
    */

    if (isValidID(data, req.params.id)) {
        const validation = validateTask(req.body);

        if (!validation.error) {
            data[req.params.id] = JSON.parse(validation.value);
            res.status(204).send();
        } else {
            res.status(400).send(validation.error.message);
        }
    } else {
        res.status(404).json('Resource not found');
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
        res.status(404).json('Resource not found');
    }
});

module.exports = tasksRoute;
