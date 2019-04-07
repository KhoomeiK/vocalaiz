import Color from 'color';

const tintColor = '#2f95dc';
const darkTintColor = Color(tintColor).darken(15);

export default {
  tintColor,
  darkTintColor,
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
