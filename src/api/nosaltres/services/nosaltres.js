'use strict';

/**
 * nosaltres service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nosaltres.nosaltres');
