// import axios from "axios";
// import { BASE_URL } from "../base_url";

// export const adminLogin = async (username, password) => {
//     const basicAuth = btoa("Pearl:PearlProdChecker@12390");
//     try {
//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('password', password);
//         const rs = await axios.post(`${BASE_URL}/admin/login`, formData,
// {
//     headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Basic ${basicAuth}`,
//         },
// })
// console.log(rs.status);
// return rs.data
//     } catch (error) {
//         console.log(error);
        
//     }
// } 