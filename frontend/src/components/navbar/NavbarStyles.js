import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

export const NavbarStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px;
    gap: 200px;
    background-color: #f0f0f0;
    color: #00585e;
`;

export const MenuButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #00585e;
`;

export const MenuAbertoStyle = styled.div`
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #f0f0f0;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 20px;
`;

export const MenuBotaoFechar = styled(FaWindowClose)`
    font-size: 30px;
    cursor: pointer;
`;

export const MenuItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    color: #00585e;
    width: 250px;
    background-color: #fff;
    font-size: 20px;
    height: 50px;
`;

export const MenuLink = styled(Link)`
    text-decoration: none;
`;

export const TituloPagina = styled.h1`
  font-size: 24px;
  margin: 0;
`;

export const Logo = styled.img`
  width: 200px;
  height: 50px;
`;
