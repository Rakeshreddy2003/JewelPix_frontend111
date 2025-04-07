
import React from "react";
import Card from 'react-bootstrap/Card';
import img from "../assets/JewelleryImages/image.png"

const cards =[{}, {}, {}, {}, {}]
const ImagePlaceholder = () => {
  return (
    <Card style={{width: "90vw", height: "30vh"}}>
        
        {cards.map((cards,index)=>{
            return(<Card.Img style={{width: "10rem",height: "10rem"}} src={img}/> )
        })}
    </Card>
  );
};

export default ImagePlaceholder;