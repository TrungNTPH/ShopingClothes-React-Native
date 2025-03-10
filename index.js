import { registerRootComponent } from 'expo';

// import App from './App';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import ProfileScreen from './Components/ProfileScreen';
import MyCartScreen from './Components/MyCartScreen';
import PaymentScreen from './Components/PaymentScreen';
import ProductDetailScreen from './Components/ProductDetailScreen';
import RegisterScreen from './Components/RegisterScreen';
import AdminScreen from './Components/AdminScreen';
import App from './App';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AdminScreen);
