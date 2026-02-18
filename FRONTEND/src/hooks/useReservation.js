import { reservationService } from "../services/api";
import { useState } from "react";

export default function useReservation() {
    const [loading, setLoading] = useState(true);
    // const [reservations, setReservations] = useState({
    //     bydate: [],
    //     byid: [],
    //     byuser_id: []
    // });
    const [resbyId, setResbyId] = useState([]);
    const [resbyDate, setResbyDate] = useState([]);
    const [resbyUserid, setResbyUserid] = useState([]);

    //createres
    const createRes = async (reservdata) => {
        const data = await reservationService.createRes(reservdata);
        return data;
    };

    //getresbyid
    const getResbyID = async (id) => {
        const data = await reservationService.getResbyID(id);
        if (data) {
            setResbyId(data);
        }
        return data;
    }

    //getresbydate
    const getResbyDate = async (date) => {
        const data = await reservationService.getResbyDate(date);
        if (data) {
            setResbyDate(data);
        }
        return data;
    }

    //getresbyuserid
    const getResbyUserid = async (userid) => {
        const data = await reservationService.getResbyUserid(userid);
        if (data) {
            setResbyUserid(data);
        }
        return data;
    }

    //removeres
    const removeRes = async (id) => {
        const data = await reservationService.removeRes(id);
        return data;
    }

    //editres
    const editRes = async (id, resdata) => {
        const data = await reservationService.editRes(id, resdata);
        return data;
    }

    return {
        createRes, getResbyID, getResbyDate, getResbyUserid, removeRes, editRes,
        resbyId, resbyDate, resbyUserid
    }

}