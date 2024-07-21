let localAppId = '7c90601208a846acbf2ebd8fbe445cc4';
try {
  localAppId = require('./appID').default;
  console.log('appID', localAppId);
} catch (error) {
  console.warn(error);
}

const config = {
  appId: localAppId,
  token:
    '007eJxTYGAzDNm0mPtH2AK2rxIZWTKZM5r2SFyv09a4PnGq5N8JkhsVGMyTLQ3MDAyNDCwSLUzMEpOT0oxSk1Is0pJSTUxMk5NN9pRmpTUEMjLMOj6PiZEBAkF8FoaS1OISBgYA5a4fEQ==',
  channelId: 'test',
  uid: 0,
  logFilePath: '',
};

export default config;
