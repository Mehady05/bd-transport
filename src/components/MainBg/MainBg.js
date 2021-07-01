import React from 'react';
import CardVehicle from '../CardVehicle/CardVehicle';
import NavArea from '../CommonItems/NavArea/NavArea';
import './MainBg.css'

const MainBg = () => {
    return (
        <div className="main_bg">
            <NavArea></NavArea>
            <CardVehicle></CardVehicle>
        </div>
    );
};

export default MainBg;