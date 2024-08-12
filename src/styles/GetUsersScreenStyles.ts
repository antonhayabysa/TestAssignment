import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 55,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 24,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 36,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    paddingTop: 0,
  },
  userName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.87,
    marginBottom: 4,
  },
  userPosition: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.6,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.87,
  },
  userPhone: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.87,
  },
});
