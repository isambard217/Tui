import ServerDetails from './ServerDetails';

function getServerBaseUrl() {
  const location = JSON.stringify(window.location);
  const { DEVELOPMENT, STAGING, PRODUCTION } = ServerDetails;
  if (!location.includes('localhost')) {
    return `${STAGING.HOST}:${STAGING.PORT}`;
  }
  
  if (location.includes('localhost')) {
    return `${DEVELOPMENT.HOST}:${DEVELOPMENT.PORT}`;
  }
  return `${PRODUCTION.HOST}:${PRODUCTION.PORT}`;
}

export default getServerBaseUrl;
