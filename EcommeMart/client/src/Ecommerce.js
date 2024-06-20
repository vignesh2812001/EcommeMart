
import React from "react";
import Ecomme from "./Ecommerce/Ecomme";


function Ecommerce({username}) {
    return(<>
     <div className="app">
      <Ecomme username={username}/>
    </div>
    </>)
}

export default Ecommerce;