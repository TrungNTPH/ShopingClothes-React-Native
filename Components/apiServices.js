import axios from "axios";

const urlApi = "http://192.168.1.12:3000/users";
const urlApiProduct = "http://192.168.1.12:3000/products";
    // chạy lại git 
    // chạy lại git 
    // chạy lại git 

export const registerUser = async (user) => {
    try {
        console.log("Gửi dữ liệu:", user);
        const res = await axios.post(`${urlApi}`,user);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
        return null;
    }
}

export const loginUser = async (user) => {
    try {
        const res = await axios.get(`${urlApi}`);
        const users = res.data;
        console.log(users);
        const foundUser = users.find(
            u => u.Email === user.Email && u.Password === user.Password
        )
        if(foundUser){
            console.log("Dang nhap thanh cong");
            return foundUser;
        }else{
            console.log("Sai tài khoản hoặc mật khẩu");
            return null;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getListProduct = async () => {
    try {
        const res = await axios.get(urlApiProduct);
        return res.data;
    } catch (error) {
        console.error( error.response?.data || error.message);
        return null;
    }
}
export const getProductById = async (id) => {
    try {
        console.log(`🔍 Đang gửi request đến API với ID: ${id}`);
        const res = await axios.get(`${urlApiProduct}/${id}`);
        console.log("✅ Dữ liệu nhận được từ API:", res.data);
        return res.data;
    } catch (error) {
        console.error(`❌ Lỗi khi lấy sản phẩm ID: ${id}`, error.response?.data || error.message);
        return null;
    }
};

export const createProduct = async (product) => {
    try {
        const res = await axios.post(urlApiProduct, product);
        return res.data;
    } catch (error) {
        console.error("❌ Lỗi khi thêm sản phẩm:", error);
        return null;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const res = await axios.put(`${urlApiProduct}/${id}`, product);
        return res.data;
    } catch (error) {
        console.error(`❌ Lỗi khi cập nhật sản phẩm ID: ${id}`, error);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${urlApiProduct}/${id}`);
        return true;
    } catch (error) {
        console.error(`❌ Lỗi khi xóa sản phẩm ID: ${id}`, error);
        return false;
    }
};
