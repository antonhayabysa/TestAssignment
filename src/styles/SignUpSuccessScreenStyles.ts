import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeIcon: {
    marginVertical: 20,
    width: 24,
    height: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  h1Text: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.87,
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#F4E041',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
    width: 140,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
    color: '#000000',
    opacity: 0.87,
  },
});
