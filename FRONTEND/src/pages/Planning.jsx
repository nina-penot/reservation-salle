import { useNavigate } from "react-router";

export default function Planning({ reservations }) {

    const navigate = useNavigate();

    function gotoform() {
        navigate("/reservation");
    }

    //build hours map
    const hour_map = [...Array(12).keys()].map(num =>
        <div className="border_bottom"> {num + 8}h </div>
    );

    //build reserv map
    const event_map = [...Array(12).keys()].map(num =>
        <div className="border_bottom"></div>
    );

    //build days map
    const day_array = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    const day_map = day_array.map((day, index) =>
        <div className="planning_day color_medium">
            <div className="planning_day_title color_light">
                <div> {day} </div>
                <div>Insert date here</div>
            </div>
            {event_map}
            <div className="planning_reservation_cont">
                {/* Example of a reservation to comment */}
                <div className="restest">
                    <div>Nom Prénom</div>
                    <div>Objet jkfdgh krdhgksfhgjgllg zeglglglzelg egzgl fdsglf</div>
                </div>
            </div>
        </div>
        // <div className="planning_day color_medium" style={{ gridColumn: (index + 1).toString, gridRow: " 1 / span 13" }}>
        //     <div className="planning_day_title color_light">
        //         <div>{day}</div>
        //         <div>Insert date here</div>
        //     </div>
        //     <div className="planning_reservation_cont"></div>
        // </div>
    );


    return (
        <>
            <section className="planning_cont">
                <div className="planning color_dark">
                    {/* hours */}
                    <div className="planning_hour_cont">
                        <div></div>
                        {hour_map}
                    </div>
                    {/* days */}
                    <div className="planning_day_cont">
                        {day_map}
                    </div>
                </div>
                <button onClick={gotoform} className="btn_regular color_light">Réserver</button>
            </section>
        </>
    )
}