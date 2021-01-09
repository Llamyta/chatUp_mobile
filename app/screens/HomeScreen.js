import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { size } from 'lodash'
//firebase
import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase"
import "firebase/firestore"


const db = firebase.firestore(firebaseApp)

export default function HomeScreen({ navigation }) {
    const [info, setInfo] = useState({});
    const usu = firebase.auth().currentUser.email;

    const contacts = () => {
        console.log('abriendo Menu');
    }

    return (

        <View style={styles.container}>
            {size(info) > 0 ? (
                <Text>Me falta</Text>

            ) : (
                    <View style={styles.noData}>
                        <Text
                            style={styles.textoSinDatos}
                        >Wow! It seems you don't have chats</Text>
                    </View>
                )}
            <TouchableOpacity
                style={[styles.icono]}
                onPress={contacts}
            >
                <Icon
                    name="plus"
                    size={23}
                    style={{ color: '#fff' }}
                />
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    icono: {
        backgroundColor: '#6d1b7b',
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 25,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        borderRadius: 100
    },
    noData: {
        paddingVertical: '60%',
        paddingHorizontal: '10%'
    },
    textoSinDatos: {
        textAlign: 'center',
        fontSize: 30,
        color: '#d8d8d8',
    },
});
