import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Session from "./Session";
import Header from "./Header";
import ListFilms from "./ListFilms";
import Seats from "./Seat";
import Sucesso from "./Sucesso";



export default function  App(){



    return(
        <BrowserRouter>
            <Header/>
            {/* <Container> */}
                <Routes>
                    <Route  path="/" element = {<ListFilms/>}    />
                    <Route path="/sessoes/:idFilme" element = {<Session />} />
                    <Route path= "/assentos/:idSessao" element = {<Seats />} />
                    <Route path ="/sucesso" element ={<Sucesso/>}/>
                </Routes>
            {/* </Container> */}
        </BrowserRouter>
        
    )

}

const Container = styled.div`
    max-height: 100%;
    padding-bottom: 150px;
    box-sizing: content-box;
`