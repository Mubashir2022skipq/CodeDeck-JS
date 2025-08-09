document.getElementById("friends").addEventListener('click', function () {

    window.location.href = './friendsRequest/friends.html';
})

let allPost = document.getElementById("all_post")

let userPosts = JSON.parse(localStorage.getItem("userPosts")) ?? [];


function postAdd (){
  
  // allPost.innerHTML  = "";

  userPosts.reverse().forEach(post => {
    let postArticle = `<article class="post" id="add_post">
            <div class="post__header">
              <div class="post__avatar">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=John?size=64" alt="Tom Russo">
              </div>
              <div class="post__info">
                <h4 class="post__author">${post.author}</h4>
                <p class="post__time">${post.time}</p>
              </div>
              <button class="post__more">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
            <div class="post__content">
              <p class="post__text">${post.content} </p>
              <!-- <div class="post__image">
                <img src="https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Post Image">
              </div> -->
            </div>
            <div class="post__actions">
              <button class="post__action">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span>Like</span>
              </button>
              <button class="post__action">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Comment</span>
              </button>
              <button class="post__action">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span>Share</span>
              </button>
            </div>
          </article>`

          allPost.innerHTML += postArticle;
  });
}
postAdd();

document.getElementById("post_created").addEventListener("keydown", (e) => {

   
      //  e.preventDefault();


        if(e.key === "Enter" && e.target.value.trim() !== "" ) {


        if (e.target && e.target.id === "write_post") {

          let currentUser = JSON.parse(localStorage.getItem("loginUser"))[0];

          let newPost = {
            id : currentUser.id,
            author : currentUser.name,
            time: new Date().toLocaleTimeString(),
            content : e.target.value.trim()
          }

          userPosts.push(newPost);
          localStorage.setItem("userPosts",JSON.stringify(userPosts));

           postAdd();

          e.target.value = "";

        }


}




})