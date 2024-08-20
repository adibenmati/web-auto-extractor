'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (html) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var $html = (0, _utils.getCheerioObject)(html);
  var jsonldData = {};

  $html('script[type="application/ld+json"]').each(function (index, item) {
    try {
      var rawJson = (0, _cheerio2.default)(item).text();
      var repairedJson = rawJson;

      try {
        repairedJson = (0, _jsonrepair.jsonrepair)(rawJson);
      } catch (error) {
        // Include an error variable
        console.log("jsonld parser error: " + error.messsage);
      }

      var parsedJSON = JSON.parse(repairedJson);
      if (!Array.isArray(parsedJSON)) {
        parsedJSON = [parsedJSON];
      }
      parsedJSON.forEach(function (obj) {
        var type = obj['@type'];
        jsonldData[type] = jsonldData[type] || [];
        jsonldData[type].push(obj);
      });
    } catch (e) {
      console.log('Error in jsonld parse - ' + e);
    }
  });

  return jsonldData;
};

var _utils = require('./utils');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _jsonrepair = require('jsonrepair');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }