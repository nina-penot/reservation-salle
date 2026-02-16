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

    const [activeTrack, setActiveTrack] = useState([]);

    function makeTrack() {
        let trackPrep = [];
        for (let e in monthArray) {
            let current_obj = monthArray[e]
            let pushobj = {
                key: e,
                date: current_obj.date,
                month: current_obj.monthnum,
                active: false,
                selectable: true,
            }
            if (current_obj.monthnum != month) {
                pushobj.selectable = false;
            }
            trackPrep.push(pushobj);
        }

        setActiveTrack(trackPrep);
    }
    //console.log(activeTrack);

    useEffect(() => {
        setMonthArray(
            GenerateCalendar({
                month: month,
                ignoreWeekEnd: true,
                year: year
            })
        );
    }, [month, year]);

    useEffect(() => {
        makeTrack();
        console.log("Track maker useffect activated.");
    }, [monthArray])


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

    function checkActives(array) {
        for (let a of array) {
            if (a.active) {
                return true;
            }
        }
        return false;
    }

    function onElemClick(index) {
        let updater = activeTrack;
        if (checkActives(updater)) {
            if (updater[index].active) {
                updater[index].active = false;
                setActiveTrack(updater);
            }
        } else {
            updater[index].active = true;
            setActiveTrack(updater);
        }

        console.log(index, activeTrack[index]);
    }

    const calendar_map = activeTrack.map((date, index) => <ResMonthElem key={date.key} date={date.date}
        isSelectable={date.selectable} isActive={date.active} onElemClick={() => onElemClick(index)} />);

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