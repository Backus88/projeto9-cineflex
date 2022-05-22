import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { List } from "./ListFilms";
import Footer from "./Footer";
import { Film } from "./ListFilms";
import { MiniFrame } from "./Session";

export default function Seats(){
    const{idSessao}= useParams();
    const [footerSeatTitle, setFooterSeatTitle ] = useState("");
    const [footerSeatUrl, setFooterSeatUrl]= useState("");
    const[footerSeatDay, setFooterSeatDay]= useState("");
    const[footerSeat, setFooterSeat]= useState({});
    const[seats, setSeats]= useState([]);
    const[seat, setSeat]= useState([]);
    const[seatId, setSeatId]= useState([]);
    const[choosed, setChoosed] = useState([]);
    const[cpf , setCpf] = useState("");
    const[name, setName] = useState("");
    const[validaCpf, setValidaCpf]= useState(false);
    const[validaName, setValidaName]= useState(false);
    const[movie, setMovie]= useState("");
    const[date, setDate]= useState("");
    const[hour, setHour]= useState("");
    const[isSeat, setIsSeat]= useState(false);
    const[film, setFilm] = useState({
        ids: [],
        name: "",
        cpf: ""
   });

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then((res)=>{
            setSeats(res.data.seats);
            setChoosed(new Array(res.data.seats.length).fill(false)) ;
            setMovie(res.data.movie.title);
            setDate(res.data.day.date);
            setHour(res.data.name)
            setFooterSeatTitle(res.data.movie.title);
            setFooterSeatUrl(res.data.movie.posterURL);
            setFooterSeatDay(res.data.day.weekday);
            setFooterSeat({...res.data});
        })
    },[]);

    const getCpf = (event)=>{
        event.preventDefault();
        if(event.target.value.length ===11 ){
            setValidaCpf(true);
            setCpf(event.target.value);
            setFilm({...film, cpf: event.target.value})
        }else{
            setValidaCpf(false);
            setCpf("");
            setFilm({...film, cpf: ""})
        }
    }

    const getName = (event)=>{
        event.preventDefault();
        if(event.target.value.length >5 && event.target.value.length <30 ){
            setValidaName(true);
            setName(event.target.value);
            setFilm({...film, name: event.target.value})
        }else{
            setValidaName(true);
            setName("");
            setFilm({...film, name: ""})
        }
    }

    function selecting( index,nameId,idSeat){
        const newArr = [...choosed];
        const newArray = [...seat];
        const ArrNew = [...seatId];
        if(!choosed[index]){
            newArr[index]= true;
            setSeat([...seat, nameId]);
            setChoosed(newArr);
            setIsSeat(true);
            setSeatId([...seatId, idSeat])
            setFilm({...film, ids:[...film.ids, idSeat]});
        }else{
            newArr[index]= false;
            setChoosed(newArr);
            setSeat([...newArray.filter((value)=> value !==nameId)]);
            setSeatId([...ArrNew.filter((itens)=> itens !==idSeat)]);
            setFilm({...film, ids:[...film.ids.filter((itens)=> itens !==idSeat)]});
            if(seat.length <=1) setIsSeat(false);
        }
       
    }
    
    const navigate = useNavigate();
    function GoSucess(){
        console.log("oi")
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", film);
        promise.then((res)=>{
                console.log("aqui");
                 navigate("/sucesso", {state :{name,cpf,seat,movie,date,hour}});
           })
        promise.catch((error) =>{
                console.log(error);
        })
    }
    // console.log(footerSeatTitle);
    console.log(footerSeatUrl);
    return (
        <>
            <List width= {"100%"}>
                <h1>
                    Selecione o(s) assento(s)
                </h1>
                <CinemaStyle>
                    {seats.map((item, index) => (item.isAvailable) ?
                        <SeatStyle key={index} enable={item.isAvailable} choosed={choosed[index]} onClick={() => selecting(index, item.name, item.id)}>
                            {item.name}
                        </SeatStyle>
                        :
                        <SeatStyle key={index} enable={item.isAvailable}>
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
                            <SeatStyle enable={true}>
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
                    <section>
                        <label> Nome do comprador:</label>
                        <input type="text" placeholder="Digite seu nome..." onChange={getName} />
                        <label> CPF do comprador:</label>
                        <input type="text" placeholder="CPF apenas numeros" onChange={getCpf} />
                        <Centered>
                            {
                                (validaCpf && validaName && isSeat) ?
                                    // <Link to={"/sucesso"}  style ={{textDecoration:'none'}} state={{ name,cpf,seat,movie,date,hour}} >
                                    <Button ok={true} onClick={() => GoSucess()} ><h3>Reservar assento(s)</h3></Button>
                                    // </Link>
                                    :
                                    <Button ok={false}><h3>Reservar assento(s)</h3></Button>
                            }
                        </Centered>
                    </section>
                </Forms>
            </List>
            <Footer>
                <Film>
                    <MiniFrame>
                        <img src={footerSeatUrl} alt="aaaaaa" />
                    </MiniFrame>
                </Film>
                <FooterSeatDiv>
                    <h5>
                        {(footerSeatTitle)}
                    </h5>
                    <h5>
                        {footerSeatDay}-{footerSeat.name}
                    </h5>
                </FooterSeatDiv>
            </Footer>
        </>
    )
}

export const CinemaStyle = styled.div `
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
    section{
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

export const Button = styled.button`
    width: 225px;
    height: 42px;
    background:${props=> props.ok? "#E8833A": "#AFAFAF"};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: ${props => props.ok? "pointer": "default"}
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

export const Centered = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`

const FooterSeatDiv = styled.div`
    display: flex;
    flex-direction: column;
`
