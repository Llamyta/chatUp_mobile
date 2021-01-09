import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    ToastAndroid,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import { firebaseApp } from "../utils/Firebase"
import firebases from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import FirebasePlugin, { firestore } from '../utils/Firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//clases
import { validateEmail } from '../utils/utils';
import Loading from '../components/Loading';

const db = firebases.firestore(firebaseApp)
const SignUpScreen = ({ navigation }) => {
    //Loading
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    //Mostrar y Ocultar Password
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConf, setHidePasswordConf] = useState(true);
    //Inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")


    const register = async () => {

        if (!email || !password || !repeatPassword || !phoneNumber) {
            Alert.alert(
                "Error",
                "All fields are required",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            )
        }
        else {
            if (!validateEmail(email)) {
                Alert.alert(
                    "Email Error",
                    "You must provide a valid email address",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                )
            }
            else {
                if (password !== repeatPassword) {
                    Alert.alert(
                        "Password Error",
                        "passwords must match",
                        [
                            { text: "OK" }
                        ],
                        { cancelable: false }
                    )

                }
                else {
                    if (isNaN(phoneNumber)) {
                        Alert.alert(
                            "Phone Number Error",
                            "The phone number you provided is not valid",
                            [
                                { text: "OK" }
                            ],
                            { cancelable: false }
                        )
                    }
                    else {
                        setIsVisibleLoading(true);
                        await firebase
                            .auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                console.log("Usuario registrado correctamente");
                                // navigation.navigate('RegistroPersona');
                                addUserInfoFirebase();
                            })
                            .catch((e) => {
                                setIsVisibleLoading(false);
                                console.log(e);
                                Alert.alert(
                                    "Error",
                                    "Failed to create account, try again later",
                                    [
                                        { text: "OK" }
                                    ],
                                    { cancelable: false }
                                )
                            })
                    }
                }
            }
        }

    }
    const addUserInfoFirebase = () => {
        db.collection('User')
            .add({
                email:email,
                phoneNumber: phoneNumber,
                password: password,
            })
            .then(function () {
                console.log("info guardada");


            })
            .catch(function (error) {
                console.log('Error al crear', error);
            });
    };

    return (
        <ImageBackground
            // source={Fondo}
            style={styles.imageF}
        >
            <View style={styles.container}>
                {/* barra de arribita */}
                <StatusBar backgroundColor='#1196BA' barStyle="light-content" />
                <View style={styles.header}>
                    <Text> </Text>

                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChange={e => setEmail(e.nativeEvent.text)}
                            placeholder="Correo Electronico"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color={validateEmail(email) ? "#1196BA" : "black"}
                                size={20}
                            />
                        </Animatable.View>
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 20
                    }]}>Phone Number</Text>
                    <View style={styles.action}>
                        <Feather
                            name="phone"
                            color={"black"}
                            size={20}
                        />
                        <TextInput
                            onChange={e => setPhoneNumber(e.nativeEvent.text)}
                            placeholder="Phone Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 20
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            secureTextEntry={hidePassword}
                            onChange={e => setPassword(e.nativeEvent.text)}
                            placeholder="Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity>
                            <Feather
                                name={hidePassword ? "eye" : "eye-off"}
                                color="black"
                                size={20}
                                onPress={() => setHidePassword(!hidePassword)}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 20
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            secureTextEntry={hidePasswordConf}
                            onChange={e => setrepeatPassword(e.nativeEvent.text)}
                            placeholder="Confirmar Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity>
                            <Feather
                                name={hidePasswordConf ? "eye" : "eye-off"}
                                color="black"
                                size={20}
                                onPress={() => setHidePasswordConf(!hidePasswordConf)}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={register}
                            style={[styles.signIn, {
                                borderColor: '#1196BA',
                                backgroundColor: '#1196BA',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>
                        <Loading isVisible={isVisibleLoading} text="Creando cuenta" />


                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#1196BA',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#1196BA'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </ImageBackground>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageF: {
        flex: 1,
        resizeMode: "cover",
        alignItems: 'stretch',
        backgroundColor: '#1196BA'
    },
    image: {
        //ajustar el contenido de la imagen
        resizeMode: 'contain'
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: 'black',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black',
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});