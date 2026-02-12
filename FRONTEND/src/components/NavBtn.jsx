import { useNavigate } from "react-router";

export default function NavBtn({ url, text }) {

    const navigate = useNavigate();

    function go_to() {
        navigate(url);
    }

    return (
        <button className="btn_regular color_light" onClick={go_to}>{text}</button>
    )
}