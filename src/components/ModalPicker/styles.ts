import { Dimensions, StyleSheet } from 'react-native';
// import { HEIGTH, WIDTH } from '.'
export const { width: WIDTH, height: HEIGTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    width: WIDTH - 20,
    height: HEIGTH / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8A8A8A',
    borderRadius: 4,
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8A8A8A',
  },
  item: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101026'
  }
})