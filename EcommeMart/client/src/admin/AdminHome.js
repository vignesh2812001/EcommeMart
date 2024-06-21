import React, { useState } from "react";
import "./Adminhome.css";
import { Dialog, DialogActions, DialogContent, } from '@mui/material';
import AddCategory from "./AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function AdminHome() {

    const [catagoryOpen , setOpen] = useState(false);

    const handleCatagory = () => {
        setOpen(true)
    }

    const handleCatagoryClose = () => {
        setOpen(false)
    }

    const handleSignIn = () => {

    }
    const navigate = useNavigate()
    const handleAddProduct = (e) => {
        e.preventDefault();
        navigate("/admin-add-products")

    }

    const handleProduts =(e) => {
        e.preventDefault()
        navigate("/adminProduts")
    }
    return(
    <>
        <header className="admin-header5">
            <div className="admin-nav">
                <ul className="admin-ul5">
                    <button className="admin-li button2" onClick={handleProduts}>show product</button>
                    <button className="admin-li button2">show users</button>
                    <button className="admin-li button2">orders</button>
                    <div className="search"><input type="text" id="admin-input" className="input-search" placeholder="search..."/></div>
                    <div className="admin-buttons">
                        <div ><button type="submit" className="admin-button" onClick={handleSignIn}>Exit</button></div>
                    </div>
                </ul>
            </div>

            <div className="admin-content">
                <h1 className="admin-title">Admin</h1>
                <p className="admin-description">you can maintain your ecommerce products as below...</p>

                <div className="admin-control">
                    <div  className="admin-catagories">
                        <button type="submit" className="admin-add-catagory" onClick={handleCatagory}>add Catagories</button>
                        <Dialog open={catagoryOpen} onClose={handleCatagoryClose} >
                            <DialogContent className="Dialog6" >
                                <AddCategory/>
                            </DialogContent>
                            <DialogActions>
                                <button onClick={handleCatagoryClose} className="admin-order"><FontAwesomeIcon icon={faXmark} /> </button>
                            </DialogActions>
                        </Dialog>
                    </div>
                <div  className="admin-products">
                    <button type="submit"  className="admin-add-product" onClick={handleAddProduct}>Add Products</button>
                </div>

                <div  className="list-users">
                    <button type="submit"  className="list-user" onClick={handleAddProduct}>Users</button>
                </div>

                <div  className="admin-orders">
                    <button type="submit"  className="admin-order" onClick={handleAddProduct}>Track OrderPlaced</button>
                </div>
            </div>
            </div>
            
            
        </header>
    </>)
}

export default AdminHome;
