import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  header: {
    width: '100%',
    height: 56,
    backgroundColor: '#F4E041',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  headerText: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.43,
    color: '#000000',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
  },
});
