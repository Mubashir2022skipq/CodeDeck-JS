

(async function() {

    try {

        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        renderCards(data.products);

        // console.log(data.products);




    }
    catch (error) {
        console.log(" Error fetching data  : ", error);
    }

})();



function renderCards(products) {
  

    products.map((products) => {
       
        let card = document.getElementById('main_container');

         let {title, description, category, price,images} = products;
   
         card.innerHTML += `<div class="card_container">
                <a href="#" class="card_image_container">
                    <img src="${images}"
                        alt="card 1 image" class="card_image" loading="lazy">
                </a>
                <div class="card_title_container">
                    <a href="#" class="card_title_anchor">
                        <h2 class="card_title">${title}</h2>
                    </a>
                    <p class="card_des">${description}</p>
                </div>
                <div class="card_footer_container">
                    <div class="author_container">
                        <div class="author_avatar_container">
                        
                        <img src="./shopping-cart.png" loading="lazy"
                                class="author_avatar" alt="">

                        </div>
                        <div class="author_info_container">
                            <span class="author_name">QuickCart</span>
                            <span class="author_date">Rs${price}</span>
                        </div>
                    </div>
                    <div>
                        <span class="card_tag_container">Buy</span>
                    </div>

                </div>
            </div>`
              





    })



}
















