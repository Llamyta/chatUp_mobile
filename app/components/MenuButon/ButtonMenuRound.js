import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ButtonMenuRound = ({style,onPress,name,size}) => {
    return (
        <>
            <TouchableOpacity
                style={style}
                onPress={onPress}
            >
                <Icon
                    name={name}
                    size={size}
                    style={{ color: '#fff' }}
                />

            </TouchableOpacity>

        </>
    )
}

export default ButtonMenuRound
