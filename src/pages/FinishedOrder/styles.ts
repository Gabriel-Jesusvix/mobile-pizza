import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    backgroundColor: '#1D1D2E'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  table: {
   fontSize: 30,
   fontWeight: 'bold',
   color: '#FFFFFF',
   marginBottom: 12,
  },
  button:{
    width: '65%',
    height:40,
    backgroundColor: '#3FFFA3',
    borderRadius: 4,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText:{
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
    color: '#1D1D2E'
  },
}) 