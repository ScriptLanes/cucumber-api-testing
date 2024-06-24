const path = require('path');

const env = process.env.NODE_ENV || 'development';
const reportName = `report-${env}.html`;

module.exports = {
  default: {
    parallel: 2,
    format: [`html:${path.join(__dirname, reportName)}`]
  }
};
