
let commentCount = 0;

function drawStars(stars){

    let number = parseInt(stars);
    let html="";
    for(let i =1; i<=number;i++){
        html +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        html +=`<span class="fa fa-star"></span>`
    }    
    return html;

}

function addComment(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy + "---" +  today.getHours() + ":"  
    + today.getMinutes();
    
    var comentario=document.getElementById("textarea").value;
    var score = document.getElementById("score").value;
    var htmlContentToAppend =`<div class="card">
    <div class="card-header" id="heading${commentCount}">
    <p style="text-align: right;">${today}</p>
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${commentCount}" aria-expanded="false" aria-controls="collapse${commentCount}">
        ${localStorage.getItem("email")}&nbsp&nbsp<small>${drawStars(score)}</small>
        </button>
      </h2>
      
    </div>

    <div id="collapse${commentCount}" class="collapse" aria-labelledby="heading${commentCount}" data-parent="#accordionExample">
      <div class="card-body">
      ${comentario}
      </div>
    </div>
  </div>`
    document.getElementById("accordionExample").innerHTML += htmlContentToAppend;
    document.getElementById("textarea").value ="";
    commentCount += 1
}

function redirectToProduct(id){
    localStorage.setItem("product_id", id);
    window.location.href="product-info.html";
}



document.addEventListener("DOMContentLoaded", function(e){

    let product_id= localStorage.getItem("product_id");
    if(product_id){
        console.log("entro")
        getJSONData(PRODUCT_INFO_URL + product_id + ".json").then(function(resultObj){
            if (resultObj.status === "ok")
            {
                product = resultObj.data;
                arrayRelated = product.relatedProducts;
                console.log(product);

    
                
                document.getElementById("productName").innerHTML+= product.name;
                document.getElementById("productDescription").innerHTML+= product.description;
                document.getElementById("productCost").innerHTML+= product.cost;
                document.getElementById("productCriteria").innerHTML+= product.category;
                document.getElementById("productCount").innerHTML+=product.soldCount

                for(let i = 0; i < product.images.length; i++ ){
                    let imageUrl = product.images[i];
                    let imghtml = `<img src="../${imageUrl}" width="96px" height="158px"/>`;
                    let productImagesGallery = document.getElementById("productImagesGallery");
                    productImagesGallery.innerHTML += imghtml;
                }
                
                
                for(let i = 0; i < product.relatedProducts.length; i++){
                    let relProd = product.relatedProducts[i];
                    let relProdHtml = `
                    <div class="card" onclick="redirectToProduct(${relProd.id})"  style="cursor:pointer;width: 13rem;height: 13rem;">
                        <img class="card-img-top" src="${relProd.image}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${relProd.name}</h5>
                        </div>
                    </div>`;
                    let relatedProductsDiv = document.getElementById("related-products");
                    relatedProductsDiv.innerHTML += relProdHtml;
                }

            
            }
        });
        
        getJSONData(PRODUCT_INFO_COMMENTS_URL + product_id + ".json").then(function(resultObj){
            if (resultObj.status === "ok")
            {
                comments = resultObj.data;
                for(let i = 0; i < comments.length; i++){
                    let comment = comments[i];
                    var htmlContentToAppend =`<div class="card">
                    <div class="card-header" id="heading${i}">
                    <p style="text-align: right;">${comment.dateTime}</p>
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                        ${comment.user}&nbsp&nbsp<small>${drawStars(comment.score)}</small>
                        </button>
                    </h2>
                    
                    </div>

                    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">
                            ${comment.description}
                        </div>
                    </div>
                </div>`;
                    commentCount += 1
                    document.getElementById("accordionExample").innerHTML += htmlContentToAppend;
                }
            
            }
            });
        }   
    
});
    