import styled from "styled-components"

export default function Header(){
    return(
        <Topper>
            CINEFLEX
        </Topper>
    )

}

const Topper = styled.div `
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