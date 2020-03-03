//easy to understand promises exmpl
const order = false;

const breakfastPromise = new Promise((resolve, reject) =>{
    setTimeout(()=>{
    if(order){
        resolve('Ready');
    }else{
        reject(Error('FAIL'));
    }
    })
}, 3000);
breakfastPromise
    .then(val => console.log(val))
    .catch(err=> console.log(err))