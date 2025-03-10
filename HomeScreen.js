import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput, ImageBackground } from 'react-native';
import { getListProduct } from './apiServices';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const getList = async () => {
    const data = await getListProduct();
    // console.log(data)
    setList(data);

  }
  useEffect(() => {
    getList();
    console.log("Chạy")
  }, []);

  return (
    <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
      <View style={styles.overlay}>
        {/* Ô tìm kiếm */}
        <TextInput placeholder='🔍 Tìm kiếm...' placeholderTextColor="#fff" style={styles.inputSearch} />

        {/* Danh sách sản phẩm khuyến mãi */}
        <View style={styles.rowContainer}>
          <Text style={styles.title}>✨ Khuyến mãi Tết ✨</Text>
          <Text style={styles.all}>Xem tất cả</Text>
        </View>

        <FlatList
          horizontal={true}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate("ProductDetailScreen", {id: item.id})} >
              <Image source={{ uri: item.Image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.Name}</Text>
                <Text style={styles.productPrice}>{item.Price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        
<View style={styles.rowContainer}>
          <Text style={styles.title}>🔥 Mua nhiều nhất 🔥</Text>
          <Text style={styles.all}>Xem tất cả</Text>
        </View>
        <FlatList
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItem2} onPress={() => navigation.navigate("ProductDetailScreen", {id: item.id})}>
              <Image source={{ uri: item.Image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.Name}</Text>
                <Text style={styles.productPrice}>{item.Price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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

  rowContainer: {
    flexDirection: 'row', // ✅ Hiển thị nội dung theo hàng ngang
    justifyContent: 'space-between', // ✅ Đặt "Xem tất cả" ở góc phải
    alignItems: 'center', // ✅ Canh giữa theo chiều dọc
    paddingHorizontal: 10, // ✅ Thêm khoảng cách hai bên
    marginBottom: 10, // ✅ Khoảng cách dưới
},

title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 15,
},

all: {
    fontSize: 14,
    color: 'blue',
},

  inputSearch: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    borderColor: '#FFD700',
    borderWidth: 1,
  },

  productItem: {
    height: 200,
    width: 140,
    marginRight: 20,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // ✅ Làm sản phẩm sáng hơn trên nền tối
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700', // ✅ Viền vàng nhẹ, không quá nổi bật
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
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
});
