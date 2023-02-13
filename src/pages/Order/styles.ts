import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
    backgroundColor: '#1D1D2E'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 14,
  },
  input: {
    backgroundColor: '#101026',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFFFF'
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  }, 
  buttonAdd: {
    backgroundColor: '#3FD1FF',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  button: {
    backgroundColor: '#3FFFA3',
    height: 40,
    borderRadius: 4,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#101026',
    fontSize: 18,
    fontWeight: 'bold',
  },
}) 