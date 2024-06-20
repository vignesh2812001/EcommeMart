import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProduts.css"
import { faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog , DialogActions , DialogContent, DialogTitle } from "@mui/material";
import UpdateProduts from "./UpdateProduct"

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch products
        axios.get("http://localhost:3001/getAllProduts")
            .then((res) => {
                setProducts(res.data); 
                console.log(res.data)
            })
            .catch((err) => {
                console.log("Error fetching products: ", err);
            });
    }, []);

    const handleDelete = (productId) => {
    axios.delete(`http://localhost:3001/deleteProduct/${productId}`)
        .then((res) => {
            console.log("Product was successfully deleted");
            setProducts(products.filter(product => product.products_id !== productId));
        })
        .catch((err) => {
            console.log("Error deleting product: ", err);
        });
};

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSignIn = () => {}

    return (
        <>
            <header className="admin-header">
                <div className="admin-nav">
                    <ul className="admin-ul">
                        <li className="admin-li">add categories</li>
                        <li className="admin-li">show users</li>
                        <li className="admin-li">orders</li>
                        <div className="search"><input type="text" id="admin-input" className="input-search" placeholder="search..." /></div>
                        <div className="admin-buttons">
                            <div><button type="submit" className="admin-button" onClick={handleSignIn}>Exit</button></div>
                        </div>
                    </ul>
                </div>
            </header>
            <div className="Table">
                <div className="productTable">
                    <table className="product-table">
                        <thead>
                            <tr className="table-row">
                                <th className="table-header">Product Name</th>
                                <th className="table-header">Description</th>
                                <th className="table-header">Price</th>
                                <th className="table-header">Quantity</th>
                                <th className="table-header">Image</th>
                                <th className="table-header">Category</th>
                                <th className="table-header">Update</th>
                                <th className="table-header">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.products_id} className="table-row">
                                    <td className="td">{product.product_name}</td>
                                    <td className="td">{product.product_description}</td>
                                    <td className="td">{product.product_price}</td>
                                    <td className="td">{product.product_quantity}</td>
                                    <td className="td"><img src={`http://localhost:3001/images/${product.product_image}`} alt="Product" className="imges"/></td>
                                    <td className="td">{product.categories_id}</td>
                                    <td className="td"><button type="submit" className="update-button" onClick={() => handleUpdate(product)}>Update</button></td>
                                    <td className="td"><button type="submit" className="delete-button" onClick={() => handleDelete(product.products_id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             <Dialog open={showModal} onClose={handleCloseModal} className="DialogBox">
                <DialogTitle className="DiaTitle">
                    <h3 className="Diah3">Update Products</h3>
                </DialogTitle>
                <DialogContent className="Dialog1">
                    <UpdateProduts></UpdateProduts>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCloseModal} className="admin-order">
                        <FontAwesomeIcon icon={faTimes} /> 
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdminProducts;
