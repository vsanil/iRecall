'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ItemSchema = new Schema({
  thing: {
    type: String,
    index: true,
    required: true
  },
  picture: { 
    type: Buffer, 
    required: false 
  },
  category: {
    type: String,
    default: '',
    required: false
  },
  destination: {
    type: String,
    default: '',
    required: false
  },
  description: {
    type: String,
    default: '',
    required:false
  },
  remindOn: {
    type: Date,
    default: null,
    required:false
  },
  remindBefore: {
    type: Number,
    default: 0,
    required:false
  },
  archive: {
    type: Boolean,
    default: false
  },

  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Pre hook.
 */

ItemSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

/**
 * Statics
 */
ItemSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator', 'username').exec(cb);
  }
};

/**
 * Methods
 */

ItemSchema.statics.findByTitle = function (thing, callback) {
  return this.find({ thing: thing }, callback);
}

ItemSchema.methods.expressiveQuery = function (creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
}

/**
 * Plugins
 */

function slugGenerator (options){
  options = options || {};
  var key = options.key || 'thing';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
};

ItemSchema.plugin(slugGenerator());

/**
 * Define model.
 */

mongoose.model('ItemSchema', ItemSchema);
