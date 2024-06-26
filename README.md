
EcommeMart
EcommeMart is an ecommerce website tailored for beginners, built with React and Node.js.

Getting Started
1) Navigate to the client directory:
**cd client**

2) Install React and necessary dependencies:
**npx create-react-app . 
npm install react-router-dom fontawesome axios
npm start**
**http://localhost:3000/**

![image](https://github.com/vignesh2812001/EcommeMart/assets/57718276/1f806df1-2f17-4cfb-91aa-fb21cbfa468e)

4) After installing dependencies, navigate to the server directory:
**cd server**

5) Initialize npm and install required packages:
**npm init -y
npm install cors mysql2 body-parser multer path express**
and you need to create the directories for manage the images
-- **md public
   md images**
   --public/images after looking like this you can store the images
npm start

7) Before starting the server, create the database. Run the SQL script located at **client/src/createDatabase.sql** in MySQL Workbench.

8) **Usage**
Admin Panel: Access the admin panel at **http://localhost:3000/admin-login**

**Credentials:**
Username: admin
Password: admin@123
Manage products and categories, including adding, viewing, updating, and deleting products.

**Client Side:**
Create your own account or use default credentials:
Username: default
Password: default@123
Browse products, add them to your cart, and make purchases.
**Development**
The project is continuously updated with new features and improvements. Keep up with the latest developments through the codebase.
