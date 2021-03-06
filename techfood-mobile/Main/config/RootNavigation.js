import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack(name, params) {
  navigationRef.current?.goBack(name, params);
}

export function addListener(name, callback) {
  navigationRef.current?.addListener(name, callback);
}