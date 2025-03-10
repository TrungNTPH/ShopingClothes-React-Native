import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';

export default function ProfileScreen() {
    const users = [
        { 
            id: '1', 
            name: 'User 1', 
            birthday: '22/02/2005', 
            image: 'https://naidecor.vn/wp-content/uploads/2020/01/ct00192-549k.jpg',
            phone: '0312321232',
            email: 'deptraivodich@gmail.com'
        },
    ];

    return (
        <ImageBackground source={require('../assets/bgtet.jpeg')} style={styles.background}>
            <View style={styles.container}>
                {/* Avatar */}
                <Image source={{ uri: users[0].image }} style={styles.image} />
                
                {/* Thông tin cá nhân */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Họ và tên: {users[0].name}</Text>
                    <Text style={styles.text}>Ngày sinh: {users[0].birthday}</Text>
                    <Text style={styles.text}>Số điện thoại: {users[0].phone}</Text>
                    <Text style={styles.text}>Email: {users[0].email}</Text>
                </View>
            </View>

            {/* Opacity chứa nút chức năng */}
            <View style={styles.opacityContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.logoutButton]}>
                    <Text style={[styles.buttonText, styles.logoutText]}>Đăng xuất</Text>
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
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'gold',
        marginBottom: 15,
    },

    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A0522D',
        marginBottom: 10,
    },

    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
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
        marginVertical: 5,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    logoutButton: {
        backgroundColor: 'red',
    },

    logoutText: {
        color: '#fff',
    },
});
