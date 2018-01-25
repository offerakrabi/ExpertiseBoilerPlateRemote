/*
© Copyright IBM Corp. 2017
*/


'use strict';

// Initialize handler
const {handler} = require('skill-sdk-nodejs');
const {init} = require('skill-sdk-nodejs');
const manifest = require('./res/assets/manifest.json');

// Expertise configuration
require('dotenv').config();


//initialize wcs in handler
if(manifest.nlu.indexOf('wcs') > -1) {
    handler.initialize();
}
let newManifest = JSON.parse(JSON.stringify(manifest));
//in case the nlu is handled in the skill - create nlu engines
let index = newManifest.nlu.indexOf('skill');
newManifest.nlu.splice(index, 1);
if(index > -1) {
    if(newManifest.nlu.length < 1) {
        console.log('No Nlu engines selected, you need to add the nlu engines you want to use to manifest.nlu (along with "skill") ')
    }
    else {
        init(newManifest);
    }
}

// The expertise handler
require('./actions')();
