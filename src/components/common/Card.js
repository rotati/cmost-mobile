import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    { children }
  </View>
)

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    shadowOffset:{  width: 3,  height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 3,
  }
})

export default Card