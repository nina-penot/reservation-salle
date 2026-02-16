import { useState, useEffect } from "react";

export default function ResMonthElem({ key, date, isActive, isSelectable, onElemClick }) {

    const [activity, setActivity] = useState(isActive);

    useEffect(() => {
        console.log("active changed : ", isActive);
        myfunc();
    }, [activity]);

    const myfunc = () => {
        if (isActive) {
            setActivity(true);
        } else {
            setActivity(false);
        }
    }

    // function activate(e) {
    //     console.log(e.target);
    //     if (isactive) {
    //         e.target.className = "color_light calendar_month_elem";
    //         setActive(false);
    //     } else {
    //         e.target.className = "color_medium calendar_month_elem";
    //         setActive(true);
    //     }
    // }

    if (isSelectable) {
        if (isActive) {
            return (
                <div onClick={onElemClick} className="color_medium calendar_month_elem">{date}</div>
            )
        } else {
            return (
                <div onClick={onElemClick} className="color_light calendar_month_elem">{date}</div>
            )
        }

    } else {
        return (
            <div className="color_grey_medium calendar_month_elem">{date}</div>
        )
    }

}