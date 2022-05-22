import { BrowserRouter, Routes, Route } from "react-router-dom";
import Session from "./Session";
import Header from "./Header";
import ListFilms from "./ListFilms";
import Seats from "./Seat";
import Sucess from "./Sucess";



export default function  App(){



    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route  path="/" element = {<ListFilms/>}    />
                <Route path="/sessoes/:idFilme" element = {<Session />} />
                <Route path= "/assentos/:idSessao" element = {<Seats />} />
                <Route path ="/sucesso" element ={<Sucess/>}/>
            </Routes>
        </BrowserRouter>
        
    )

}