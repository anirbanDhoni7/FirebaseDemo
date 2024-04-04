import React from 'react';
import {Keyboard, TextInput, View} from 'react-native';

const CustomTextInput = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: props.borderRadius ? props.borderRadius : 15,
      borderWidth: props.borderWidth ? props.borderWidth : 1,
      backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff',
      borderColor: 
        props.backgroundColor
        ? props.backgroundColor
        : props.borderColor
        ? props.borderColor
        : '#fff',
      paddingHorizontal: 5,
      elevation: 20,
      ...props.style,
    }}>
    <TextInput
      style={{
        flex: props.validation ? 0.9 : 1,
        paddingVertical: 5,
        color: props.fontColor ? props.fontColor : '#000',
      }}
      // autoFocus={true}
      onFocus={props.focus}
      onSubmitEditing={Keyboard.dismiss}
      editable={!props.disableField}
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      defaultValue={props.value}
      autoCapitalize={props.autoCapitalize ? 'none' : undefined}
      multiline={props.multiline}
      secureTextEntry={props.password}
      onChangeText={text => props.setValue(text)}
      placeholder={props.placeholder}
      placeholderTextColor={props.fontColor ? props.fontColor : '#808080'}
    />
  </View>
);

export default CustomTextInput;