import React, { useState } from "react";
import { FaShoppingCart, FaDollarSign, FaArrowRight } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

import { NavbarStyle, MenuButton, MenuAbertoStyle, MenuBotaoFechar, MenuItem, MenuLink, TituloPagina, Logo } from "./NavbarStyles";

const Navbar = (props) => {
    const titulo = props.titulo;
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <NavbarStyle>
            <MenuButton onClick={toggleMenu}>
                <FaBars />
            </MenuButton>

            {menuAberto && (
                <MenuAbertoStyle>
                    <MenuBotaoFechar onClick={toggleMenu} />
                    <MenuLink to="/vendas">
                        <MenuItem>
                            <FaShoppingCart /> <p>Vendas</p> <FaArrowRight />
                        </MenuItem>
                    </MenuLink>
                    <MenuLink to="/comissoes">
                        <MenuItem>
                            <FaDollarSign /> <p>Comissões</p> <FaArrowRight />
                        </MenuItem>
                    </MenuLink>
                </MenuAbertoStyle>
            )}
            <Logo src="/logo.svg" />
            <TituloPagina>{titulo}</TituloPagina>
        </NavbarStyle>
    );
};

export default Navbar;
