import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    Picker,
    Alert,
    ImageBackground
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import uuid from 'random-uuid-v4';

import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

const db = firebase.firestore(firebaseApp)

//clases
import Loading from '../components/Loading';
//imagenes
import { ScrollView } from 'react-native-gesture-handler';

const Formulario = () => {

    const [image, setImage] = useState(null);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [genero, setGenero] = useState("Genero");
    const [tipoSangre, settipoSangre] = useState("Tpo de Sangre");
    const [Hospital, setHospital] = useState("Centro de Salud");
    const [carnet, setCarnet] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");
    const [celular, setCelular] = useState("");
    const [cantidadDonadores, setCantidadDonadores] = useState("");
    // console.log(file.width);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const buttonTextStyle = {
        color: '#fff',
        backgroundColor: '#1196BA',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginRight: -55,
    };
    const buttonTextStyleL = {
        color: '#fff',
        backgroundColor: '#1196BA',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: -55,
    };
    const progressStepsStyle = {
        activeStepIconBorderColor: '#1196BA',
        activeLabelColor: '#1196BA',
        activeStepNumColor: 'white',
        activeStepIconColor: '#1196BA',
        completedStepIconColor: '#1196BA',
        completedProgressBarColor: '#1196BA',
        completedCheckColor: 'white'
    };
    const Registrar = () => {

        if (!carnet || !nombre || !apellidoP || !apellidoM || !celular || !cantidadDonadores || !image) {

            Alert.alert(
                "Todos los Campos son Obligatorios",
                "Verifica la informacion que nos proporcionaste",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            )
        } else {
            addEmailRowToFirebase();


        }


    };
    const addImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        ref = storage.ref("SolicitudSangre/").child("SolicitudSangre" + uuid);

        try {
            await ref.put(filename).then(
                console.log("sise pudo")

            );
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);

    }
    const addEmailRowToFirebase = () => {
        db.collection('SolicitudSangre')
            .add({
                email: firebase.auth().currentUser.email,
                ci: carnet,
                nombre: nombre,
                apellido_p: apellidoP,
                apellido_m: apellidoM,
                facha_nac: date,
                genero: genero,
                telefono: celular,
                tipo_sangre: tipoSangre,
                cantidad_donadores: cantidadDonadores,
                hospital: Hospital,
                foto: 'https://firebasestorage.googleapis.com/v0/b/donarsangre-bf5c7.appspot.com/o/SolicitudSangre%2Fperfil_personas_cuesta_perdonar.jpg?alt=media&token=202bd022-09f7-42b1-ba10-ef38905429e4'

            })
            .then(function () {
                Alert.alert(
                    "Solicitud creada",
                    "La solicitud fue creada correctamente",
                    [
                        { text: "OK", onPress: () => dpdm() }
                    ],
                    { cancelable: false }
                )


            })
            .catch(function (error) {
                console.log('Error al crear', error);
            });
    };
    const chooseFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(source);
                setImage(source);

            }
        });
    };
    const dpdm = () => {
        navigation.navigate('Donar');


    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ProgressSteps  {...progressStepsStyle}>
                <ProgressStep
                    label="Informacion Personal"
                    nextBtnTextStyle={buttonTextStyle}
                    nextBtnText="Sig."
                >
                    <View style={{ alignItems: 'stretch', paddingHorizontal: '3%', paddingTop: '6%' }}>
                        <ScrollView >

                            <View style={styles.alineado}>
                                <View style={styles.action}>

                                    <TextInput
                                        value={carnet}
                                        onChangeText={(e) => { setCarnet(e) }}
                                        placeholder="C.I"
                                        style={styles.textInput}
                                        keyboardType='numeric'
                                        autoCorrect={false}
                                    />

                                </View>
                                <View style={styles.action}>

                                    <TextInput
                                        value={nombre}
                                        onChangeText={(e) => { setNombre(e) }}
                                        placeholder="Nombre(s)"
                                        style={styles.textInput}
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                    />

                                </View>
                            </View>

                            <View style={styles.action2}>
                                <TextInput
                                    value={apellidoP}
                                    onChangeText={(e) => { setApellidoP(e) }}
                                    placeholder="Apellido Paterno"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                            </View>
                            <View style={styles.action2}>

                                <TextInput
                                    value={apellidoM}
                                    onChangeText={(e) => { setApellidoM(e) }}
                                    placeholder="Apellido Materno"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                            </View>
                            <View style={[styles.action2, { paddingVertical: '4%' }]}>
                                <TouchableOpacity onPress={showDatepicker} style={styles.alineado}>
                                    <Text style={[styles.textInput, { color: '#a2a2a2', paddingBottom: '4%' }]}>Fecha Nacimiento</Text>
                                    <Icon
                                        name='calendar'
                                        size={20}
                                        color='#a2a2a2'
                                        style={{ paddingRight: 10 }}
                                    />
                                </TouchableOpacity>
                                <View>
                                    {show && (
                                        <DateTimePicker
                                            value={date}
                                            mode={mode}
                                            display="spinner"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={styles.action2}>
                                <Picker
                                    selectedValue={genero}
                                    style={{ height: 50, width: '100%', color: '#a2a2a2' }}
                                    onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
                                >
                                    <Picker.Item label="Genero" value="M" />
                                    <Picker.Item label="Masculino" value="M" />
                                    <Picker.Item label="Femenino" value="F" />
                                </Picker>

                            </View>
                            <View style={styles.action}>

                                <TextInput
                                    value={celular}
                                    onChangeText={(e) => { setCelular(e) }}
                                    placeholder="Telefono de Contacto"
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    autoCorrect={false}
                                />

                            </View>

                        </ScrollView>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Informacion Adicional"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyleL}
                    nextBtnText="Sig."
                    previousBtnText="Atras"
                >
                    <View style={{ justifyContent: 'center', paddingHorizontal: '3%', paddingTop: '6%' }}>
                        <ScrollView >

                            <View style={styles.action2}>
                                <Picker
                                    selectedValue={tipoSangre}
                                    style={{ height: 50, width: '100%', color: '#a2a2a2' }}
                                    onValueChange={(itemValue, itemIndex) => settipoSangre(itemValue)}
                                >
                                    <Picker.Item label="Tipo de Sangre" value="" />
                                    <Picker.Item label="O-" value="O-" />
                                    <Picker.Item label="O+" value="O+" />
                                    <Picker.Item label="A-" value="A-" />
                                    <Picker.Item label="A+" value="A+" />
                                    <Picker.Item label="B-" value="B-" />
                                    <Picker.Item label="B+" value="B+" />
                                    <Picker.Item label="AB-" value="AB-" />
                                    <Picker.Item label="AB+" value="AB+" />
                                </Picker>

                            </View>
                            <View style={styles.action2}>

                                <TextInput
                                    value={cantidadDonadores}
                                    onChangeText={(e) => { setCantidadDonadores(e) }}
                                    placeholder="Cabtidad de Donadores"
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    autoCorrect={false}
                                />

                            </View>
                            <View style={styles.action2}>
                                <Picker
                                    selectedValue={Hospital}
                                    style={{ height: 50, width: '100%', color: '#a2a2a2' }}
                                    onValueChange={(itemValue, itemIndex) => setHospital(itemValue)}
                                >
                                    <Picker.Item label="Belga" value="Belga" />
                                    <Picker.Item label="Los Angeles" value="Los Angeles" />
                                    <Picker.Item label="SEDES" value="SEDES" />
                                </Picker>

                            </View>

                        </ScrollView>
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Imagen para tu campaña"
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyleL}
                    previousBtnText="Atras"
                    finishBtnText="Fin"
                    onSubmit={Registrar}
                >
                    <View style={{ alignItems: 'stretch', paddingHorizontal: '5%' }} >
                        {image !== null ? (
                            <ImageBackground
                                style={styles.cuadroImg}
                                source={{ uri: image.uri }}
                            >
                                <TouchableOpacity style={styles.logo} onPress={() => chooseFile()}>
                                    <Icon
                                        name="camera"
                                        size={50}
                                        style={styles.icono}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>
                        ) : (
                                <View style={styles.cuadroImg}>
                                    <TouchableOpacity style={styles.logo} onPress={() => chooseFile()}>
                                        <Icon
                                            name="camera"
                                            size={50}
                                            style={styles.icono}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}


                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

export default Formulario;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    alineado: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    action: {
        marginTop: '3%',
        borderWidth: 0.2,
        borderColor: '#f2f2f2',
        paddingBottom: 1,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        width: '49%'
    },
    action2: {
        flex: 1,
        marginTop: '3%',
        borderWidth: 0.2,
        borderColor: '#f2f2f2',
        paddingBottom: 1,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        width: '100%'
    },
    textInput: {
        flex: 1,
        marginTop: 1,
        paddingLeft: 10,
        color: '#000',
    },
    cuadroImg: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: 300,
        backgroundColor: '#f2f2f2',
        opacity: 0.7,
        borderRadius: 10
    },
    logo: {
        backgroundColor: '#b8b8b8',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icono: {
        alignSelf: 'center'
    },
});