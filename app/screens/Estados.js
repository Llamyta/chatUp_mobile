import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList, Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { size } from 'lodash'
import ImagePicker from 'react-native-image-crop-picker';
//componentes
import ButtonMenuRound from '../components/MenuButon/MenuButon'
//firebase
import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"
const db = firebase.storage(firebaseApp)

export default function Estados({ navigation }) {
    const [info, setInfo] = useState({});
    const [image, setImage] = useState("")
    const [addButton, setAddButton] = useState(false)

    const UploadText = () => {
        setAddButton(!addButton)
    }
    const UploadImage = () => {
        PickImage();
        SubmitPost();

    }
    const SubmitPost = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        try {
            await db.ref(filename).child(uploadUri)

        } catch (e) {
            console.log("Error aja", e);
        }
    }
    const PickImage = () => {
        setAddButton(!addButton)
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    }

    return (

        <View style={styles.container}>
            {size(info) > 0 ? (
                <Text>Me falta</Text>

            ) : (
                    <View style={styles.noData}>
                        <Text
                            style={styles.textoSinDatos}
                        >Nothing to see :(</Text>
                    </View>
                )}
            <ButtonMenuRound
                styleT={[styles.iconoSubirTexto]}
                onPressT={UploadText}
                nameT={"message-text"}
                styleF={[styles.iconoSubirFoto]}
                onPressF={UploadImage}
                nameF={"image"}
                style={[styles.icono]}
                onPress={() => { setAddButton(!addButton) }}
                name={addButton ? "close" : "plus"}
                size={23}
                addButton={addButton}
            />
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
        borderRadius: 100,
        color: '#fff'
    },
    iconoSubirFoto: {
        backgroundColor: '#9c27b0',
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30 * 3.5,
        right: 25,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        borderRadius: 100
    },
    iconoSubirTexto: {
        backgroundColor: '#af52bf',
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30 * 6,
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
