import { useNavigate } from "react-router";

export default function HomeBtn() {

    const navigate = useNavigate();

    function go_home() {
        navigate("/");
    }

    return (
        <button className="btn_regular color_light" onClick={go_home}>Accueil</button>
    )
}