import React from 'react';
import WebView from 'react-native-webview';

export const SvgComponent = (props) => (
    <WebView
        style={{ height: '10%', width: props.svgWidth ? props.svgWidth : '100%', backgroundColor: '#fff' }}
        scrollEnabled={false}
        source={{
            html: `<html><head><style>html, body { margin:0; padding:0; overflow:hidden } svg { position:fixed; top:0; left:0; ${"height:100%"}; ${"width:100%"} }</style></head><body>${props.svgData}</body></html>`,
        }}
    />
)