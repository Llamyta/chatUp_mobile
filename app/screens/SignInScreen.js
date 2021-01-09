import React, { useState } from 'react';
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
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//clases
import { validateEmail } from '../utils/utils';
import Loading from '../components/Loading';
import Modals from '../components/Modals';

const SignInScreen = ({ navigation }) => {
    //Loading
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    //modal
    const [modalState, setModalState] = useState(false);
    //pwd
    const [hidePassword, setHidePassword] = useState(true);
    //Inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (!email || !password) {
            Alert.alert(
                "Campos",
                "Todos los campos son oblogatorios",
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
                    "La cuenta de correo electronico no es valida",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                )
            }
            else {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        setIsVisibleLoading(true);
                        console.log("Login Correcto");

                    })
                    .catch(() => {
                        Alert.alert(
                            "Error al iniciar sesion",
                            "Esta seguro de que esta cuenta esta registrada?",
                            [
                                { text: "Intentar de nuevo", style: 'cancel' },
                                { text: "Crear una cuenta", onPress: () => navigation.navigate('SignUpScreen') },

                            ],
                            { cancelable: false }
                        )
                    })

            }
        }

    }
    const cambiarPassword = () => {
        setModalState(false);
        if (!email) {
            Alert.alert(
                "Error:",
                "Debe llenar el campo de Email",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            )

        }
        else if (!validateEmail(email)) {
            Alert.alert(
                "Error email:",
                "Debe ingresar un correo valido",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            )
        }
        else {
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(

                    Alert.alert(
                        "Recuperacion:",
                        "Se ha enviado una notificacion a esta direccion",
                        [
                            { text: "OK" }
                        ],
                        { cancelable: false }
                    ),
                )
                .catch(() => {

                    Alert.alert(
                        "Error: ",
                        "Esta cuenta no esta registrada",
                        [
                            { text: "Crear una cuenta", onPress: () => navigation.navigate('SignUpScreen') },
                        ],
                        { cancelable: true }
                    )
                })

        }

    }
    return (
        /**<DissmissKeyboard>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
            <SafeAreaView>*/

        <ImageBackground
            // source={Fondo}
            style={styles.imageF}
        >

            <View style={styles.container}>
                {/* barra de arribita */}
                <StatusBar backgroundColor='#1196BA' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.title}></Text>
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
                        marginTop: 35
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

                    <TouchableOpacity
                        onPress={() => setModalState(!modalState)}
                    >
                        <Text
                            style={{ color: '#1196BA', marginTop: 15 }}

                        >
                            Forgot your password?
                        </Text>
                    </TouchableOpacity>
                    <Modals
                        visible={modalState}
                        text="Ingrese la direccion de correo electronico"
                        textoboton="Enviar Notificacion"
                        onPress={cambiarPassword}
                        textoboton2="Cerrar"
                        onPress2={() => setModalState(!modalState)}
                        correo={(email) => {
                            setEmail(email);
                        }}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={login}
                            style={[styles.signIn, {
                                borderColor: '#1196BA',
                                backgroundColor: '#1196BA',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                        <Loading isVisible={isVisibleLoading} text="Iniciando Sesion" />


                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#1196BA',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#1196BA'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>


            </View>
        </ImageBackground>
        /**  </SafeAreaView>
     </KeyboardAvoidingView>
 </DissmissKeyboard>*/
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    imageF: {
        flex: 1,
        resizeMode: "cover",
        alignItems: 'stretch',
        backgroundColor: '#1196BA'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 30,
        zIndex: 1000
    },
    text_header: {
        color: '#fa163f',
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
        marginTop: 50
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
    }
});