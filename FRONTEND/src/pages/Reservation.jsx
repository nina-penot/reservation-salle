import { useState, useEffect } from "react";
//import Pagination from "../components/Pagination";
import { GenerateCalendar, GenerateDaysofMonth, GenerateActiveTrack } from "../utils/UtilFunc";
import ResMonthElem from "../components/ResMonthElem";
import PagiCalendar from "../components/PagiCalendar";
import ResDayElem from "../components/ResDayElem";

// Reservation form
export default function Reservation() {

    const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
    const [currentDay, setCurrentDay] = useState(new Date(Date.now()).getDate())
    const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()).getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date(Date.now()).getFullYear());
    const [year, setYear] = useState(new Date(Date.now()).getFullYear());
    const [month, setMonth] = useState(new Date(Date.now()).getMonth() + 1);
    const [monthArray, setMonthArray] = useState(
        GenerateCalendar({
            month: month,
            ignoreWeekEnd: true,
            year: year
        })
    );

    const [objectInput, setObjectinput] = useState("");
    const [errors, setErrors] = useState(false);
    // console.log(currentDate.getDate());

    const [activeTrack, setActiveTrack] = useState(GenerateActiveTrack(monthArray, month, currentMonth, currentDay));

    // function makeTrack() {
    //     let trackPrep = [];
    //     for (let e in monthArray) {
    //         let current_obj = monthArray[e]
    //         let pushobj = {
    //             key: e,
    //             date: current_obj.date,
    //             month: current_obj.monthnum,
    //             active: false,
    //             selectable: true,
    //         }
    //         if (current_obj.monthnum != month) {
    //             pushobj.selectable = false;
    //         }
    //         trackPrep.push(pushobj);
    //     }

    //     setActiveTrack(trackPrep);
    // }
    //console.log(activeTrack);

    //Updates the calendar when month and year changes
    useEffect(() => {
        setMonthArray(
            GenerateCalendar({
                month: month,
                ignoreWeekEnd: true,
                year: year
            })
        );
    }, [month, year]);

    // useEffect(() => {
    //     makeTrack();
    //     console.log("Track maker useffect activated.");
    // }, [monthArray])

    useEffect(() => {
        setMonthArray(GenerateCalendar({
            month: month,
            ignoreWeekEnd: true,
            year: year
        }));

    }, [month])

    useEffect(() => {
        setActiveTrack(GenerateActiveTrack(monthArray, month, currentMonth, currentDay));
    }, [monthArray])


    function MonthDown() {
        if (month - 1 >= currentMonth) {
            if (month - 1 < 1) {
                setMonth(12);
                setYear(year - 1);
            } else {
                setMonth(month - 1);
            }
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
        for (let a in array) {
            if (array[a].active) {
                return { index: a, data: array[a] };
            }
        }
        return false;
    }

    function getActiveDate(array) {
        for (let a in array) {
            if (array[a].active) {
                return array[a].date;
            }
        }
        return null;
    }

    function getActiveDay(array) {
        for (let a in array) {
            if (array[a].active) {
                return array[a].daynum;
            }
        }
        return null;
    }

    function updateActive(array, num) {
        const myupdate = array.map((track, index) => {
            if (index == num) {
                if (track.active) {
                    return {
                        ...track,
                        active: false
                    }
                } else {
                    return {
                        ...track,
                        active: true
                    }
                }
            } else {
                return track;
            }
        });

        return myupdate;
    }

    function onElemClick(index) {

        let active = checkActives(activeTrack);
        let prevactive, removeactive, updater;
        if (active) {
            //console.log("GIT", active.index);
            prevactive = active.index;
            removeactive = updateActive(activeTrack, prevactive);
            //console.log("removeactive:", removeactive);
            // setActiveTrack(removeactive);
            updater = updateActive(removeactive, index)
        } else {
            updater = updateActive(activeTrack, index);
        }
        setActiveTrack(updater);

        //console.log("indexed look: ", index, activeTrack[index]);
    }

    const calendar_map = activeTrack.map((track, index) => <ResMonthElem key={track.key} date={track.date}
        isSelectable={track.selectable} isActive={track.active} onElemClick={() => onElemClick(index)} />);

    function checkErrors() {
        //reset errors
        setErrors(false);

        //if no date selected
        //if no hour selected
        //if no object input
        if (!objectInput) {
            setErrors(true);
        }
        if (errors) {
            e.preventDefault();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!errors) {
            //submit the form and create reservation
        }
    }

    return (
        <section className="form_container">
            <form className="form color_dark" onSubmit={handleSubmit}>
                <div className="form_title color_light">Réserver un créneau</div>
                {/* Section calendar + day */}
                <div className="float_left">
                    {/* Month calendar */}
                    <div className="calendar_cont color_dark">
                        <PagiCalendar MonthUp={MonthUp} MonthDown={MonthDown} month={month} year={year} />
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
                    <ResDayElem date={getActiveDate(activeTrack)} day={getActiveDay(activeTrack)}
                        month={month} year={year} />
                </div>
                <div className="form_input_group">
                    <div>Objet de la réservation</div>
                    <input className='form_input' type="text"
                        placeholder="Réunion, travail en équipe..."
                        onChange={(e) => { setObjectinput(e.target.value) }} value={objectInput}></input>
                </div>
                {errors && "Veuillez remplir tous les champs."}
                <button onClick={checkErrors} className="btn_regular color_light">Réserver</button>
            </form>
        </section>
    )
}