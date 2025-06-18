function removeActiveClass(){
    const activeButtons=document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active")
    }
}

// Load ALL videos 

function loadAllCategories(){
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then((res)=>res.json())
.then((data)=>displayCategories(data.categories))
}


const displayCategories=(categories)=>{
const categoriesContainer=document.getElementById('categories-container')
for(let cat of categories){
    const categoriesDiv=document.createElement("div")
    categoriesDiv.innerHTML=`
    <button id="btn-${cat.category_id}" onclick='loadCategoryVideos(${cat.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

    `;
    categoriesContainer.append(categoriesDiv);
}
}
loadAllCategories()



// Load Videos By Categories id

const loadCategoryVideos=(id)=>{
    const url=`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}

    `
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActiveClass();
        const clickedButton=document.getElementById(`btn-${id}`)
        console.log(clickedButton);
        clickedButton.classList.add("active")
        

        displayVideos(data.category)
    })
    
}


function LoadAllVides(searchText = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=>res.json())
    .then((data)=>{
        removeActiveClass();
        document.getElementById('btn-all').classList.add('active');
        displayVideos(data.videos)
    })
}


const displayVideos=(videos)=>{

const videosContainer=document.getElementById("videos-container")

videosContainer.innerHTML="";
if(videos.length===0){
    videosContainer.innerHTML=`
    <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h1 class="font-bold text-2xl">Oops! Sorry, no content is currently available</h1>
        </div>
    `
}

videos.forEach(video => {
    const videosDiv=document.createElement("div")
    console.log(video);
    
    videosDiv.innerHTML=`
            <div class="card bg-base-100 w-96">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute bottom-2 right-2 bg-black text-white rounded text-sm px-2">3hrs 56min ago</span>
  </figure>

  <div class="flex gap-3 px-0 py-5">
    <div class="profile">
        <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
    </div>
    <div class="intro">
        <h1 class="text-sm font-semibold">${video.title}</h1>
        <p class= "font-semibold text-gray-400 flex gap-1">${video.authors[0].profile_name} 
        ${video.authors[0].verified==true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""> `: ` `}
        </p>
        <p class="text-sm font-semibold text-gray-400">${video.others.views} views</p>

    </div>
  </div>
  <button onclick="ViewVideoDetails('${video.video_id}')" class="btn btn-block">View Details</button>
</div>
    `;
    videosContainer.append(videosDiv);
    
});
}

const ViewVideoDetails=(videoId)=>{
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

fetch(url)
.then(res=>res.json())
.then(data=>displayVideoDetails(data.video))
}

const displayVideoDetails=(video)=>{
    console.log(video);
    document.getElementById('video_details').showModal()
    const detailsContainer=document.getElementById('details-container');
    detailsContainer.innerHTML=`
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
    
    `
    
}

document.getElementById('search-input').addEventListener("keyup",function(e){
    const input=e.target.value;
    LoadAllVides(input)
})
// LoadAllVides();

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }