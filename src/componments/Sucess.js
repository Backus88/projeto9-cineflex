import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { List } from "./ListFilms";
import { FilmDiv } from "./Session";
import { Button } from "./Seat";
import { Centered } from "./Seat";

export default function Sucess (){

    const location = useLocation();
    const {name, cpf, seat, movie,date,hour}= location.state;
    return(
        <List>
            <h4>Pedido Feito</h4>
            <h4>com sucesso!</h4>
            <FilmDiv>
                <h1>Filme e sessão</h1>
                <h2>{movie}</h2>
                <h2>{date}   {hour}</h2>
            </FilmDiv>
            <FilmDiv>
                <h1>Ingressos</h1>
                {seat.map((item)=> <h2> Assento {item}</h2>)}
            </FilmDiv>
            <FilmDiv>
                <h1>Comprador</h1>
                <h2>Nome:{name}</h2>
                <h2>Cpf:{cpf}</h2>
            </FilmDiv>
            <Centered>
                <Link to={"/"} style={{textDecoration: 'none'}}>
                    <Button ok={true}> <h3>Volta para Home</h3></Button>
                </Link>
            </Centered>
        </List>
    );
}