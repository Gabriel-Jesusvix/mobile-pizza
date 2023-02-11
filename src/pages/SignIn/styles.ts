import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#1D1D2E'
   },
   
   logoImg: {
    width: 100,
    height: 100,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',

   },
   inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34,
    paddingHorizontal: 14,

   },
   input: {
    width: '95%',
    height: 40,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#FFFFFF',
   },
  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#3FFFA3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026'
  }
})