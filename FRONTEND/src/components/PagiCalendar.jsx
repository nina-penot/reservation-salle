import { useState, useEffect } from "react";

export default function PagiCalendar({ month, year, MonthUp, MonthDown }) {

    const Num_to_Month = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre"
    }

    const [currentMonth, setCurrentMonth] = useState(month);

    useEffect(() => {
        setCurrentMonth(month);
    }, [month])

    function GoBack(e) {
        e.preventDefault();
        MonthDown();
        setCurrentMonth(month);
    }

    function GoNext(e) {
        e.preventDefault();
        MonthUp();
        setCurrentMonth(month);
    }

    return (
        <section className="float_left">
            {/* previous page button */}
            <button onClick={GoBack} className="btn_regular color_light"><div className="arrow_left"></div></button>
            {/* month */}
            <div> {Num_to_Month[currentMonth]} {year} </div>
            {/* next page button */}
            <button onClick={GoNext} className="btn_regular color_light"><div className="arrow_right"></div></button>
        </section>
    )
}