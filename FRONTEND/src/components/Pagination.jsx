import { useState } from "react";

export default function Pagination({ maxpage }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(maxpage);



    return (
        <section className="float_left">
            {/* previous page button */}
            <button className="btn_regular color_light"><div className="arrow_left"></div></button>
            {/* goto page input + btn */}
            <input type="number"></input>
            <button className="btn_regular color_light">Aller</button>
            {/* Page counter (if needed) */}
            {maxPage && <div> {currentPage} / {maxPage} </div>}
            {/* next page button */}
            <button className="btn_regular color_light"><div className="arrow_right"></div></button>
        </section>
    )
}