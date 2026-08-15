import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

export default function App() {
  const [htmlContent, setHtmlContent] = useState(null);
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(require('./assets/webapp/index.html'));
      await asset.downloadAsync();
      const content = await FileSystem.readAsStringAsync(asset.localUri || asset.uri);
      setHtmlContent(content);
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => subscription.remove();
  }, [canGoBack]);

  if (!htmlContent) return null;

  return (
    <>
      <StatusBar style="dark" backgroundColor="#FAF9F5" />
      <WebView
        ref={webviewRef}
        source={{ html: htmlContent, baseUrl: '' }}
        style={styles.container}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        originWhitelist={['*']}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
