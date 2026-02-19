import { useState, useEffect } from "react";
//import Pagination from "../components/Pagination";
import { GenerateCalendar, GenerateDaysofMonth, GenerateActiveTrack } from "../utils/UtilFunc";
import ResMonthElem from "../components/ResMonthElem";
import PagiCalendar from "../components/PagiCalendar";
import ResDayElem from "../components/ResDayElem";
import useReservation from "../hooks/useReservation";
import { useAuth } from '../hooks/useAuth.js';

// Reservation form
export default function Reservation() {

    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
    const [fulldate, setFullDate] = useState("");
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

    const [activeTrack, setActiveTrack] = useState(GenerateActiveTrack(monthArray, month, currentMonth, currentDay));
    const [currentActive, setCurrentActive] = useState(null);

    const { resbyDate, getResbyDate, createRes } = useReservation();

    const [ReswithUser, setReswithUser] = useState([]);

    const [hourInputStart, setHourInputStart] = useState("");
    const [hourInputEnd, setHourInputEnd] = useState("");
    const [overlap, setOverlap] = useState(false);

    useEffect(() => {
        let myfulldate;
        if (currentActive) {
            let mymonth = currentActive.month;
            let mydate = currentActive.date;
            if (mymonth.toString().length < 2) {
                mymonth = "0" + mymonth;
            }
            if (mydate.toString().length < 2) {
                mydate = "0" + mydate;
            }
            myfulldate = year + "-" + mymonth + "-" + mydate;
            //console.log("Your active date = ", myfulldate);
        }
        if (myfulldate) {
            getResbyDate(myfulldate);
            setFullDate(myfulldate);
        }

    }, [currentActive])
    //console.log("resbydate =", resbyDate);

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
        if (month - 1 >= currentMonth || year > currentYear) {
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
        setCurrentActive(activeTrack[index]);

        //console.log("indexed look: ", index, activeTrack[index]);
    }

    const calendar_map = activeTrack.map((track, index) => <ResMonthElem key={track.key} date={track.date}
        isSelectable={track.selectable} isActive={track.active} onElemClick={() => onElemClick(index)} />);

    function checkErrors() {
        //reset errors
        setErrors(false);

        //if no date selected
        if (!currentActive) {
            setErrors(true);
        }
        //if no hour selected
        if (!hourInputEnd || !hourInputStart) {
            setErrors(true);
        }
        if (overlap) {
            setErrors(true);
        }
        //if no object input
        if (!objectInput) {
            setErrors(true);
        }
        if (errors) {
            e.preventDefault();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!errors) {
            setLoading(true);
            try {
                const reservationData = {
                    user_id: user.id,
                    object: objectInput,
                    date: fulldate,
                    hour_start: hourInputStart,
                    hour_end: hourInputEnd
                };

                await createRes(reservationData);

                //     await register(userData);
                //     navigate(from, { replace: true });
                // } catch (err) {
                //     setError(err.message || 'Erreur de connexion');
                // } finally {
                //     setLoading(false);
                // }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }

    function hour_check_start(e) {
        let inp = e.target.value;
        if (inp < 8) {
            e.target.value = 8;
        }
        if (inp > 18) {
            e.target.value = 18;
        }
    }

    function hour_check_end(e) {
        let inp = e.target.value;
        if (inp > 19) {
            e.target.value = 19;
        }
        if (inp < 9) {
            e.target.value = 9;
        }
    }

    function check_overlaps(hour_start, hour_end) {
        let results = resbyDate.results;
        if (getActiveDate(activeTrack)) {
            for (let e in results) {
                console.log("start hour:", hour_start, "| this res hour slice: ", results[e].hour_start,
                    results[e].hour_end
                )
                if (hour_start >= results[e].hour_start && hour_start < results[e].hour_end) {
                    setOverlap(true);
                    return true;
                }
                if (hour_end > results[e].hour_start && hour_end <= results[e].hour_end) {
                    setOverlap(true);
                    return true;
                }
                if (hour_start <= results[e].hour_start && hour_end >= results[e].hour_end) {
                    setOverlap(true);
                    return true;
                }
            }
        }
    }

    function hour_input_troubleshoot() {
        setOverlap(false);
        if (hourInputStart >= hourInputEnd && hourInputStart != "") {
            setHourInputEnd(Number(hourInputStart) + 1);
        }
        if (check_overlaps(hourInputStart, hourInputEnd)) {
            setOverlap(true);
        }
    }

    useEffect(() => {
        hour_input_troubleshoot();
        console.log("hello", hourInputStart, hourInputEnd, overlap);
    }, [hourInputStart, hourInputEnd, resbyDate])

    function hourinuput() {
        const overlap_msg = "Attention : superposition détectée.";
        if (getActiveDate(activeTrack)) {
            return (
                <div>
                    {/* heures temporaires */}
                    {/* début doit pas être => fin, fin doit pas être <= début */}
                    <div>Choisissez votre créneau horaire.</div>
                    <div className="float_left">
                        <input onBlur={hour_check_start} onChange={(e) => { setHourInputStart(e.target.value) }}
                            type="number" min={8} max={18} value={hourInputStart}></input>
                        <div>h</div>
                    </div>
                    <div>
                        <input onBlur={hour_check_end} onChange={(e) => { setHourInputEnd(e.target.value) }}
                            type="number" min={9} max={19} value={hourInputEnd}></input>
                    </div>

                    {/* if overlap error add a message here about it */}
                    <div>{overlap && overlap_msg}</div>
                    <div>{!overlap && hourInputEnd && hourInputStart && "Créneau valide de " + hourInputStart
                        + "h à " + hourInputEnd + "h."}</div>
                </div>
            )
        }

    }

    //console.log(resbyDate);

    return (
        <section className="form_container">
            <form className="form color_dark" onSubmit={handleSubmit}>
                <div className="form_title color_light">Réserver un créneau</div>
                {/* Section calendar + day */}
                <div className="float_left">
                    {/* Month calendar */}
                    <div>
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
                        {hourinuput()}
                    </div>
                    {/* Day sum up */}
                    <ResDayElem date={getActiveDate(activeTrack)} day={getActiveDay(activeTrack)}
                        month={month} year={year} reservationData={resbyDate.results}
                        preview_start={hourInputStart} preview_end={hourInputEnd}
                        preview_obj={objectInput} />
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