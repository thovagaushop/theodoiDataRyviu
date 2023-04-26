import axios from "axios";

export const getData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataInfo = await axios.get("https://sddhhwkvse.execute-api.ap-southeast-1.amazonaws.com/shopifydev/", {
                headers: {
                    "Content-Type": "text/plain",
                }
            });
            return resolve(dataInfo.data);
        } catch (error) {
            return reject(error);
        }
    })
};