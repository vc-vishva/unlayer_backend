const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  design: {
    type: Object,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Index for faster queries
templateSchema.index({ createdAt: -1 });
templateSchema.index({ name: 1 });

// Virtual for template ID
templateSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
templateSchema.set('toJSON', {
  virtuals: true
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;