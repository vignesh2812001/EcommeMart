const express = require("express");
const sql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require('multer')
const path = require('path')
const port = 3001;
const app = express();

app.use(cors());
app.use(bodyparser.json());


    // Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


const con = sql.createConnection(
    {
        host : "localhost",
        port : "3306",
        user : "root",
        password : "root",
        database : "ecommerce",
    });

    con.connect((error)=>{
        if(error){
            console.log("The Connection is not made Error : " , error);
        }
        else{
            console.log("The Conncection is made ");
        }
    })

    app.get("/viewData" , (req, res) => {
        const view = "select * from registerations;";
        con.query(view , (err, result) => {
            if(err) {
                res.status(500).json({message : "the data fetch error"});
            }else{
                res.status(200).json(result)
            }})
    })

    app.post("/formData" , (req , res) => {
        const {username , email , password }  = req.body;
        const insertData = "insert into registerations(username , email , password) value (?,?,?);";
        con.query(insertData , [username , email , password] ,(err , result) => {
            if(err){
                console.log("Error : " , err)
                res.status(500).json({message : "the data insert not inserted"});
            }else{
                console.log("Result : the insert successfully" );
                res.status(201).json(result)}
        })})

    app.get("/viewProduct/:id" , (req, res ) => {
        const productId = req.params.id;
        const fetchData = "select * from registerations where s_no = ?;";
        con.query(fetchData , [productId] , (err , result) => {
            if(err){
                console.log(err , " : Error of");
                res.status(500).json({message : "the data productid not fetch from database" , productId})
            }else if(result.length === 0) {
                res.status(400).json({message : `the product data ${productId} was empty`})
            }else{
                res.status(200).json(result[0]);
                console.log(result[0]);
            } })})
    ///the admin categories products added

    app.get("/viewCatagory" , (req, res) => {
        const viewCatagory = "SELECT COUNT(categories_id) FROM categories;";
        con.query(viewCatagory , (err , result) => {
            if(err) {res.status(500).json({message : "The catagory server error"})}
            else{res.status(200).json(result)}
    })
    })
    app.get("/getCatagory" , (req, res) => {
        const viewCatagory = "select * from categories ;";
        con.query(viewCatagory , (err , result) => {
            if(err) {res.status(500).json({message : "The catagory server error"})}
            else{res.status(200).json(result)}
    })
    })
    app.post("/addCategory", (req, res) => {
    const { category_name } = req.body;
    const addCategory = "INSERT INTO categories (category_name) VALUES (?);";
    
    con.query(addCategory, [category_name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "There was an error adding the category" });
        } else {
            res.status(200).json({message : "the categies was added successfully "});
        }
    });
});

///add the produts here

    app.get("/getProductsCount" , (req, res) => {
        const viewCatagory = "SELECT COUNT(products_id) FROM products;";
        con.query(viewCatagory , (err , result) => {
            if(err) {res.status(500).json({message : "The catagory server error"})}
            else{res.status(200).json(result)}
    })
    })

    
    app.post('/addProducts', upload.single('product_image'), (req, res) => {
    const { product_name, product_description, product_price, product_quantity, categories_id } = req.body;
    const product_image = req.file ? req.file.filename : null;

    const addProducts = "insert into products(product_name, product_description, product_price, product_quantity, categories_id,product_image) values (?,?,?,?,?,?);"
    con.query(addProducts , [product_name, product_description, product_price, product_quantity, categories_id,product_image] , (err ,result) => {
      if(err){
        res.status(200).json({message : "error"})
      }
      else {
        res.status(200).json(result)
      }
    })  
});
    app.get("/getAllProduts" , (req ,res) => {
        const products = "select * from products;"
        con.query(products , (err, result) => {
            if(err){
                res.status(500).json({message : "The getAll Produts was Error"})
            }
            else{
                console.log(res.body);
                res.status(200).json(result)
            }
        })
    })
    app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(filename, { root: path.join(__dirname, 'public/images') });
    });

    app.delete("/deleteProduct/:id" , (req, res) => {
        const id = req.params.id;
        const deleteData = "delete from products where products_id = ?;";
        con.query(deleteData , [id] , (err , result) => {
            if(err){
                res.status(500).json({message : `the product id ${id} was not deleted`})
            }else {
                res.status(200).json({message : `the product id ${id} is deleted successfully`})
            }})})

            app.put(`/updateProduct/:productID`, upload.single('product_image'), (req, res) => {
            const id = req.params.productID;
            const { product_name, product_description, product_price, product_quantity, categories_id } = req.body;
            const product_image = req.file ? req.file.filename : null;

            if (isNaN(id)) {
                res.status(400).json({ message: `Invalid product ID ${id}` });
            } else if (!product_name || !product_description || !product_price || !product_quantity || !categories_id) {
                res.status(400).json({ message: "All fields are required to update the product" });
            } else {
                const updateProduct = "UPDATE products SET product_name = ?, product_description = ?, product_price = ?, product_quantity = ?, categories_id = ?, product_image = ? WHERE products_id = ?";
                con.query(updateProduct, [product_name, product_description, product_price, product_quantity, categories_id, product_image, id], (err, result) => {
                    if (err) {
                        res.status(500).json({ message: `The product ${id} was not updated` });
                    } else {
                        res.status(200).json({ message: `The product ID ${id} was updated successfully` });
                    }
                });
            }
        });


    app.listen(port ,(e) => {
        console.log(`the Server is Running on  ${port}...`, e );
    })