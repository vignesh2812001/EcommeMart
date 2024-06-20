import React, { useEffect, useState } from "react";
import "./UpdateProduct.css";
import axios from "axios";

function UpdateProduct() {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("product_name", formData.product_name);
        formDataToSend.append("product_description", formData.product_description);
        formDataToSend.append("product_price", formData.product_price);
        formDataToSend.append("product_quantity", formData.product_quantity);
        formDataToSend.append("product_image", formData.product_image);
        formDataToSend.append("categories_id", formData.categories_id);

        axios.post("http://localhost:3001/updateProduct/:productID", formDataToSend , {
            headers: { "Content-Type": "multipart/form-data" },
        }) 
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
        <form onSubmit={handleSubmit} className="form-product">
            <div className="productDetails">
                <div className="products-input">
                    <label htmlFor="id" className="label">ProductNumber</label>
                    <input type="text" id="id" className="product-input" placeholder="Product Number" value={productNum} disabled />
                </div>
                <div className="products-input">
                    <label htmlFor="product_name" className="label">Name</label>
                    <input type="text" id="product_name" className="ProductName" placeholder="Product Name" value={formData.product_name} onChange={handleInput} />
                </div>
                <div className="products-input">
                    <label htmlFor="categories_id" className="label">Category Name</label>
                    <select id="categories_id" value={formData.categories_id} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.categories_id} >
                                {category.category_name} 
                            </option>
                        ))}
                    </select>
                </div>
                <div className="products-input">
                    <label htmlFor="product_price" className="label">Price</label>
                    <input type="number" id="product_price" className="ProductPrice" placeholder="Product Price" value={formData.product_price} onChange={handleInput} />
                </div>
                <div className="products-input">
                    <label htmlFor="product_quantity" className="label">Quantity</label>
                    <input type="number" id="product_quantity" className="productQuantity" placeholder="Product quantity" value={formData.product_quantity} onChange={handleInput} />
                </div>
                <div className="products-input">
                    <label htmlFor="product_description" className="label">Description</label>
                    <input type="text" id="product_description" className="ProductDescription" placeholder="Product Description" value={formData.product_description} onChange={handleInput} />
                </div>
                <div className="products-input">
                    <label htmlFor="product_image" className="label">Product Image</label>
                    <input type="file" id="product_image" className="ProductImage"  onChange={handleFileInput}/>
                </div>
                <div className="products-input">
                    <button type="submit" className="button">Add Product</button>
                </div>
            </div>
        </form>
    )
}

export default UpdateProduct;
