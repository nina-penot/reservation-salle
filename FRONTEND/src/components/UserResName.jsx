import { useState, useEffect } from "react";
import useUserinfo from "../hooks/useUserinfo";

export default function UserResName({ userid }) {
    //console.log(userid);

    const { userinfo, getUserinfo } = useUserinfo();

    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [loading, setLoading] = useState(false);
    const [myUser, setMyUser] = useState();
    //const [myid, setMyId] = useState(userid);

    useState(() => {
        loaduserinfo(userid);
    }, [userid]);

    async function loaduserinfo(userid) {
        try {
            setLoading(true);
            const data = await getUserinfo(userid);
            console.log("data:", data);
            //setMyUser(data);
            setFirstName(data.results.firstname);
            setLastName(data.results.lastname);
        } catch (err) {
            console.log("erreur chargement user");
            setLoading(false);
        } finally {
            setLoading(false);
            console.log("myuser:", myUser);
            console.log("userinfo", userinfo)
        }
    }

    return (
        <div> {loading ? "Loading..." : firstname + " " + lastname} </div>
    )
}