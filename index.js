let tagsArray = [];

function createCard(company, jobTitle, isFull, time, country, tags, imageLink) {
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
    
    for(let i=0;i<tags.length;i++){
        let tag=document.createElement('div');
        let tagName=document.createElement('p');
        tagName.innerHTML=tags[i];
        tag.className="card--row--tag";
        tag.appendChild(tagName);
        card_row_tags.appendChild(tag);
    }
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
function addCard(company, jobTitle, isFull, time, country, tags, imageLink) {
    let cards = document.getElementsByClassName("cards")[0];
    let card = createCard(company, jobTitle, isFull, time, country, tags, imageLink);
    cards.append(card);
}
window.addEventListener("DOMContentLoaded", () => {
    let data=createFakeData();
   for(let i=0;i<data.length;i++)
   addCard(data[i].name, data[i].position, data[i].isFull, data[i].time, data[i].country, data[i].tags, data[i].url);
  
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
    for(let i=0;i<cards.length;i++){
      
        const tags = cards[i].querySelectorAll('.card--row--tag');
        let flag = true;
        tags.forEach((tag) => {
            if (targets.includes(tag.querySelector('p').innerText.toLowerCase())) {
                flag = false;
            }
        });

        if (flag)
            cards[i].classList.add('hidden');
        else{
            cards[i].classList.remove('hidden');
        }
    
    }
  
   
}
function init(){
    let tags=document.querySelectorAll('.searchBar--tag');
   for(let i=0;i<tags.length;i++){
       tags[i].addEventListener("click",()=>{
        let tag=tags[i].querySelector('p').innerText;
        tagsArray=tagsArray.filter((e)=>e!==tag);
        search(tagsArray);
        tags[i].remove();
       });
   }
}
function createTag(tagValue){
    let tag=document.createElement('p');
    tag.innerHTML=tagValue;
    let node=document.createElement('div');
    node.className="searchBar--tag";
    node.appendChild(tag);
    let tags=document.getElementsByClassName("searchBar--tags")[0];
    console.log(tags);
   tags.appendChild(node);
   init();
}