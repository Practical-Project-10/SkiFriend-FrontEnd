import React from 'react';
import SelectRegion from './SelectRegion';
import {Grid} from "../elements/CarpoolCSS/index";
import {BsArrowLeftRight} from "react-icons/bs";

const BoundChangeBox = () => {
    return (
        <div>
        <Grid selectBox>
            <SelectRegion/>
            <span>
            <BsArrowLeftRight style={{ margin: "0px 20px" }} />
            </span>
            <span className="skiResort">용평</span>
        </Grid> 
        </div>
    );
};

export default BoundChangeBox;