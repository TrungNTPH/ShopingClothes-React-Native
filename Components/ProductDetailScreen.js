import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { getProductById } from './apiServices';

export default function ProductDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const [product, setProduct] = useState(null);

    // Lấy dữ liệu sản phẩm theo ID
    const getProduct = async () => {
        try {
            const productData = await getProductById(id);
            if (productData) {
                setProduct(productData);
            } else {
                console.error("❌ Không tìm thấy sản phẩm!");
            }
        } catch (error) {
            console.error("❌ Lỗi khi lấy sản phẩm:", error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async () => {
        try {
            let cart = await AsyncStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];

            // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                Alert.alert("Sản phẩm đã có trong giỏ hàng!");
                return;
            }

            cart.push(product);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            Alert.alert("Thêm vào giỏ hàng thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    return (
        <ScrollView>
            <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
                <View style={styles.container}>
                    {product === null ? (
                        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
                    ) : (
                        <>
                            <Image source={{ uri: product?.Image }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.productName}>{product?.Name}</Text>
                                <Text style={styles.productPrice}>{product?.Price} VNĐ</Text>
                            </View>
                            <Text style={styles.productDescription}>{product?.Description}</Text>

                            {/* Nút Mua & Thêm vào giỏ hàng */}
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button} onPress={async () => {
                                    await addToCart();
                                    navigation.navigate("MyCartScreen");
                                }}>
                                    <Text style={styles.buttonText}>Mua ngay</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={addToCart}>
                                    <Text style={[styles.buttonText, styles.buttonTextOutline]}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </ImageBackground>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    containerSize: {
        flexDirection: 'row', // ✅ Hiển thị ngang
        alignItems: 'center', // ✅ Canh giữa theo chiều dọc
        gap: 10, // ✅ Khoảng cách giữa các nút (React Native 0.71+)
        marginVertical: 10,
    },

    size: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10, // ✅ Tạo khoảng cách giữa "Size:" và các nút
    },

    sizeButton: {
        backgroundColor: '#ddd', // ✅ Màu nền nhẹ
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
    },

    sizeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: '90%',
        height: 250,
        borderRadius: 10,
    },

    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A0522D', // Màu nâu nhẹ phù hợp với nền da người
    },

    productDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
        color: '#555',
        fontStyle: 'italic',
        paddingHorizontal: 20,
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
    quantityControl: {
        flexDirection: 'row', // ✅ Hiển thị ngang
        alignItems: 'center', // ✅ Căn giữa theo chiều dọc
        justifyContent: 'center', // ✅ Căn giữa nội dung
        gap: 10, // ✅ Khoảng cách giữa các nút (React Native 0.71+)
        marginVertical: 10,
    },

    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // ✅ Màu nền nhẹ
        borderRadius: 8, // ✅ Bo góc cho đẹp
        borderWidth: 1,
        borderColor: '#ccc', // ✅ Viền nhẹ để tách biệt
    },

    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10, // ✅ Tạo khoảng cách giữa số lượng và nút
        color: '#333',
    },
});
