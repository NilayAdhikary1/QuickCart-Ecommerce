
const radiusArr = [7, 5, 4, 6, 9];

const area = (rad) => {
    return Math.PI * rad * rad;
}
const circumference = (rad) => {
    return 2 * Math.PI * rad;
}


// So this calculateProperty is a higher order funciton as it takes another funciton findProperty as an argument...

// const calculateProperty = (radiusArr, findProperty) => {
//     const areas = [];
//     for(let i = 0; i < radiusArr.length; i++){
//         areas.push(findProperty(radiusArr[i]));
//     }
//     return areas;
// }

// Arroow function is not supported on Array.prototype
Array.prototype.calculateProperty = function (findProperty) {
    const areas = [];
    for(let i = 0; i < this.length; i++){
        areas.push(findProperty(this[i])); //this refers to the array on which the calculateProperty is called...
    }
    return areas;
};

// map is also a higher order funtion...
const areaArray1 = radiusArr.map(area);

// I have made calculateProperty works like map function using Array.prototype
const areaArray2 = radiusArr.calculateProperty(area);


 // Both of the below give same result...
 console.log(areaArray1); 
 console.log(areaArray2);


// console.log(calculateProperty(radiusArr, circumference));