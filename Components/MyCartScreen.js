import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyCartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState([]);

    // Lấy danh sách giỏ hàng từ AsyncStorage
    const loadCart = async () => {
        try {
            const cart = await AsyncStorage.getItem('cart');
            setCartItems(cart ? JSON.parse(cart) : []);
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = async (id) => {
        try {
            let cart = await AsyncStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
            const newCart = cart.filter(item => item.id !== id);
            await AsyncStorage.setItem('cart', JSON.stringify(newCart));
            setCartItems(newCart);
            Alert.alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = async () => {
        try {
            await AsyncStorage.removeItem('cart');
            setCartItems([]);
            Alert.alert("Giỏ hàng đã được làm trống!");
        } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Giỏ hàng của bạn</Text>

                {cartItems.length === 0 ? (
                    <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
                ) : (
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.productItem2}>
                                <Image source={{ uri: item.Image }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.Name}</Text>
                                    <Text style={styles.productPrice}>{item.Price} VNĐ</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.id)}>
                                    <Image source={require('../assets/delete.png')} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}

                {/* Nút Thanh Toán & Xóa Giỏ Hàng */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PaymentScreen", { cartItems })}>
                        <Text style={styles.buttonText}>Thanh toán</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={clearCart}>
                        <Text style={[styles.buttonText, styles.buttonTextOutline]}>Xóa hết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // ✅ Làm mờ nền giúp nội dung dễ đọc hơn
        padding: 15,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFD700', // ✅ Màu vàng nhẹ nhàng, không quá chói
        textAlign: 'left',
        marginVertical: 15,
    },

    deleteButton: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    productItem2: {
        height: 100,
        width: '90%',
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFD700',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },

    productImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
    },

    productInfo: {
        flex: 1,
    },

    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    productPrice: {
        fontSize: 14,
        color: '#A0522D', // ✅ Màu nâu nhẹ, hài hòa với nền
        marginTop: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },

    button: {
        backgroundColor: '#8B5E3C', // Màu nâu nhẹ, phù hợp với chủ đề
        padding: 12,
        margin: 5,
        borderRadius: 8,
        width: 150,
        alignItems: 'center',
    },

    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#8B5E3C',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    buttonTextOutline: {
        color: '#8B5E3C',
    },
});
