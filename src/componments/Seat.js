import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { List } from "./ListFilms"

export default function Seats(){
    const{idSessao}= useParams();
    const[seats, setSeats]= useState([]);

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then((res)=>{
            console.log(res.data.seats[0].id)
            setSeats(res.data.seats);
        })
    },[])
    return(
       <List>
           <h1>
                Selecione o(s) assento(s)
           </h1>
            <CinemaStyle>
                {seats.map((item)=>
                    <SeatStyle>
                        {item.name}
                    </SeatStyle>

                )}
            </CinemaStyle>

       </List>
    )
}

const CinemaStyle = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 25px;
`

const SeatStyle = styled.div `
    width: 26px;
    height: 26px;
    background: #C3CFD9;
    border: 1px solid #808F9D;
    border-radius: 12px;
    margin: 9px 3.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.04em;
    color: #000000;
`