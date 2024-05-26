/**
 * Module exporting the constants for roles, statuses, and fund types.
 */


/**
 * Constant object containing the available user roles.
 * @type {Object}
 */
const roles = require('./roles');

/**
 * Constant object containing the available statuses.
 * @type {Object}
 */
const statuses = require('./statuses');

/**
 * Constant object containing the available fund types.
 * @type {Object}
 */
const fund_types = require('./fund_types');


module.exports = {
    statuses,
    roles,
    fund_types
};