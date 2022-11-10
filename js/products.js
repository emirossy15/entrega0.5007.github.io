const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const FILTER_BY_SEARCH = "search"
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let searchString = undefined; 
let maxCount = undefined;


function showProductsList(){
    let htmlContentToAppend = "";
    let array = currentProductsArray;
    console.log("la string es ", searchString);
    for(let i = 0; i < array.length; i++){ 
        let product = array[i];

        console.log("product ", product.name);
        console.log(product.name.includes(searchString));
        console.log(product.description.includes(searchString));
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
        ((searchString == undefined) || (searchString.length > 0 && false))
        ){
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" onclick="save_id(` +product.id +`)" id="` +product.id +`">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ product.name + " - $" + product.cost + `</h4> 
                            <p> `+ product.description +`</p> 
                            </div>
                            <small class="text-muted">` +  product.soldCount+ ` vendidos</small> 
                        </div>
    
                    </div>
                </div>
            </div>
            `
            document.getElementById("productsList").innerHTML = htmlContentToAppend; 

        }
        
    }
}
function save_id(id){
    localStorage.setItem("product_id", id);
    window.location.href="product-info.html";
    


}



function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === FILTER_BY_SEARCH){
        result = array;
    }

    return result;
}



function sortAndShowProducts(sortCriteria, search){
    currentSortCriteria = sortCriteria;

    searchString = search;

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    let categoria = localStorage.getItem("catID");
    getJSONData(AUTOSLIST + categoria + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductsArray = resultObj.data.products;
            console.table(currentProductsArray)
            showProductsList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("searchInput").addEventListener("input", function(){
        
       let search = document.getElementById("searchInput").value;
       console.log("coso ",search);
        sortAndShowProducts(FILTER_BY_SEARCH, search);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

 
});