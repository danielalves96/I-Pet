import React, { useState } from 'react';
import { View, ImageBackground, Image, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { Translate } from '../../Internacionalization/PT_BR';
import { styles } from './style';
import { useNavigation } from "@react-navigation/native";
const Home = () => {

    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    const navigation = useNavigation();

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf,
            city
        })
    }

    return (
                <ImageBackground source={require('../../assets/pets.png')} style={styles.container} imageStyle={{ width: 314, height: 314, marginTop: 100, marginLeft: 40 }}>
                    <View style={styles.main}>
                        <Image source={require('../../assets/logo.png')} />
                        <View>
                            <Text style={styles.title}>{Translate.map(app => app.Home.TITLE_HOME)}</Text>
                            <Text style={styles.description}>{Translate.map(app => app.Home.DESCRIPTION)}</Text>
                        </View>
                    </View>

                    <TextInput style={styles.input} placeholder="Digite o estado" 
                        value={uf}
                        onChangeText={setUf}
                        autoCorrect={false}
                    />
                    <TextInput style={styles.input} placeholder="Digite a cidade" 
                        value={city}  
                        onChangeText={setCity}   
                        autoCorrect={false} 
                    />

                    <View style={styles.footer}>
                        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                            <View style={styles.buttonIcon}>
                                <Text >
                                    <AntDesign name="arrowright" size={24} color="#FFF" />
                                </Text>
                            </View>
                            <Text style={styles.buttonText} >{Translate.map(app => app.Home.FIND)}</Text>
                        </RectButton>
                    </View>
                </ImageBackground>
    )
};

export default Home;