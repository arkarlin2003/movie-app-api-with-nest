import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNC: Joi.string().required(),
  DATABASE_AUTOLOADENTITIES: Joi.string().required(),
});