let tagsArray = [];

function createCard(details) {
    company=details.company;
    jobTitle=details.jobTitle;
    isFull=details.isFull;
    time=details.time;
    country=details.country;
    tags=details.tags;
    imageLink=details.imageLink;
    let card = document.createElement('div');
    let card_row = document.createElement('div');
    let card_row_information = document.createElement('div');
    let card_row_tags = document.createElement('div');
    let card_row_information_row = document.createElement('div');
    let image = document.createElement('img');
    let card_row_information_column = document.createElement('div');
    let companyName = document.createElement('h3');
    let position = document.createElement('h2');
    let ul=document.createElement('ul');
    card.className = "card";
    card_row.className = "card--row";
    card_row_information.className = "card--row--information";
    card_row_tags.className = "card--row--tags";
    card_row_information_row.className = "card--row--information--row";
    card_row_information_column.className = "card--row--information--column";
    
  tags.forEach((elment)=>{
    let tag=document.createElement('div');
    let tagName=document.createElement('p');
    tagName.innerHTML=elment;
    tag.className="card--row--tag";
    tag.appendChild(tagName);
    card_row_tags.appendChild(tag);
  });
    companyName.innerHTML = company;
    position.innerHTML = jobTitle;
    image.src = imageLink;

    for(let i=0;i<3;i++){
        let li=document.createElement('li');
        if(i==0){
            li.innerHTML=time;
        }
        if(i==1)
        li.innerHTML=isFull;
        if(i==2)
        li.innerHTML=country;
        ul.appendChild(li);
    }
   
    card_row_information_column.appendChild(companyName);
    card_row_information_column.appendChild(position);
    card_row_information_row.appendChild(image);
    card_row_information_row.appendChild(card_row_information_column);
    card_row_information.appendChild(card_row_information_row);
    card_row_information_column.appendChild(ul);
    card_row_information.appendChild(card_row_information_row);
    card_row.appendChild(card_row_information);
    card_row.appendChild(card_row_tags);
    card.appendChild(card_row);
    return card;
}
function addCard(details) {
    let cards=document.querySelectorAll(".cards");
    let card = createCard(details);
    cards.append(card);
}
window.addEventListener("DOMContentLoaded", () => {
    let data=createFakeData();
    data.forEach((element)=>{
        addCard({
            company:element.name,
            jobTitle:element.position,
            isFull:element.isFull,
            time:element.time,
            country:element.country,
            tags:element.tags,
            imageLink:element.url
           });
    });
   let input= document.getElementsByClassName("searchBar-input")[0];
   input.addEventListener("keydown",function(event){
    if (event.keyCode === 13) {
        const value=input.value;
      if(value.length>0){
        tagsArray.push(value);
        createTag(value);
        search(tagsArray);
       input.value='';
      }
    }
   });
   
});
function createFakeData(){
    return [
       
        {
            name:"Google",
            position:"Data Engineer",
            tags:["TenserFlow","Graph Algorithms","Statics","Linear Algebra","Calculus","Probability"],
            url:"https://e7.pngegg.com/pngimages/29/644/png-clipart-social-media-google-google-logo-computer-icons-google-trademark-logo.png",
            isFull:"Full Time",
            country:"USA Only",
            time:"7 days ago",
            id:0
        },
        {
            name:"Amazon",
            position:"Front end Endineer",
            tags:["HTML5","CSS3","Javascript","PUG","BEM","Git","AMP"],
            url:"https://e7.pngegg.com/pngimages/29/644/png-clipart-social-media-google-google-logo-computer-icons-google-trademark-logo.png",
            isFull:"Full Time",
            country:"USA Only",
            time:"7 days ago",
            id:1
        },
        {
            name:"FaceBook",
            position:"Back end Engineer",
            tags:["PHP","Lumen","MVC","Laravel","Spring boot","PHP","Lumen","MVC","Laravel","Spring boot"],
            url:"https://e7.pngegg.com/pngimages/29/644/png-clipart-social-media-google-google-logo-computer-icons-google-trademark-logo.png",
            isFull:"Part Time",
            country:"Worldwide",
            time:"7 days ago",
            id:2
        },
       
    ]
}

function search(targets){
 
    targets=targets.map((target)=>{
        return target.toLowerCase();
    });
    let cards = document.querySelector('.cards').children;

    cards.forEach((element)=>{
    
        const tags = element.querySelectorAll('.card--row--tag');
        let flag = true;
        tags.forEach((tag) => {
            if (targets.includes(tag.querySelector('p').innerText.toLowerCase())) {
                flag = false;
            }
        });
        if (flag)
        element.classList.add('hidden');
        else{
            element.classList.remove('hidden');
        }
    });
}

function createTag(tagValue){
    let tag=document.createElement('p');
    tag.innerText=tagValue;
    let node=document.createElement('div');
    node.className="searchBar--tag";
    node.appendChild(tag);
    let tags=document.querySelectorAll("searchBar--tags");
   tags.appendChild(node);
   node.addEventListener("click",()=>{
    let tag=element.querySelector('p').innerText;
    tagsArray=tagsArray.filter((e)=>e!==tag);
    search(tagsArray);
    element.remove();
   });
   
}