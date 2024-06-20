import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddCategory.css";

function AddCategory() {
    const [categoryNumber, setCategoryNumber] = useState(0);
    const [categoryName, setCategoryName] = useState("");
    const [Error , setError] = useState('');

    const handleCatagoryRecords = () => {
        axios.get("http://localhost:3001/viewCatagory")
            .then((res) => {
               const count = res.data[0]['COUNT(categories_id)'];
                setCategoryNumber(count + 1);
            })
            .catch((error) => {
                console.log("Error fetching category number", error);
            });
    }

    useEffect(() => {
        handleCatagoryRecords();
        
    }, []);

    const handleInput = (e) => {
        setCategoryName(e.target.value);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryName.trim() === "") {
            console.log("The category name cannot be empty");
            
        }
        const data = { category_name: categoryName };

        axios.post("http://localhost:3001/addCategory", data)
            .then((res) => {
                console.log(res.data);
                res.data.category_name = categoryName;
                setCategoryName("")
                handleCatagoryRecords();
                
            })
            .catch((error) => {
                console.log("Error", error);
                setError("You Enter the products was already in your List")
            });
    };

    return (
        <div className="category-modelBox">
             {Error && <span id="error" className="error">{Error}</span>}
            <div className="category">
                <h3 className="h3">Add the Categories of Products</h3>
                <form onSubmit={handleSubmit} className="form-category">
                    <input type="text" className="category-input" placeholder="CategoryNumber"  value={categoryNumber} disabled/>
                    <div className="CategoryNames">
                        <input type="text" id="categoryName" className="CategoryName" placeholder="Add Category" value={categoryName} onChange={handleInput} />
                        <div>
                           
                        </div>
                    </div>
                    <button type="submit" className="button1" >Add Category</button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
