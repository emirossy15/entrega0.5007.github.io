let carro = document.getElementById('carrito');
let subtotal = document.getElementById('subtotal');
let cartItems = [];




function showCart(array) {
    let cartItems = array.articles;
    htmlToAppend = "";
    let Subtotal = 0;
    for (item in cartItems) {
        Subtotal += productSubTotal(cartItems);
        htmlToAppend += `
                    <tr>
                        <td class="col">
                        <div class="row pl-3">
                            <img class="img-fluid" src="${cartItems[item].image}" style="width: 15%; height: 15%;">
                            <div class="col ml-1 pl-0 pr-0">
                            
                                <h4 style="width: 100%" class="pr-0">${cartItems[item].name}</h4>
                            </div>
                        </div>
                        </td>
                        <td class="col" style="text-align: center">
                        <input type="number" min="1" class="form-control" value="${cartItems[item].count}" id="productCount${item}">
                        </td>
                        <td class="col text-center"><strong><span id="productCost${item}">${cartItems[item].unitCost}</span> ${cartItems[item].currency}</strong></td>
                        <td class="col text-center"><strong><span id="productSubtotal${item}"></span> ${cartItems[item].currency}</strong></td>
                    </tr>
        `


    }
  
    function updateSubtotal(cartItems) {

        for (item in cartItems) {
            let suma = 0;
            let count = document.getElementById('productCount' + item);
            let cost = document.getElementById('productCost' + item);
            let costNumber = parseInt(cost.innerHTML, 10);
            let productSubtotal = document.getElementById('productSubtotal' + item);
    
        
    
            count.addEventListener('change', function() {
                let countNumber = count.value;
                suma = costNumber * countNumber;
                productSubtotal.innerHTML = suma;
                
            });
    
        }
       
    }
    carro.innerHTML = htmlToAppend;
    updateSubtotal(cartItems);

    function productSubTotal(cartItems) {
        let totalCost = cartItems[item].count * cartItems[item].unitCost;
        }
        return totalCost;
    };


    document.addEventListener("DOMContentLoaded", function(e) {
        getJSONData(CART_INFO_URL + "25801" + ".json")
            .then(response => {
                if (response.status === "ok") {
                    let cartInfo = response.data;
                    cartItems = response.data.articles;
                    showCart(cartInfo);
                } 
             } 
            );});