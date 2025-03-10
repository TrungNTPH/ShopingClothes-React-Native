import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import { getListProduct, createProduct, updateProduct, deleteProduct } from '../Components/apiServices';

const AdminScreen = () => {
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Lấy danh sách sản phẩm
    const fetchProducts = async () => {
        const data = await getListProduct();
        setList(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Thêm hoặc cập nhật sản phẩm
    const handleSaveProduct = async () => {
        if (!name || !price || !image) {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!');
            return;
        }

        const productData = { Name: name, Price: price, Image: image };

        if (editingProduct) {
            await updateProduct(editingProduct.id, productData);
        } else {
            await createProduct(productData);
        }

        setModalVisible(false);
        setEditingProduct(null);
        setName('');
        setPrice('');
        setImage('');
        fetchProducts();
    };

    // Mở modal để sửa sản phẩm
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setName(product.Name);
        setPrice(product.Price);
        setImage(product.Image);
        setModalVisible(true);
    };

    // Xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Xóa', onPress: async () => {
                await deleteProduct(id);
                fetchProducts();
            }}
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quản lý Sản phẩm</Text>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <View>
                            <Text style={styles.productName}>{item.Name}</Text>
                            <Text style={styles.productPrice}>{item.Price} VNĐ</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleEditProduct(item)}>
                                <Text style={styles.buttonText}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item.id)}>
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>+ Thêm sản phẩm</Text>
            </TouchableOpacity>

            {/* Modal Thêm / Sửa sản phẩm */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput placeholder="Tên sản phẩm" style={styles.input} value={name} onChangeText={setName} />
                        <TextInput placeholder="Giá sản phẩm" style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
                        <TextInput placeholder="URL Hình ảnh" style={styles.input} value={image} onChangeText={setImage} />
                        
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AdminScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    productItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1 },
    productName: { fontSize: 16, fontWeight: 'bold' },
    productPrice: { fontSize: 14, color: 'green' },
    actions: { flexDirection: 'row' },
    editButton: { backgroundColor: '#FFA500', padding: 10, borderRadius: 5, marginRight: 5 },
    deleteButton: { backgroundColor: '#FF4500', padding: 10, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    addButton: { backgroundColor: '#008000', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
    input: { borderBottomWidth: 1, padding: 10, marginBottom: 10 },
    saveButton: { backgroundColor: '#008000', padding: 10, borderRadius: 5, marginBottom: 10 },
    cancelButton: { backgroundColor: '#aaa', padding: 10, borderRadius: 5 }
});
