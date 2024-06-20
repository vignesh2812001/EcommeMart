import React, { useEffect, useState } from "react";
import "./Ecomme.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faUser } from "@fortawesome/free-solid-svg-icons";
function Ecomme({username}) {  

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products
        axios.get("http://localhost:3001/getAllProduts")
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error fetching products: ", err);
            });
    }, []);

    return (
        <>
        
            <div>
               <header className="admin-header1" >
    <div className="admin-nav1">
        <ul className="admin-ul1">
            <div className="ecomme">
                            <FontAwesomeIcon icon={faCartPlus} className="faCartPlus1" />
                            <h1 className="h1title">Get Crazy with Savings, Shop Now! </h1>
            </div>
            <div className="search1">
                <input type="text" id="admin-input" className="input-search1" placeholder="search..." />
            </div>
            <div className="user1"><FontAwesomeIcon icon={faUser}  className="fauser"/>{username}</div>
            
            
        </ul>
    </div>   <div className="color"></div>
                <div className="card-items">
                    {products.map((product) => (
                        <div className="card" key={product.products_id}>
                            <div className="image_container">
                                <img src={`http://localhost:3001/images/${product.product_image}`} alt={product.product_name} className="product-image" />
                            </div>
                            <div className="title">{product.product_name}</div>
                            <div className="description">{product.product_description}</div>
                            
                            <div className="action">
                                <div className="price">₹{product.product_price}</div>
                                <button className="addCart"><FontAwesomeIcon icon={faCartPlus} className="faCartPlus" />Add Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
</header>
            </div>
        </>
    );
}

export default Ecomme;
