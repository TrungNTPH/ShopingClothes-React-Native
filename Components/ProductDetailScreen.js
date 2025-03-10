import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { getProductById } from './apiServices';
import { useEffect,useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductDetailScreen({route, navigation}) {
    // chạy lại git 

    const { id } = route.params;
    console.log("🆔 ID sản phẩm nhận được:", id);
    const [products, setProduct] = useState(null);
    const getProduct = async () => {
        if (!id) {
            console.error("❌ Lỗi: ID sản phẩm không hợp lệ!");
            return;
        }
        
        try {
            console.log("🔄 Gọi API để lấy sản phẩm...");
            const productData = await getProductById(id);
            
            if (!productData) {
                console.error("❌ API không trả về dữ liệu!");
                return;
            }
    
            console.log("✅ Dữ liệu sản phẩm sau khi gọi API:", productData);
            setProduct(productData);
        } catch (error) {
            console.error("❌ Lỗi khi lấy sản phẩm:", error);
        }
    };
    

    useEffect(() => {
        console.log("test");
        getProduct();
    }, [])

    return (
        <ScrollView>


        <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
            <View style={styles.container}>
                {/* Kiểm tra nếu chưa có dữ liệu thì hiển thị loading */}
                {products === null ? (  
                    <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>  
                ) : (  
                    <>
                        {/* Ảnh sản phẩm */}
                        <Image source={{  uri: products?.Image || 'https://example.com/default.jpg' }} style={styles.image} />
    
                        {/* Tên sản phẩm & giá */}
                        <View style={styles.textContainer}>
                            <Text style={styles.productName}>{products?.Name || 'Tên sản phẩm'}</Text>
                            <Text style={styles.productPrice}>{products?.Price || 'Giá sản phẩm'} VNĐ</Text>
                        </View>
    
                        {/* Mô tả sản phẩm */}
                        <Text style={styles.productDescription}>{products?.Description || 'Mô tả sản phẩm'}</Text>
    
                        {/* Chọn size */}
                        <View style={styles.containerSize}>
                            <Text style={styles.size}>Size:</Text>
                            <TouchableOpacity style={styles.sizeButton}><Text style={styles.sizeText}>S</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.sizeButton}><Text style={styles.sizeText}>M</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.sizeButton}><Text style={styles.sizeText}>L</Text></TouchableOpacity>
                        </View>
    
                        {/* Chọn số lượng */}
                        <View style={styles.quantityControl}>
                            <TouchableOpacity style={styles.quantityButton}>
                                <Icon name="minus" size={18} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>1</Text>
                            <TouchableOpacity style={styles.quantityButton}>
                                <Icon name="plus" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
    
                        {/* Nút Mua & Thêm vào giỏ hàng */}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyCartScreen")}><Text style={styles.buttonText}>Mua ngay</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => navigation.navigate("MyCartScreen")}>
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
