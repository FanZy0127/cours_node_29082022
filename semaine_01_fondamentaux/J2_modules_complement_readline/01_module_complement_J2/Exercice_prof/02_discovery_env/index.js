require('dotenv').config();

if(process.env.NODE_ENV){
    console.log("Je suis en production");
}else{
    console.log("Je suis en développement");
}