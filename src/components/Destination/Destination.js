import React from 'react';
import NavArea from '../CommonItems/NavArea/NavArea';
import './Destination.css'

const Destination = () => {
    return (
        <div>
            <NavArea></NavArea>
            <div className="map_all">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form">
                                <form action="">
                                    <label for="from" class="form-label">Pick From</label>
                                    <input type="text"class="form-control" name="location" id="" required placeholder="Form"/>
                                    <label for="to" class="form-label">Pick To</label>
                                    <input type="text" class="form-control" name="location" id="" required placeholder="To"/>
                                    <div class="serach py-3">
                                        <button class="search">search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-9">
                    <div class="map">
                    <div className="google-map-code">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;