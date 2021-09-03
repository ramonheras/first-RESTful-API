import Joi from 'joi';

// This file contais all the validation logic for the route /tasks and /tasks/:id

export default async function validateTask(task) {
    /*  #swagger.parameters['Task'] = {
            in: 'body',
            description: 'Task JSON.',
            required: true,
            schema: {
                id: 1,
                data: {
                    $title: "Example title, it must 1~30 chars long",
                    body: " This is a body example. And it must be 0~500 characters long. "
                }
            }
        }
    */

    const schema = Joi.object({
        title: Joi.string()
            .min(1)
            .max(30)
            .required(),

        body: Joi.string()
            .max(500),
    });

    return schema.validateAsync(task);
}
