/**
 * taskValidation.js
 * @description :: validate each post and put request as per task model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  
const taskConstantsDefault = require('../../constants/taskConstants');    

/** validation keys and properties of task */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  status: joi.number().default(taskConstantsDefault.STATUS['OPEN']).allow(0),
  tags: joi.array().items(),
  priority: joi.number().integer().allow(0),
  parentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isActive: joi.boolean(),
  categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isImportant: joi.boolean().default(false),
  isUrgent: joi.boolean().default(false),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of task for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  status: joi.number().default(taskConstantsDefault.STATUS['OPEN']).allow(0),
  tags: joi.array().items(),
  priority: joi.number().integer().allow(0),
  parentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isActive: joi.boolean(),
  categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isImportant: joi.boolean().default(false),
  isUrgent: joi.boolean().default(false),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of task for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tags: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      priority: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      parentId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      categoryId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isImportant: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isUrgent: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
