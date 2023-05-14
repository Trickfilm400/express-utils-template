import * as Joi from 'joi';

export const Schema = Joi.object({
  property: Joi.string().required(),
});
