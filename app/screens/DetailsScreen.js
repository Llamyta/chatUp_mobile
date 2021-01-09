import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Dimensions, Image } from 'react-native';
import { firebaseApp } from "../utils/Firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)
const DetailsScreen = ({ navigation }) => {
  const [info, setInfo] = useState([]);
  const usu = firebase.auth().currentUser.email
  useEffect(() => {
    const aux=[];
    db.collection('Usuario').get().then((res) => {
        res.forEach(element => {
            if(usu===element.data().email){
               setInfo(element.data())    
            }
        });
    })
}, [])

  return (
    

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.imageBackground}
            resizeMode="cover"
            source={{ uri: info.foto }}
          />

        </View>
        <View style={styles.informacion}>
          <View style={styles.bordes}>
            <Text style={styles.texto}>{info.nombre} {info.apellido_p} {info.apellido_m}</Text>
          </View>
          <View style={[styles.bordes]}>
            <Text style={{textAlign:'center', paddingVertical:'3%'}}> {info.email}</Text>
          </View>
          
          <View style={[styles.bordes]}>
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: height * 0.10
  },
  informacion: {
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical:'3%',
    textAlign:'center'
  },
  donaciones: {
    paddingTop: height * 0.05,
  },
  imageBackground: {
    borderColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  bordes:{
    borderTopWidth:0.2,
    borderTopColor:'#000',
    width:width,
    

  },

});
export default DetailsScreen;