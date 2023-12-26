/**
 * task.js
 * @description :: model of a database collection task
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const taskConstantsEnum = require('../constants/taskConstants');
        
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    name:{ type:String },

    description:{ type:String },

    status:{
      type:Number,
      default:taskConstantsEnum.STATUS['OPEN'],
      enum:taskConstantsEnum.STATUS
    },

    tags:{ type:Array },

    priority:{ type:Number },

    parentId:{
      type:Schema.Types.ObjectId,
      ref:'task'
    },

    isActive:{ type:Boolean },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    categoryId:{
      type:Schema.Types.ObjectId,
      ref:'category'
    },

    isImportant:{
      default:false,
      type:Boolean
    },

    isUrgent:{
      default:false,
      type:Boolean
    },

    isDeleted:{ type:Boolean }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const task = mongoose.model('task',schema);
module.exports = task;