import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


const Detail = () => {

  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={25} color="#47D4AC"/>
        </TouchableOpacity>
        </View>

        <Image style={styles.image} source={require('../../assets/logo.png')} />

        <Image style={styles.pointImage} source={{ uri: 'https://freight.cargo.site/w/873/i/68000046fd4fe9aaf815fc5a15928eabc440ff6a1552631c1e1c0ddb98029a25/PETSHOP-12.jpg' }} />
        <Text style={styles.pointName}>Pet shop</Text>
        <Text style={styles.pointItems}>Castração, tosa e banho</Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Serviços</Text>
          <Text style={styles.addressContent}>Castração, ortopedia, cirurgias em geral.</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Curitiba - PR</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#002B49"/>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={20} color="#002B49"/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 16,
  },

  pointName: {
    color: '#002B49',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 10,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 4,
    color: '#47D4AC'
  },

  address: {
    marginTop: 16,
  },

  addressTitle: {
    color: '#002B49',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 2,
    color: '#002B49',
    fontSize: 15,
    paddingBottom: 0,
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    marginTop: Constants.statusBarHeight - 14
  },

  button: {
    width: '48%',
    backgroundColor: '#47D4AC',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#002B49',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
  image: {
    flex: 1,
    width: '34%',
    height: "34%",
    resizeMode: 'contain',
    position: 'absolute',
    right: 20,
    top: -50,
  }
});

export default Detail;