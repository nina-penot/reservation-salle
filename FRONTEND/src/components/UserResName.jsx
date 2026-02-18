import { useState, useEffect } from "react";
import useUserinfo from "../hooks/useUserinfo";

export default function UserResName({ userid }) {
    //console.log(userid);

    const { userinfo, getUserinfo } = useUserinfo();

    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();

    // useEffect(() => {
    //     infoget();
    //     console.log("userinfo:", userinfo);
    // }, [userid])

    useEffect(() => {
        getUserinfo(userid);
        console.log("activated");
    }, [userid])

    // useEffect(() => {
    //     setFirstName(userinfo.firstname);
    //     setLastName(userinfo.lastname);
    // }, [userinfo])

    // async function infoget() {
    //     try {
    //         await getUserInfo(userid);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div> {userinfo && userinfo.firstname} {userinfo && userinfo.lastname} </div>
    )
}