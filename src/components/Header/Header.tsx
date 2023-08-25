import React, {FC, PropsWithChildren} from 'react';

import logo from './images/logo.png';

interface IProps extends PropsWithChildren {

}

const Header:FC<IProps> = () => {
    return (
        <header>
            <img src={logo} alt="logo PetsPaw"/>
        </header>
    );
};

export default Header;