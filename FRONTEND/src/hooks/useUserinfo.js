import { authService } from "../services/api";
import { useState } from "react";

export default function useUserinfo() {

    const [userinfo, setUserinfo] = useState([]);

    const getUserinfo = async (id) => {
        const data = await authService.getUserInfo(id);
        if (data) {
            //console.log(data);
            setUserinfo(data);
        } else {
            console.log("no data?");
        }
        return data;
    }

    return { userinfo, getUserinfo }
}