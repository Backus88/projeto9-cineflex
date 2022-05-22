import styled from "styled-components"

export default function Footer (props){
    return(
        <FooterDiv>
            {props.children}
        </FooterDiv>
    )

}

export const FooterDiv = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 120px;
    width: 100%;
    background: #DFE6ED;
    border:  solid #9EADBA;
    border-width: 1px 0px 0px 0px;
    h5{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #293845;
        word-break: break-word;
        margin-right: 15px;
        margin-left: 15px;
    }
`