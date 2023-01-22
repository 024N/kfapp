import Joi from 'joi';

export const SiteInfo: any = Joi.object({
  params: Joi.object({
    siteId: Joi.string().required(),
  }),
  body: Joi.object({}).options({allowUnknown: true}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true).required(),
});
