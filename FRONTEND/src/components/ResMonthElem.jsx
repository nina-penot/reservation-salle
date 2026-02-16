import { useState } from "react";

export default function ResMonthElem({ date }) {

    const [isactive, setActive] = useState(false);

    function activate(e) {
        //console.log(e.target.classList);
        if (isactive) {
            e.target.className = "color_light calendar_month_elem";
            setActive(false);
        } else {
            e.target.className = "color_medium calendar_month_elem";
            setActive(true);
        }
    }

    return (
        <div onClick={activate} className="color_light calendar_month_elem">{date}</div>
    )
}