import { useEffect } from "react";
import UserResName from "./UserResName";

export default function ResDayElem({ day, date, month, year, reservationData }) {

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
    };

    const Num_to_Day = {
        1: "Lundi",
        2: "Mardi",
        3: "Mercredi",
        4: "Jeudi",
        5: "Vendredi"
    };

    //the amount to reduce the style "grid-row-start/end" for the reservation events
    // Example: an event starting at 8 will be in start 1 (8-7)
    const reducePosition = 7;

    //build hours map
    const hour_map = [...Array(12).keys()].map(num =>
        <div className="border_bottom planning_hour"> {num + 8}h </div>
    );

    //build event_map (for presentation)
    const event_map = [...Array(12).keys()].map(num =>
        <div className="border_bottom"></div>
    );

    //note: must also find a way to get the user info for nom prénom
    //console.log("reservationData", reservationData);
    let reservation_map;
    if (reservationData) {
        reservation_map = reservationData.map((res, index) => {
            return (<div key={index} className="res" style={{
                gridRowStart: (res.hour_start - reducePosition).toString(),
                gridRowEnd: (res.hour_end - reducePosition).toString()
            }}>
                <UserResName key={index} userid={res.user_id} />
                <div> {res.object} </div>
            </div>)
        }

        )
    }


    //if no day then generate it empty
    //else generate it with the data of that day (access db)

    if (date) {
        return (
            <section className="day_planning">
                <div className="planning_hour_cont">
                    <div></div>
                    {hour_map}
                </div>
                <div className="planning_day color_medium">
                    <div className="planning_day_title color_light">
                        <div> {Num_to_Day[day]} </div>
                        <div> {date} {Num_to_Month[month]} {year} </div>
                    </div>
                    {event_map}
                    <div className="planning_reservation_cont">
                        {/* Example of a reservation to comment */}
                        {/* <div className="restest">
                            <div>Nom Prénom</div>
                            <div>Objet jkfdgh krdhgksfhgjgllg zeglglglzelg egzgl fdsglf</div>
                        </div> */}
                        {reservation_map}
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section className="day_planning">
                <div className="planning_hour_cont">
                    <div></div>
                    {hour_map}
                </div>
                <div className="planning_day color_medium">
                    <div className="planning_day_title color_light">
                        <div> Sélectionnez une date. </div>
                    </div>
                    {event_map}
                </div>
            </section>
        )
    }

}