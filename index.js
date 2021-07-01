const body = document.getElementsByTagName("body")[0]

const loadData = async() => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = data.json();
    return users;
}

window.addEventListener("load", async () => {
    try{
    const users = await loadData();
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", "user-container");
    for(user of users) {
        const childDiv = document.createElement("div")
        childDiv.setAttribute("class", "child-div")
        childDiv.innerHTML = `<span>${user.name}</span>
                            <span>${user.email}</span>
                            <form>
                                <input type="hidden" value=${user.id} name="id"></input>
                                <input type="hidden" value=${user.name} name="name"></input>
                                <button class="button">See more</button>
                            </form>`;
        parentDiv.appendChild(childDiv);
    }
    body.appendChild(parentDiv);
    } catch(e) {
        console.log(e);
    }
});

const postLoaded = async(id) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    const posts = data.json();
    return posts
}

const loadPostsOnDom = (posts, name) => {
    const anchor = document.createElement('a');
    anchor.setAttribute("href", "./index.html");
    anchor.setAttribute("class", "anchor");
    anchor.textContent = "Back"
    body.appendChild(anchor);
    const title = document.createElement("h3");
    title.textContent=`Posts by ${name}`;
    body.appendChild(title);
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", "user-container-div");
    for(post of posts) {
        const childDiv = document.createElement("div");
        childDiv.setAttribute("class", "child-div")
        childDiv.innerHTML = `<h4>${post.title}</h4>
                                <p>${post.body}</p>`;
        parentDiv.appendChild(childDiv);
    }
    body.appendChild(parentDiv);
}

body.addEventListener("click", async (e) => {
    if(e.target.className == "button") {
        e.preventDefault();
        const nameTag = e.target.previousElementSibling;
        const idTag = nameTag.previousElementSibling;
        const posts = await postLoaded(idTag.value);
        document.querySelector("#user-container").remove();
        loadPostsOnDom(posts, nameTag.value);
    }
})