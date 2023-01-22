import Joi from 'joi';

export const Outages: any = Joi.object({
  params: Joi.object({}),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true).required(),
});
