const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const xmlToJSON = require('xmlToJSON');
const LodeStar = require('./service/LodeStar');

let xmlStr = fs.readFileSync('/Users/wolde034/LodeStar/Projects/ActivityMakerDefault/base/main.xml', 'utf8');


xmlToJSON.stringToXML = function (string) {
  return new DOMParser().parseFromString(string, 'text/xml');
};

let lodeStarXml = xmlToJSON.parseString(xmlStr);
fs.writeFileSync('/Users/wolde034/Desktop/lodestar.json', JSON.stringify(lodeStarXml, null, 4));
let lodeStar = new LodeStar(lodeStarXml);

console.log('project name ', JSON.stringify(lodeStar.createPages(), null, 4));
