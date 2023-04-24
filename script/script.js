let articlesPerPages;
let totalPages;
console.log(window.location)
if(window.location.search){
 query=window.location.search.split("?")[1].split("&")[0].split("=")[1];
page=parseInt(window.location.search.split("?")[1].split("&")[1].split("=")[1]);
}
else{
    query="All";
    page=1;
}
let newsCards=document.getElementById("newsCard");


console.log(query,page);
let queryText=document.getElementById("queryText");
let queryResult=document.getElementById("queryResult");


let pre=document.getElementById("pre");
pre.href=`/?query=${query}&pageno=${page-1}`;

let next=document.getElementById("next");

if(page===1){
    pre.classList.add("disabled")
}

let str;
next.href=`/?query=${query}&pageno=${page+1}`;

const fetchNews= async (query,pageNo)=>{
let responce=await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=996b5bbf9dda4a999bfbe334dab28631&pageSize=12&page=${pageNo}`);

  data = await responce.json();
return data;


}

fetchNews(query,page).then(data=>{
    queryText.innerHTML=query.replace("+"," ");
queryResult.innerHTML=data.totalResults;
totalPages=Math.ceil(data.totalResults/articlesPerPages);//round of
let str="";
for(let item of data.articles){
    let date=new Date(item.publishedAt).toLocaleDateString();
 str=str+`<div class="card m-3 " style="width: 18rem;">
<img src="${item.urlToImage}" class="card-img-top" alt="...">
<div class="card-body">

  <h5 class="card-title">${item.title}</h5>
   <div class="fw-bold"> Published : <span class="fw-normal"> ${date}</span></div>
   <div class="fw-bold">author : <span class="fw-normal">${item.author}</span></div> 
  <p class="card-text">${item.description}</p>
  <a href="${item.url}" class="btn btn-primary">Read More...</a>
</div>
</div>`
}
newsCards.innerHTML=str;
}).catch(error=>{
    alert("Connection Lost");
})

