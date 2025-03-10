import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';

export default function PaymentScreen() {
    const order = {
        id: '123456',
        items: [
            { name: 'Sản phẩm A', price: '100.000đ', image: 'https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg' },
            { name: 'Sản phẩm B', price: '200.000đ', image: 'https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg' },
        ],
        total: '300.000đ',
        paymentMethod: 'Ví điện tử',
    };
    // chạy lại git 

    return (
        <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Thanh toán</Text>

                {/* Danh sách sản phẩm */}
                <View style={styles.orderContainer}>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.orderItem}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Tổng tiền và phương thức thanh toán */}
                <View style={styles.paymentDetails}>
                    <Text style={styles.paymentText}>Tổng cộng: <Text style={styles.totalPrice}>{order.total}</Text></Text>
                    <Text style={styles.paymentText}>Phương thức thanh toán: <Text style={styles.highlight}>{order.paymentMethod}</Text></Text>
                </View>
            </View>

            {/* Opacity chứa nút xác nhận thanh toán */}
            <View style={styles.opacityContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#A0522D',
        marginBottom: 15,
    },

    orderContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    productImage: {
        width: 60,
        height: 60,
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
        color: '#A0522D',
        marginTop: 5,
    },

    paymentDetails: {
        marginTop: 15,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    paymentText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },

    highlight: {
        fontWeight: 'bold',
        color: '#A0522D',
    },

    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A0522D',
    },

    opacityContainer: {
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    button: {
        backgroundColor: 'gold',
        padding: 12,
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
