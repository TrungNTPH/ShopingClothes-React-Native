import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import ProductDetailScreen from './Components/ProductDetailScreen';
import LoginScreen from './Components/LoginScreen';
import RegisterScreen from './Components/RegisterScreen';
import MyCartScreen from './Components/MyCartScreen';
import PaymentScreen from './Components/PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
                <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
