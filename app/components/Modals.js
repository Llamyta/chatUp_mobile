import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Modal,
    TouchableHighlight,
    TextInput
} from 'react-native';

export default function Modals(props) {
    const { visible, text, textoboton, onPress, correo, textoboton2, onPress2 } = props;
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{text}</Text>
                        <TextInput
                            onChangeText={correo}
                            placeholder="Introduzca Correo Electronico"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#1196BA", marginTop: 10 }}
                            onPress={onPress}
                        >
                            <Text style={styles.textStyle}>{textoboton}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.closeButton, backgroundColor: "#fff", marginTop: 10 }}
                            onPress={onPress2}
                        >
                            <Text style={styles.textStyle2}>{textoboton2}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#1196BA",
        borderRadius: 10,
        paddingHorizontal: 50,
        elevation: 2,
        paddingVertical: 10
    },
    closeButton: {
        borderRadius: 10,
        paddingHorizontal: 50,
        elevation: 2,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#1196BA',
        backgroundColor: "#fff"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyle2: {
        color: "#1196BA",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: 'black',
        fontSize: 18,
        textAlign: "center"
    },
    textInput: {
        paddingLeft: 10,
        marginBottom: 10,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },

});