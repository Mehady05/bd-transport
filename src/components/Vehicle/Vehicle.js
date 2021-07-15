import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Vehicle.css";

const Vehicle = (props) => {
  const { name, photo } = props.vehicle;

  const history = useHistory()
  const goToDestination = ()=>{
    history.push('/destination')
  }
  return (
      <div onClick={goToDestination} className="col-md-3 single_card">
        <Card className='p-3 text-center'>
            <card_img style={{height:'200px'}}>
                <img className='w-100' src={photo} alt="" />  
            </card_img>
          <Card.Body>
            <Button variant="none">{name}</Button>
          </Card.Body>
        </Card>
      </div>
  );
};

export default Vehicle;
