import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { registerUser } from './apiServices';

    // chạy lại git 

const RegisterScreen = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');


  const handleRegister = async () => {
    const success = await registerUser({Name, Email, Password})
    if(success){
      Alert.alert("Dang ky thanh cong")
      navigation.navigate('LoginScreen'); 
    }else{
      Alert.alert("Dang ky ko thanh cong")
    }
  }
  
  
  return (
    <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.backGround}>
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput style={styles.input} placeholder="Họ tên" value={Name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mật khẩu" value={Password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
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

export default RegisterScreen;
