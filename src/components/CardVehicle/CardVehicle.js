import React, { useEffect } from 'react';
import { useState } from 'react';
import FakeData from '../../fakeData.json'
import Vehicle from '../Vehicle/Vehicle';
import './CardVehicle.css'

const CardVehicle = () => {

    const [vehicles, setVehicles] = useState([])
    console.log(vehicles)

    useEffect(() => {
        setVehicles(FakeData)
    }, [])
    return (
        <div className="all_card">
            <div className="container">
                <div className="row">
                   {
                       vehicles.map((vehicle)=> <Vehicle vehicle = {vehicle}></Vehicle>)
                   }
                </div>
            </div>
        </div>
    );
};

export default CardVehicle;