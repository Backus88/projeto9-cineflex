import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { List } from "./ListFilms"

export default function Seats(){
    const{idSessao}= useParams();
    const[seats, setSeats]= useState([]);
    const[seat, setSeat]= useState([]);
    const[choosed, setChoosed] = useState([]);

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then((res)=>{
            setSeats(res.data.seats);
            setChoosed(new Array(res.data.seats.length).fill(false)) ;
        })
    },[]);

    function selecting(idSeat, index){
        const newArr = [...choosed];
        const newArray = [...seat];
        if(!choosed[index]){
            newArr[index]= true;
            setSeat([...seat,idSeat ]);
            setChoosed(newArr);
        }else{
            newArr[index]= false;
            setChoosed(newArr);
            setSeat([...newArray.filter((value)=> value !==idSeat)]);
        }
       
    }

    console.log(seat)
    return(
       <List>
           <h1>
                Selecione o(s) assento(s)
           </h1>
            <CinemaStyle>
                {seats.map((item,index)=> (item.isAvailable)?
                    <SeatStyle key={index} enable ={item.isAvailable}choosed={choosed[index]} onClick={()=>selecting(item.id, index)}>
                        {item.name}
                    </SeatStyle>
                    :
                    <SeatStyle key={index} enable ={item.isAvailable}>
                        {item.name}
                    </SeatStyle>
                )}
                <Exemples>
                    <Column>
                        <SeatStyle choosed={true}>
                        </SeatStyle>
                        <h2>Selecionado</h2>
                    </Column>
                    <Column>
                        <SeatStyle enable ={true}>
                        </SeatStyle>
                        <h2>Disponível</h2>
                    </Column>
                    <Column>
                        <SeatStyle>
                        </SeatStyle>
                        <h2>Indisponível</h2>
                    </Column>         
                </Exemples>
            </CinemaStyle>
            <Forms>
                <form>
                    <label> Nome do comprador:</label>
                    <input type="text" placeholder="Digite seu nome..." />
                    <label> CPF do comprador:</label>
                    <input type="text" placeholder="Digite seu CPF..." />
                </form>
                <Centered>
                    <Button><h3>Reservar assento(s)</h3></Button>
                </Centered>
            </Forms>
       </List>
    )
}

const CinemaStyle = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0px 25px;
    margin-top: -20px;
`

const SeatStyle = styled.div `
    width: 26px;
    height: 26px;
    background:${props => props.choosed ? "#8DD7CF" :props.enable?"#C3CFD9 " :"#F7C52B"};
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
    cursor: ${props =>props.enable? "pointer": "default"};
`

const Forms = styled.div`
    width: 90%;
    margin-top: 50px;
    form{
        display: flex;
        flex-direction: column;
        label{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #293845;
            margin-top: 10px;
        }
        input{
            box-sizing: border-box;
            width: 327px;
            height: 51px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 3px;
            padding-left: 15px;

            font-family: 'Roboto';
            font-style: italic;
            font-weight: 300;
            font-size: 18px;
            line-height: 21px;
            display: flex;
            justify-content: baseline;
            align-items: center;
            color: #AFAFAF;
        }
    }
`
const Exemples = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    padding-left: 5px;
`

const Column = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0px 30px;
`

const Button = styled.button`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    h3{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.04em;
        color: #FFFFFF;
    }
    `

const Centered = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`