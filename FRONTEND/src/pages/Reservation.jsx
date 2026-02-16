import { useState, useEffect } from "react";
//import Pagination from "../components/Pagination";
import { GenerateCalendar, GenerateDaysofMonth } from "../utils/UtilFunc";
import ResMonthElem from "../components/ResMonthElem";
import PagiCalendar from "../components/PagiCalendar";

// Reservation form
export default function Reservation() {

    const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
    const [year, setYear] = useState(new Date(Date.now()).getFullYear());
    const [month, setMonth] = useState(new Date(Date.now()).getMonth() + 1);
    const [monthArray, setMonthArray] = useState(
        GenerateCalendar({
            month: month,
            ignoreWeekEnd: true,
            year: year
        })
    );

    useEffect(() => {
        setMonthArray(
            GenerateCalendar({
                month: month,
                ignoreWeekEnd: true,
                year: year
            })
        )
    }, [month, year]);

    //console.log(month);

    const calendar_map = monthArray.map(date => {
        if (date.monthnum != month) {
            return <div className="color_grey_medium calendar_month_elem">{date.date}</div>
        } else {
            return <ResMonthElem date={date.date} />
        }
    });

    function MonthDown() {
        if (month - 1 < 0) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    function MonthUp() {
        if (month + 1 > 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    return (
        <section className="form_container">
            <form className="form color_dark">
                <div className="form_title color_light">Réserver un créneau</div>
                {/* Month calendar */}
                <div className="calendar_cont color_dark">
                    <PagiCalendar MonthUp={MonthUp} MonthDown={MonthDown} month={month} />
                    <div className="calendar_month_grid float_clear">
                        <div className="calendar_month_elem">Lun</div>
                        <div className="calendar_month_elem">Mar</div>
                        <div className="calendar_month_elem">Mer</div>
                        <div className="calendar_month_elem">Jeu</div>
                        <div className="calendar_month_elem">Ven</div>
                        {calendar_map}
                    </div>
                </div>
                {/* Day sum up */}
                <button className="btn_regular color_light">Réserver</button>
            </form>
        </section>
    )
}