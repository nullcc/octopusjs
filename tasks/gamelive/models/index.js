var mongoose = require('mongoose');

require('./site');
require('./game');
require('./liveroom');

exports.Site = mongoose.model('Site');
exports.Game = mongoose.model('Game');
exports.LiveRoom = mongoose.model('LiveRoom');
