let carro = document.getElementById('carrito');
let subtotal = document.getElementById('subtotal');
let cartItems = [];
let costoEnvio = 0







function showCart(array)  {
    let cartItems = array.articles;
    htmlToAppend = "";
    let Subtotal = 0;
    for (item in cartItems) {

    console.log(item)
        carro.innerHTML += `
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
                        <input onchange="updateSubtotal(${item}, ${cartItems[item].unitCost})" type="number" min="1" class="form-control" value="${cartItems[item].count}" id="productCount${item}">
                        </td>
                        <td class="col text-center"><strong><span id="productCost${item}">${cartItems[item].unitCost}</span> ${cartItems[item].currency}</strong></td>
                        <td class="col text-center"><strong><span id="productSubtotal${item}">${cartItems[item].count*cartItems[item].unitCost}</span> ${cartItems[item].currency}</strong></td>
                    </tr>
        `
        
    }
  }   
  
  

    function updateSubtotal(){
        let cost = cartItems[item].unitCost;
        let count = parseInt(document.getElementById('productCount' + item).value);
        let productSubtotal = document.getElementById('productSubtotal' + item);
        
        let subtotal = cost * count
        productSubtotal.innerHTML = subtotal;
          
        let total = Math.round(costoEnvio*subtotal);
        let envio = Math.round(subtotal*(costoEnvio/100))
        document.getElementById("costoEnvio").innerHTML = envio;
        document.getElementById("subtotal").innerHTML = subtotal;
        document.getElementById("total").innerHTML =  total
            };

            

            
        
    


    document.addEventListener("DOMContentLoaded", function(e) {
        getJSONData(CART_INFO_URL + "25801" + ".json")
            .then(response => {
                if (response.status === "ok") {
                    let cartInfo = response.data;
                    cartItems = response.data.articles;
                    showCart(cartInfo);
                } 
             });
            
            });

            document.getElementById("radioPremium").addEventListener("change", function(){
                costoEnvio = 1.15;
                updateSubtotal()
            });
            
            document.getElementById("radioExpres").addEventListener("change", function(){
                costoEnvio = 1.07;
                updateSubtotal()
            });
            
            document.getElementById("radioStandard").addEventListener("change", function(){
                costoEnvio = 1.05;
                updateSubtotal()
            });
            
            document.getElementById("comprar").addEventListener("click", function(e){
            
               
                let calle = document.getElementById("InputCalle");
                let numero = document.getElementById("InputNumero");
                let esquina = document.getElementById("InputEsquina");
                let infoMissing = false;
            
                //Quito las clases que marcan como inválidos
                calle.classList.remove('is-invalid');
                numero.classList.remove('is-invalid');
                esquina.classList.remove('is-invalid');
                document.getElementById("cardNumber").classList.remove('is-invalid');
                document.getElementById("securityID").classList.remove('is-invalid');
                document.getElementById("vencimiento").classList.remove('is-invalid');
                document.getElementById("cuentanro").classList.remove('is-invalid');
            
                // Quita los avisos de los campos obligatorios faltantes.
                
                document.getElementById("smesquina").innerHTML = ""
                document.getElementById("smnumero").innerHTML = ""
                document.getElementById("smcalle").innerHTML = ""
                document.getElementById("smmodal").innerHTML = ""
                document.getElementById("smcardnumber").innerHTML= "" 
                document.getElementById("smsecurity").innerHTML= "" 
                document.getElementById("smvencimiento").innerHTML= "" 
                document.getElementById("smcuenta").innerHTML= ""
            
                
                if (esquina.value === "")
                {
                    esquina.classList.add('is-invalid');
                    document.getElementById("smesquina").innerHTML = "Debes especificar una esquina"
                    infoMissing = true;
                }
                
                if (numero.value ==="")
                {
                    numero.classList.add('is-invalid');
                    document.getElementById("smnumero").innerHTML = "Debes especificar un numero"
                    infoMissing = true;
                }
            
                if (calle.value ==="")
                {
                    calle.classList.add('is-invalid');
                    document.getElementById("smcalle").innerHTML = "Debes especificar una calle"
                    infoMissing = true;
                }
            
                if (document.getElementById("creditCardPay").checked=== false && document.getElementById("bankingPay").checked=== false){
                    document.getElementById("smmodal").innerHTML = "Debes especificar un metodo de pago"
                    infoMissing = true;
                }
            
                if (document.getElementById("creditCardPay").checked=== true){
                    if (document.getElementById("cardNumber").value ==="")
                {
                    document.getElementById("cardNumber").classList.add('is-invalid');
                    document.getElementById("smcardnumber").innerHTML= "debe agregar una tarjeta"
                    document.getElementById("smmodal").innerHTML= "metodo de pago invalido"
            
                    infoMissing = true;
                }
                if (document.getElementById("securityID").value ==="")
                {
                    document.getElementById("securityID").classList.add('is-invalid');
                    document.getElementById("smsecurity").innerHTML= "codigo de seguridad invalido"
                    document.getElementById("smmodal").innerHTML= "metodo de pago invalido"
            
                    infoMissing = true;
                }
                if (document.getElementById("vencimiento").value ==="")
                {
                    document.getElementById("vencimiento").classList.add('is-invalid');
                    document.getElementById("smvencimiento").innerHTML= "fecha de vencimiento invalida"
                    document.getElementById("smmodal").innerHTML= "metodo de pago invalido"
            
                    infoMissing = true;
                }
                }
            
                if (document.getElementById("bankingPay").checked=== true){
                    if (document.getElementById("cuentanro").value ==="")
                {
                    document.getElementById("cuentanro").classList.add('is-invalid');
                    document.getElementById("smcuenta").innerHTML= "debe agregar una tarjeta"
                    document.getElementById("smmodal").innerHTML= "metodo de pago invalido"
            
                    infoMissing = true;
                }
                }
            
                if(!infoMissing)
                {
                alert(
  "COMPRA REALIZADA CON EXITO!")
                    window.location = "paginicio.html"
                    
                }
            })
            
            document.getElementById("creditCardPay").addEventListener("change", function(e){
                document.getElementById("cardNumber").disabled = false;
                document.getElementById("securityID").disabled = false;
                document.getElementById("vencimiento").disabled = false;
            
                document.getElementById("cuentanro").disabled = true;
            
            })
            
            document.getElementById("bankingPay").addEventListener("change", function(e){
                document.getElementById("cardNumber").disabled = true;
                document.getElementById("securityID").disabled = true;
                document.getElementById("vencimiento").disabled = true;
            
                document.getElementById("cuentanro").disabled = false;
            
            })