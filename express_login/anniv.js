
const anniv = (date) => {
    let today = new Date();
    let birthday =new Date(date)
    
    let age = 0;
  
    age = today.getFullYear() - birthday.getFullYear();
    console.log("Age", age)
    return age;
  };
  
  module.exports = anniv
  