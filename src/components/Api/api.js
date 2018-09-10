const ServersDetails = {
  STAGING: {
    HOST: 'http://www227.lamp.le.ac.uk',
    PORT: '80',
  },
  DEVELOPMENT: {
    HOST: 'http://localhost',
    PORT: '8080',
  },
  PRODUCTION: {
    HOST: 'NA',
    PORT: 'NA',
  },
};

export default function getServerBaseUrl() {
  const location = JSON.stringify(window.location);
  const { DEVELOPMENT, STAGING, PRODUCTION } = ServersDetails;
  if (!location.includes('localhost')) {
    return `${STAGING.HOST}:${STAGING.PORT}`;
  }
  
  if (location.includes('localhost')) {
    return `${DEVELOPMENT.HOST}:${DEVELOPMENT.PORT}`;
  }
  return `${PRODUCTION.HOST}:${PRODUCTION.PORT}`;
}

