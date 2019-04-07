import Color from 'color';

const tintColor = '#4285f4';
const darkTintColor = Color(tintColor).darken(0.15).hex();
const errorColor = '#FF4136';
const darkErrorColor = Color(errorColor).darken(0.15).hex();

export default {
  tintColor,
  darkTintColor,
  errorColor,
  darkErrorColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff'
};
