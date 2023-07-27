import React from 'react'
import { Text, Platform } from 'react-native'

export const typography = () => {
  const oldTextRender = Text.render
  Text.render = function(...args) {
    const origin = oldTextRender.call(this, ...args)
    let fontFamily = Platform.OS === "ios" ? 'Open Sans' : 'OpenSans'
    if(origin.props.style && origin.props.style.fontWeight){
        switch(origin.props.style.fontWeight){
            case 'normal': break
            case '600': {
                fontFamily = Platform.OS === "ios" ? 'OpenSans-SemiBold' : 'OpenSans-SemiBold'
                break
            }
            case '800': {
                fontFamily = Platform.OS === "ios" ? 'OpenSans-Bold' : 'OpenSans-Bold'
                break
            }
        }
        // delete origin.props.style.fontWeight
      } else if(origin.props.style && Array.isArray(origin.props.style)){
        for(let i = origin.props.style.length-1; i >= 0;i--){
          if(!origin.props.style[i]){
            continue
          }
          switch(origin.props.style[i].fontWeight){
            case 'normal': break
            case '600': {
              fontFamily = Platform.OS === "ios" ? 'OpenSans-SemiBold' : 'OpenSans-SemiBold'
              // delete origin.props.style[i].fontWeight
              break
            }
            case '800': {
                fontFamily = Platform.OS === "ios" ? 'OpenSans-Bold' : 'OpenSans-Bold'
                // delete origin.props.style[i].fontWeight  
                break
            }
          }
          if(fontFamily !== (Platform.OS === "ios" ? 'Open Sans' : 'OpenSans')){
            break
          }
        }
      }
    return React.cloneElement(origin, {
      style: [{ fontFamily: fontFamily }, origin.props.style],
    })
  }
}