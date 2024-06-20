import React, { useEffect, useState } from "react";
import "./AddProductas.css";
import axios from "axios";


function AddProducts() {
   
   //handle formData
    const [formData, setFormData] = useState({
        product_name: "",
        product_description: "",
        product_price: 0,
        product_quantity: 0,
        product_image: null,
        categories_id: 0,
    });

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileInput = (e) => {
        setFormData({ ...formData, product_image: e.target.files[0] });
    };

    //show Category in list 
    const [categories, setCategory] = useState([]);

    const handleCategory = () => {
        axios.get("http://localhost:3001/getCatagory")
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, categories_id: value });
    };

    //submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("product_name", formData.product_name);
        formDataToSend.append("product_description", formData.product_description);
        formDataToSend.append("product_price", formData.product_price);
        formDataToSend.append("product_quantity", formData.product_quantity);
        formDataToSend.append("product_image", formData.product_image);
        formDataToSend.append("categories_id", formData.categories_id);

        axios.post("http://localhost:3001/addProducts", formDataToSend , {headers: {
                "Content-Type": "multipart/form-data",
            }}) 
            .then((res) => {
                
                console.log("Data is added successfully ", res.data);
                setFormData({
                    product_name: "",
                    product_description: "",
                    product_price: 0,
                    product_quantity: 0,
                    product_image: null,
                    categories_id: 0,
                });
                document.getElementById("product_image").value = null;
                handleProductRecords();
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    };

    const handleSignIn = () => {};

    useEffect(() => {
        handleCategory();
        handleProductRecords();
        
    }, []);

    //productCount
    const [productNum, setProductNum] = useState("");

    const handleProductRecords = () => {
        axios.get("http://localhost:3001/getProductsCount")
            .then((res) => {
                const count = res.data[0]['COUNT(products_id)'];
                setProductNum(count + 1);
            })
            .catch((error) => {
                console.log("Error fetching category number", error);
            });
    };
    return(
        <>
        <header className="admin-header">
            <div className="admin-nav">
                <ul className="admin-ul">
                    <li className="admin-li">add catagories</li>
                    <li className="admin-li">show users</li>
                    <li className="admin-li ">orders</li>
                    <div className="search"><input type="text" id="admin-input" className="input-search" placeholder="search..."/></div>
                    <div className="admin-buttons">
                        <div ><button type="submit" className="admin-button" onClick={handleSignIn}>Exit</button></div>
                    </div>
                </ul>
            </div>
         </header>
         <div className="products">
            <div className="products-heading">
                <h2 className="h2">Add Products</h2>
            </div>
            <form onSubmit={handleSubmit} className="form-product">
                    
                        <div className="productDetails">
                            <div className="fristHalf">
                             <div className="products-input">
                            <label htmlFor="id">ProductNumber</label>
                              <input type="text" id="id" className="product-input" placeholder="Product Number" value={productNum} disabled />      
                        </div>
                        <div className="products-input">
                            <label htmlFor="product_name">Name</label>
                            <input type="text" id="product_name" className="ProductName" placeholder="Product Name" value={formData.product_name} onChange={handleInput} />
                        </div>
                        <div className="products-input">
                                <label htmlFor="categories_id">Category Name</label>
                                    <select id="categories_id" value={formData.categories_id} onChange={handleCategoryChange}>
                                        <option value="">Select a category</option>
                                        {/* {console.log("result :" , formData.category )} */}
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.categories_id} >
                                                {category.category_name} 
                                            </option>
                                        ))}
                                    </select>

                            </div>
                        <div className="products-input">
                            <label htmlFor="product_price">Price</label>
                           <input type="number" id="product_price"className="ProductPrice" placeholder="Product Price" value={formData.product_price} onChange={handleInput} />
                        </div>
                        <div className="products-input">
                            <label htmlFor="product_quantity">Quantity</label>
                           <input type="number" id="product_quantity"className="productQuantity" placeholder="Product quantity" value={formData.product_quantity} onChange={handleInput} />
                        </div>
                        </div>
                         <div className="seconHalf">
                            <div className="products-input">
                            <label htmlFor="product_description">Description</label>
                             <input type="text" id="product_description"className="ProductDescription" placeholder="Product Description" value={formData.product_description} onChange={handleInput} />
                        </div>
                         <div className="products-input">
                                <label htmlFor="product_image">Product Image</label>
                                <input type="file" id="product_image" className="ProductImage"  onChange={handleFileInput}/>
                            </div>
                        <div className="checkbox-model">
                            <input type="checkbox" className="checkbox" id="checkbox"/>
                            <label htmlFor="checkbox" className="box">here the terms and conditon adding the product </label>
                        </div>
                        <div className="products-input">
                            <button type="submit" className="button">Add Product</button>
                        </div>
                    </div>
                     </div>
                </form>
         </div>
        </>
    )
}

export default AddProducts;