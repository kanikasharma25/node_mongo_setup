
const mongoose = require('mongoose');
const { CMS_TYPE } = require('../constants/constants');

const cmsSchema = new mongoose.Schema(
  {
    
    title: {type: String, default: ""},
    content: {type: String, default: ""},
    status: {type: Boolean, default: true},
    type: {type: String, enum: [CMS_TYPE.PRIVACY, CMS_TYPE.TERMS], default: CMS_TYPE.PRIVACY}

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('cms', cmsSchema);
