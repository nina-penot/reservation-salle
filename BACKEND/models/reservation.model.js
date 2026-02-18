import { query } from '../config/db.js';

const Reservation = {
    //find by id
    async findbyResID(id) {
        const sql = "SELECT * FROM reservation WHERE id = ?";
        const results = await query(sql, [id]);
        return results || null;
    },

    //find by user_id
    async findbyUserID(userid) {
        const sql = "SELECT * FROM reservation WHERE user_id = ?";
        const results = await query(sql, [userid]);
        return results || null;
    },

    //find by date
    async findbyDate(date) {
        const sql = "SELECT * FROM reservation WHERE date = ?";
        const results = await query(sql, [date]);
        return results || null;
    },

    //find in between two dates
    async findAllinDateBracket(date1, date2) {
        const sql = "SELECT * FROM reservation WHERE date BETWEEN ? AND ?";
        const results = await query(sql, [date1, date2]);
        return results || null;
    },

    //create new reservation
    async createRes({ user_id, object, date, hour_start, hour_end }) {
        const sql = `INSERT INTO reservation 
        (user_id, object, date, hour_start, hour_end)
        VALUES (?, ?, ?, ?, ?)`;
        const result = await query(sql, [user_id, object, date, hour_start, hour_end]);
        return { id: result.id, user_id, object, date, hour_start, hour_end };
    },

    //edit existing reservation
    async editRes({ id, object, date, hour_start, hour_end }) {
        //console.log("id:" + id, "object:" + object, date, hour_start, hour_end);
        const sql = `UPDATE reservation
        SET object = ?, date= ?, hour_start = ?, hour_end = ?
        WHERE id = ?`;
        const result = await query(sql, [object, date, hour_start, hour_end, id]);
        return { id: result.id, object, date, hour_start, hour_end } || null;
    },

    //delete a reservation
    async deleteRes(id) {
        const sql = "DELETE from reservation WHERE id = ?";
        const result = await query(sql, [id]);
        return { message: id + " Deleted" } || null;
    }
}

export default Reservation;