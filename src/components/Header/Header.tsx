import React, {FC} from 'react';

import logo from './images/logo.png';


const Header:FC = () => {
    return (
        <header style={{position: 'sticky', top: 0}}>
            <img src={logo} alt="logo PetsPaw"/>
        </header>
    );
};

export default Header;