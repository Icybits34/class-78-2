import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Alert, FlatList, Image, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios'


export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
            
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=z6fzgqxGL19zBIGZ4RnDegPFVIxYjomq3JnKioMu")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    renderItem=({item})=>{
        let meteor = item
        let bg_img,speed,size
        if(meteor.threat_score<=30){
            bg_img=require("../assets/meteor_bg1.png")
            speed=require("../assets/meteor_speed3.gif")
            size=100
        }
        else
        if(meteor.threat_score<=75){
            bg_img=require("../assets/meteor_bg2.png")
            speed=require("../assets/meteor_speed3.gif")
            size=150
        }
        else{
            bg_img=require("../assets/meteor_bg3.png")
            speed=require("../assets/meteor_speed3.gif")
            size=200
        }

        return(
            <View>
         <ImageBackground source={bg_img} style={styles.backgroundImg2}>
            <View style={styles.getContainer}>
                <Image source={speed} style={{width:size,height:size,alignSelf:"center"}}></Image>
                <View>
                    <Text style={[styles.cardTitle,{marginTop:400,marginLeft:50}]}>{item.name}</Text>
                </View>
            </View>
         </ImageBackground>
            </View>
        )
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Meteor Screen!</Text>
            </View>
        )
    }
}