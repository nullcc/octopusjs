var mongoose = require('mongoose');

require('./album');

exports.Album = mongoose.model('Album');
