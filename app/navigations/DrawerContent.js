import React from 'react';
import { View, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper'


import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


export function DrawerContent(props) {
    const {
        userInfo: { uid, displayName, email, photoURL },
    } = props;
    const {
        info: { foto, nombre , ci}
    } = props;


    const changeAvatar = () => {
        console.log("Cambiar avatar");
    };

    return (

        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={[styles.drawerContent]}>
                    <View>
                        <View style={styles.avatar}>
                            <Avatar.Image
                                source={{
                                    uri: foto ? foto : "https://api.adorable.io/avatars/267/abott@adorable.png"
                                }}
                                size={120}
                                onPress={changeAvatar}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Title style={[styles.title,{textAlign:'center'}]}>Hi!</Title>
                                <Caption style={styles.caption}>{email ? email : "luchito@gmail.com"}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="mail"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Chats"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="favorite"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Status"
                            onPress={() => { props.navigation.navigate('Estados') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="settings"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Configuration"
                            onPress={() => { props.navigation.navigate('Configuracion') }}
                        />
                        
                        
                    </Drawer.Section>
                    <Drawer.Section >
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons
                                    name="account-outline"
                                    color="#000"
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Perfil') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {/**Cerrar sesion */}
            <Drawer.Section style={[styles.bottomDrawerSection]} >
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color="#000"
                            size={size}
                        />
                    )}
                    label="Log Out"
                    onPress={() => firebase.auth().signOut()}
                />
            </Drawer.Section>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,

    },
    drawerSection: {
        marginTop: 15,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#6d1b7b',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    avatar:{
        flexDirection: 'column', 
        marginTop: 30, 
        alignItems:'center' 
    }
});