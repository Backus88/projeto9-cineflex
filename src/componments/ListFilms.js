import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';

export default function ListFilms(){

    function ImgFilm({id, source}){
        return(
            <Frame>
                <Link to={`/sessoes/${id}`}>
                    <img  src={source} alt = "whiskassache"/>
                </Link>
            </Frame>
        )
    }

    
    const [list, setList] = useState([]);

    useEffect(()=>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then((res)=>{
            setList(res.data);
        })
    },[])
   


    return(
        <List>
            <h1>Selecione o filme</h1>
            <Film>
                {list.map((item,index) =><ImgFilm key={index} id={item.id} source ={item.posterURL} /> )}
            </Film>
        </List>
    )
}

export const List = styled.div`
    margin-top: 100px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.04em;
        color: #293845;
        margin-bottom: 40px;
    }
    h4{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.04em;
        color: #247A6B;
    }
`
export const Film = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`

const Frame = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 145px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 5.5px 15px;
    img{
        width: 129px;
        height: 193px;
    }
`