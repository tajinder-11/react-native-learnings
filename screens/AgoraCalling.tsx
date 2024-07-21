import React from 'react';
import {WebView} from 'react-native-webview';

function AgoraCalling() {
  return (
    <WebView
      originWhitelist={['*']}
      source={{uri: 'https://agoratestdiligentic.netlify.app/'}}
    />
  );
}

export default AgoraCalling;
