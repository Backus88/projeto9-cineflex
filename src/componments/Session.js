import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { List } from "./ListFilms"

export default function Session(){
    const {idFilme} = useParams();
    const [days, setDays]= useState([]);

    useEffect (()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then((res)=>{
            setDays(res.data.days);
        });
    },[])
    return(
        <List>
            <h1>Selecione o horário</h1>
            {days.map((item, index) =>
                <FilmDiv key = {index}>
                    <h2>{item.weekday} - {item.date}</h2>
                    <HoursDiv>
                        <Link to ={`/assentos/${item.showtimes[0].id}`} style ={{textDecoration:'none'}}>
                            <HourDiv>
                                {item.showtimes[0].name}
                            </HourDiv>
                        </Link>
                        <Link to = {`/assentos/${item.showtimes[1].id}`}  style ={{textDecoration:'none'}}>
                            <HourDiv>
                                {item.showtimes[1].name}
                            </HourDiv>
                        </Link>
                    </HoursDiv>
                </FilmDiv>
            )}
        </List>
        
    )
}

const FilmDiv = styled.div `
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    h2{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        margin-left: 24px;
    }
`
const HoursDiv = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    margin-left: 15px;
`

const HourDiv = styled.div `
    width: 83px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E8833A;
    border-radius: 3px;
    margin: 27px 8px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    text-decoration: none;
`