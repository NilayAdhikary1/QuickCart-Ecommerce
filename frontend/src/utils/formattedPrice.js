
// const num = 5.6789;
// const rounded = Math.round(num * 100) / 100;
// console.log(rounded); // Output: 5.68

function formattedPrice(price){
  return Math.round(price * 100) / 100;
};

export default formattedPrice;
