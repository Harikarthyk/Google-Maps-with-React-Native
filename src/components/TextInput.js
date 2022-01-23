import React from 'react'
import normalize from 'react-native-normalize'
import { TextInput as Input } from 'react-native-paper'

function TextInput({ mode = "outline", value = "", onChangeText, style = {}, keyboardType, label = "" }) {
    return (
        <Input
            mode={mode}
            value={value}
            onChangeText={onChangeText}
            style={style}
            keyboardType={keyboardType}
            label={label}
        />
    )
}

export default TextInput
