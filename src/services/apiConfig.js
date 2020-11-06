const URL_TESTING = `http://54.251.66.247`;
// const URL_TESTING = `http://teachme.ceyentra.lk`;
const URL_REMOTE = ``;

const conf = {
  serverUrl: window.location.hostname.indexOf('localhost') !== -1 || window.location.hostname.indexOf('localhost:3') !== -1 ?  URL_TESTING  : URL_REMOTE,
  basePath: `api/v1`,
};

export default conf;
