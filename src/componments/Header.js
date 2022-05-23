import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function Header({buttonHeader, setButtonHeader}){
    const navigate = useNavigate();
    function goHome(){
        setButtonHeader(false);
        navigate("/");
    }
    return(
        <Topper>
            {(buttonHeader)?
                <HeaderButton onClick={()=>goHome()}>
                    <h3>Home</h3>
                </HeaderButton>
             :
            null
            }
            CINEFLEX
        </Topper>
    )
}

const Topper = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 67px;
        background-color: #C3CFD9;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 40px;
        color: #E8833A;
    `

    const HeaderButton = styled.button`
            position: fixed;
            top: 0;
            left: 0;
            width: 80px;
            height: 30px;
            background-color: #E8833A;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;

            h3{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 300;
                font-size: 16px;
                line-height: 21px;
                letter-spacing: 0.04em;
                color: #FFFFFF;
            }
    `