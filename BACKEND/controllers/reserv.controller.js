import Reservation from "../models/reservation.model.js";


//POST /api/reservation register new reservation
export async function makeReservation(req, res) {
    try {
        const { user_id, object, date, hour_start, hour_end } = req.body;
        if (!user_id || !object || !date || !hour_start || !hour_end) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }
        //check if any overlaps in date + time
        const reservAtDate = await Reservation.findbyDate(date);
        if (reservAtDate) {
            for (let n = 0; n <= reservAtDate.length - 1; n++) {
                if (hour_start >= reservAtDate[n].hour_start && hour_start < reservAtDate[n].hour_end) {
                    return res.status(409).json({ error: 'Réservation overlap !' });
                }
                if (hour_end > reservAtDate[n].hour_start && hour_end <= reservAtDate[n].hour_end) {
                    return res.status(409).json({ error: 'Réservation overlap !' });
                }
            }
        }

        const reservation = await Reservation.createRes({
            user_id: user_id, object: object, date: date, hour_start: hour_start, hour_end: hour_end
        });

        res.status(201).json({ message: 'Réservation crée.', reservation });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(error);
    }
}

//PUT /api/reservation/:id edit existing reservation
export async function editReservation(req, res) {
    try {
        const id = req.params.id;
        const { object, date, hour_start, hour_end } = req.body;
        if (!object || !date || !hour_start || !hour_end) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const editRes = await Reservation.editRes({ id: id, object, date, hour_start, hour_end });
        res.status(201).json({ message: 'Réservation éditée.', editRes });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(err);
    }
}

//PUT /api/reservation/:id
export async function deleteReservation(req, res) {
    try {
        const id = req.params.id;
        const removeRes = await Reservation.deleteRes(id);
        res.status(201).json({ message: 'Réservation supprimée.', removeRes });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(err);
    }
}

//GET /api/reservation/search/id/:id Get by id
export async function getReservationByID(req, res) {
    try {
        const id = req.params.id;
        const results = await Reservation.findbyResID(id);
        console.log("results = ", results);
        res.status(201).json({ results: results });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(err);
    }
}
//GET /api/reservation/search/date/:date Get by date
export async function getReservationByDate(req, res) {
    try {
        const date = req.params.date;
        const results = await Reservation.findbyDate(date);
        res.status(201).json({ results: results });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(err);
    }
}