let form =document.getElementById('addForm');
let electronicList = document.getElementById('electronic');
let foodList = document.getElementById('food');
let skincareList = document.getElementById('skincare');

form.addEventListener('submit',addProducts);

function addProducts(event)
{
    event.preventDefault();
    let productPrice = document.getElementById('price').value;
    let productName = document.getElementById('product').value;
    let productCategory = document.getElementById('category').value;

    console.log(productPrice,productName,productCategory);

    let productsObject = 
    {
        productname:event.target.product.value,
        productprice:event.target.price.value,
        productCategory:event.target.category.value
    }
    axios.post("https://crudcrud.com/api/9d6b05eedd0947e4adb54c218262e7d8/productData",productsObject)
    .then((response) => {
        console.log(response);
        if(productCategory === 'Food Items'){
            showProductOnScreen(productName,productPrice,productCategory,foodList);
        }
        else if(productCategory === 'Electronic Items'){
            showProductOnScreen(productName,productPrice,productCategory,electronicList);
        }
        else if(productCategory === 'Skincare Items'){
            showProductOnScreen(productName,productPrice,productCategory,skincareList);
        }
    })


     document.getElementById('price').value = "";
     document.getElementById('product').value = "";
     document.getElementById('category').value = "Electronic Items";
}

window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/9d6b05eedd0947e4adb54c218262e7d8/productData")
    .then((response) => {
        let dataArray = response.data;
        

        for(let i=0;i<dataArray.length;i++)
        {
            let productName = response.data[i].productname;
            let productPrice = response.data[i].productprice;
            let category = response.data[i].productCategory;
            let productId = response.data[i]._id;

            if(category === 'Food Items'){
                showProductOnScreen(productName,productPrice,category,foodList,productId);
            }
            else if(category === 'Electronic Items'){
                showProductOnScreen(productName,productPrice,category,electronicList,productId);
            }
            else if(category === 'Skincare Items'){
                showProductOnScreen(productName,productPrice,category,skincareList,productId);
            }
            
        }
    })
    .catch(error => console.log(error));
})

function showProductOnScreen(productName,productPrice,category,listToAppend,productId){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(productName + " "));
    li.appendChild(document.createTextNode(productPrice+ " "));
    li.appendChild(document.createTextNode(category));

    let deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right ';
    deleteButton.appendChild(document.createTextNode('Delete Product'));

    deleteButton.addEventListener('click',ondelete);

    
    
    li.appendChild(deleteButton);
    listToAppend.appendChild(li);

    function ondelete(e)
    {
        e.preventDefault();
        let parentNode = e.target.parentNode;
        parentNode.remove();
        let dataID =`https://crudcrud.com/api/9d6b05eedd0947e4adb54c218262e7d8/productData/${productId}` 
        axios.delete(dataID)
        .then((response) => {
            alert("Product deleted")
        })
        .catch(error => console.log(error));
    }
}