const blogList = document.getElementById("blogList");
let blog = [];

document.forms["myForm"].onsubmit = function (e) {
  e.preventDefault();
  const language = document.getElementById("language").value.toLowerCase();
  const topic = document.getElementById("topic").value.toLowerCase();
  const date = document.getElementById("date").value.toLowerCase();

  const filteredBlog = blog.filter((data) => {
    // topic is an object, it needs to be converted to string.
    let topicJson = JSON.stringify(data.topics);
    if(topicJson === undefined){
      topicJson = "No topic";
    }
    if(language || topic || date){
      return data.lang.includes(language) && data.date.includes(date) && topicJson.includes(topic);
    }
    r
  });

  displayBlogs(filteredBlog);
};

const loadCharacters = async () => {
  try {
    // proxyUrl helps to avoid an error of Access-countrol-allow
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = "https://www.healthcare.gov/api/blog.json";

    const res = await fetch(proxyUrl + targetUrl);
    const jsonData = await res.json();
    for (var i = 0; i < jsonData.blog.length; i++) {
      blog.push(jsonData.blog[i]);
    }
  } catch (err) {
    console.error(err);
  }
};
const viewContent = () => {
  const content = document.getElementById("content");
  
  if(content.style.display == "block"){
    content.style.display = "none"
  } else{
    content.style.display = "block"
  }
}
const displayBlogs = (blogs) => {
  const htmlString = blogs
    .map((blog) => {
      return `
            <li class="blog">
                <p>Title : ${blog.title}</p>
                <p>Language : ${blog.lang}</p>
                <p>Topic: ${blog.topics}</p>
                <p>Date: ${blog.date}</p>
                <p id="content">${blog.content}</p>
                <button onclick="viewContent()">View</button>
            </li>
        `;
    })
    .join("");
  blogList.innerHTML = htmlString;
};


loadCharacters();
