import Joi from 'joi';

export const EnhancedOutages: any = Joi.object({
  params: Joi.object({
    siteId: Joi.string().required(),
  }),
  body: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      begin: Joi.string().required(),
      end: Joi.string().required(),
    }).options({allowUnknown: true})
  ),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true).required(),
});
