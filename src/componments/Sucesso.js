import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { List } from "./ListFilms";
import { FilmDiv } from "./Session";
import { Button } from "./Seat";
import { Centered } from "./Seat";
import { CinemaStyle } from "./Seat";

export default function Sucess (){

    const location = useLocation();
    const {name, cpf, seat, movie,date,hour}= location.state;
    return(
        <List width= {"100%"}>
            <h4>Pedido Feito</h4>
            <h4>com sucesso!</h4>
            <CinemaStyle>
                <SucessDiv>
                    <h1>Filme e sessão</h1>
                    <h2>{movie}</h2>
                    <h2>{date}   {hour}</h2>
                </SucessDiv>
                <SucessDiv>
                    <h1>Ingressos</h1>
                    {seat.map((item)=> <h2> Assento {item}</h2>)}
                </SucessDiv>
                <SucessDiv>
                    <h1>Comprador</h1>
                    <h2>Nome:{name}</h2>
                    <h2>Cpf:{cpf}</h2>
                </SucessDiv>
                <Centered>
                    <Link to={"/"} style={{textDecoration: 'none'}}>
                        <Button ok={true}> <h3>Volta para Home</h3></Button>
                    </Link>
                </Centered>
            </CinemaStyle>
            
        </List>
    );
}


const SucessDiv = styled.div `
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
        margin-top: 3px;
    }

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.04em;
        color: #293845;
        margin-bottom: 0;
        margin-top: 40px;
    }
`