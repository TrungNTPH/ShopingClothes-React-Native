import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { loginUser } from './apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
    // chạy lại git 

const LoginScreen = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log(Email)
    console.log(Password)
    const res = await loginUser({Email, Password});
    if(res){
      await AsyncStorage.setItem('userToken', res.id.toString());
      Alert.alert("Dang nhap thanh cong")
      navigation.navigate('HomeScreen');
    }else{
      Alert.alert("Dang nhap ko thanh cong")
    }
  }

  const navigateToRegisterScreen = () =>{
    navigation.navigate("RegisterScreen");
  }

  return (
    <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.backGround}>
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={Password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRegisterScreen}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'darkcyan',
    padding: 10, width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  link: {
    color: 'darkcyan',
    marginTop: 10
  },
});

export default LoginScreen;
