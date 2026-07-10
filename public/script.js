// ================= REGISTER =================

document.getElementById("registerBtn").addEventListener("click", registerUser);

async function registerUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    alert(data.message);
}

// ================= LOGIN =================

document.getElementById("loginBtn").addEventListener("click", loginUser);

async function loginUser() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    alert(data.message);

}

// ================= CREATE POST =================

document.getElementById("postBtn").addEventListener("click", createPost);

async function createPost() {

    const username = document.getElementById("username").value;
    const text = document.getElementById("postText").value;

    const response = await fetch("/createPost", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            text
        })

    });

    const data = await response.json();

    alert(data.message);

    loadPosts();

}

// ================= LIKE =================

async function likePost(id) {

    await fetch("/like/" + id, {

        method: "PUT"

    });

    loadPosts();

}

// ================= COMMENT =================

async function addComment(id) {

    const comment = document.getElementById("comment-" + id).value;

    await fetch("/comment/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            comment

        })

    });

    loadPosts();

}

// ================= LOAD POSTS =================

async function loadPosts() {

    const response = await fetch("/posts");

    const posts = await response.json();

    const postDiv = document.getElementById("posts");

    postDiv.innerHTML = "";

    posts.forEach(post => {

        let comments = "";

        post.comments.forEach(c => {

            comments += `<li>${c}</li>`;

        });

        postDiv.innerHTML += `

        <div class="post">

            <h3>${post.username}</h3>

            <p>${post.text}</p>

            <p>❤️ Likes : ${post.likes}</p>

            <button onclick="likePost('${post._id}')">
                Like
            </button>

            <br><br>

            <input
            id="comment-${post._id}"
            placeholder="Write a comment">

            <button onclick="addComment('${post._id}')">
                Add Comment
            </button>

            <h4>Comments</h4>

            <ul>

                ${comments}

            </ul>

        </div>

        `;

    });

}

loadPosts();