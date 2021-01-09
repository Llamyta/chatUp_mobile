import React from 'react'
import ButtonMenuRound from './ButtonMenuRound'

const MenuButon = ({ addButton, style, styleF, styleT, onPress, onPressF, onPressT, name, nameF, nameT, size }) => {
    return (
        <>
            {addButton !== false ? (
                <>
                    <ButtonMenuRound
                        style={styleT}
                        onPress={onPressT}
                        name={nameT}
                        size={size}
                    />
                    <ButtonMenuRound
                        style={styleF}
                        onPress={onPressF}
                        name={nameF}
                        size={size}
                    />
                    <ButtonMenuRound
                        style={style}
                        onPress={onPress}
                        name={name}
                        size={size}
                    />
                </>
            ) : (
                    <ButtonMenuRound
                        style={style}
                        onPress={onPress}
                        name={name}
                        size={size}
                    />
                )}
        </>
    )
}

export default MenuButon
