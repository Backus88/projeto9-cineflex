import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Session from "./Session";
import Header from "./Header";
import ListFilms from "./ListFilms";
import Seats from "./Seat";
import Sucesso from "./Sucesso";



export default function  App(){
    const [buttonHeader, setButtonHeader]= useState(false);


    return(
        <BrowserRouter>
            <Header buttonHeader ={buttonHeader} setButtonHeader={setButtonHeader}  />
                <Routes>
                    <Route  path="/" element = {<ListFilms buttonHeader ={buttonHeader} setButtonHeader={setButtonHeader} />}    />
                    <Route path="/sessoes/:idFilme" element = {<Session buttonHeader ={buttonHeader} setButtonHeader={setButtonHeader} />} />
                    <Route path= "/assentos/:idSessao" element = {<Seats buttonHeader ={buttonHeader} setButtonHeader={setButtonHeader} />} />
                    <Route path ="/sucesso" element ={<Sucesso/>}/>
                </Routes>
        </BrowserRouter>
    )

}
