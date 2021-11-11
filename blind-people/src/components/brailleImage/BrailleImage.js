import React from "react";
import './braille-image.scss';

export const BrailleImage = (props) =>{
    return(
        <div>   
            {props.letter.map((l)=>{
                const alpha = l!==" "?l.toLowerCase():"space";
                return(
                    <img 
                        src={require("../../../public/assets/images/"+alpha+".png").default}
                        className="image"
                        alt={l}
                    />
                )
            })}
        </div>
    )
}