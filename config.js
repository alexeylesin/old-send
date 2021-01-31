const path = require('path');
const fs = require('fs');
const fsp = require('fs-promise');

// Default Config
// Do not edit this, generate a config.<ENV>.js for your NODE_ENV
// or use ENV-VARS like PSITRANSFER_PORT=8000
const config =  {
  "uploadDir": path.resolve(__dirname + '/data'),
  // set to serve PsiTransfer from a sub-path
  "baseUrl": '/',
  // use to set custom upload url
  "uploadAppPath": '/',
  "iface": '0.0.0.0',
  // set to false to disable HTTP
  "port": 5000,
  // HTTPS, set all 3 values to enable
  "sslPort": 8443,
  "sslKeyFile": false,
  "sslCertFile": false,
  // Force redirect to https
  // can be true or a specific url like https://example.com:8443
  // keep empty to disable
  "forceHttps": '',
  // retention options in seconds:label
  "retentions": {
    "one-time": "Удалить после получения (макс. 7 дней)",
    "3600": "1 час",
    "21600": "6 часов",
    "86400": "1 день",
    "259200": "3 дня",
    "604800": "1 неделя",
  },
  // admin password, set to false to disable /admin page
  "adminPass": "H6hDqYv2NZ5JsBP8",
  // upload password, set to false to disable
  "uploadPass": false,
  // make the bucket-password field mandatory
  "requireBucketPassword": false,
  "defaultRetention": "one-time",
  // expire every file after maxAge (eg never downloaded one-time files)
  "maxAge": 3600*24*75, // 75 days
  // maximum file-size for previews in byte
  "maxPreviewSize": Math.pow(2,20) * 2, // 2MB
  "mailTemplate": 'mailto:?subject=File Transfer&body=You can download the files here: %%URL%%',
  // see https://github.com/expressjs/morgan
  // set to false to disable logging
  "accessLog": ':date[iso] :method :url :status :response-time :remote-addr',
  // event webhooks
  // invokes an HTTP POST to a url whenever a file is downloaded
  // for more info, see the webhooks section of docs/configuration.md
  "fileDownloadedWebhook": null,
  "fileUploadedWebhook": null,
  // Fallback language
  "defaultLanguage": "ru",
  // Limit upload size
  "maxFileSize": Math.pow(2, 30) * 2, // Math.pow(2, 30) * 2, // 2GB
  "maxBucketSize": Math.pow(2, 30) * 2, // Math.pow(2, 30) * 2, // 10GB
  "plugins": ['file-downloaded-webhook', 'file-uploaded-webhook'],
};

// Load NODE_ENV specific config
const envConfFile = path.resolve(__dirname, `config.${process.env.NODE_ENV}.js`);
if(process.env.NODE_ENV && fsp.existsSync(envConfFile)) {
  Object.assign(config, require(envConfFile));
}

// Load config from ENV VARS
let envName;
for (let k in config) {
  envName = 'PSITRANSFER_'+ k.replace(/([A-Z])/g, $1 => "_" + $1).toUpperCase();
  if(process.env[envName]) {
    if(typeof config[k] === 'number') {
      config[k] = parseInt(process.env[envName], 10);
    } else if (Array.isArray(config[k])) {
      config[k] = process.env[envName].split(',');
    } else if (typeof config[k] === 'object') {
      config[k] = JSON.parse(process.env[envName]);
    } else {
      config[k] = process.env[envName];
    }
  }
}

if(!config.baseUrl.endsWith('/')) config.baseUrl = config.baseUrl + '/';
if(!config.uploadAppPath.endsWith('/')) config.uploadAppPath = config.uploadAppPath + '/';

// Use baseUrl as uploadAppPath if it's not explicitly set
if(config.uploadAppPath === '/' && config.baseUrl !== '/') {
  config.uploadAppPath = config.baseUrl;
}

// Load language files
config.languages = {
  [config.defaultLanguage]: require(`./lang/${config.defaultLanguage}`) // default language
};
fs.readdirSync(path.resolve(__dirname, 'lang')).forEach(lang => {
  lang = lang.replace('.js', '');
  if(lang === config.defaultLanguage) return;
  config.languages[lang] = {
    ...config.languages[config.defaultLanguage],
    ...require(`./lang/${ lang }`)
  };
});

module.exports = config;
