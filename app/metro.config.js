// To fix a duplicate error caused by Amplify

const blacklist = require('metro-config/src/defaults/exclusionList');

module.exports = {
  resolver: {
    blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
  },
};