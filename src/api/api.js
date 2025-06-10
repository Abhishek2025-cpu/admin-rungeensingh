import axios from "axios";

export const BASE_URL = "https://rungeenApp.ddns.net"


// export const adminLogin = async (username, password) => {
//   const basicAuth = btoa("Pearl:PearlProdChecker@12390"); 

//   const response = await fetch(`${BASE_URL}/admin/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${basicAuth}`, 
//     },
//     body: JSON.stringify({username: username, password: password}),
//   });

//   console.log("my login res: ", response);

//   if (!response.ok) {
//     throw new Error("Login failed");
//   }

//   return response.json();
// };

export const adminLogin = async (username, password) => {
    const basicAuth = btoa("Pearl:PearlProdChecker@12390");
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const rs = await axios.post(`${BASE_URL}/admin/login`, formData,
{
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${basicAuth}`,
        },
})
console.log(rs);
return rs.data
    } catch (error) {
        console.log(error);
        
    }
} 