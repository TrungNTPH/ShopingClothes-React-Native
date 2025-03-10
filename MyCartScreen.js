import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput, ImageBackground } from 'react-native';

export default function MyCartScreen({navigation}) {
    const products = [
        { id: '1', name: 'Sản phẩm A', price: '100.000đ', image: 'https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg' },
        { id: '2', name: 'Sản phẩm B', price: '200.000đ', image: 'https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg' },
        { id: '3', name: 'Sản phẩm C', price: '150.000đ', image: 'https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg' },
    ];

    return (
        <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Giỏ hàng của bạn</Text>
                <FlatList
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.productItem2}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                            </View>
                            
                            <TouchableOpacity style={styles.deleteButton} >
                                <Image source={require('../assets/delete.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PaymentScreen")}>
                        <Text style={styles.buttonText}>Thanh toán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
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
