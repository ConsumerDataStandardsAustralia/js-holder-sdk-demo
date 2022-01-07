# dsb-middleware-demo
This is used as demo project for the dsb-middleware package project.

# How to use 
Clone the the dsb-middleware project
Clone this project
The two project must be on the same directory hierachy level

Build the dsb-midlleware project (refer to that project)
Build this project 
From the root run `tsc`
Navigate to the distribution directory `cd dist` abd then run this demo `node app.js`
This will now run a NodeJS app which used the dsb-middleware

Example:
Use Postman and sens GET request to `http://localhost`
Try this with an x-v header and without. The former will return a compliant error