// varianles

const copiers = document.querySelectorAll(".copy-text")
const dateElementInFooter = document.querySelector("#date")
const thumbsup = document.querySelector(".thumbsup")
const likes = document.querySelector(".likes")
const resume = document.querySelector(".resume")
const illustration = document.querySelector(".illustration")
const banner = document.querySelector(".banner")
const wrapper = document.querySelector(".wrapper")
const star = document.querySelector(".star")



let jsonProjects

//

dateElementInFooter.textContent = new Date().getFullYear();

//

// event listeners

copiers.forEach((copier, index) => copier.addEventListener("click", copy))
thumbsup.addEventListener("click", increaseThumbsUp)
window.addEventListener("scroll", handleScroll)



// functions

function copy(e){

  navigator.clipboard.writeText(e.target.textContent);

  resetCopiers()
  const index = e.target.getAttribute("index")
  alertIfCopied(e.target, index - 1)
}
function handleScroll(e){
  illustration.style.right = `${window.scrollY}px`
  banner.style.transform = `rotate(${window.scrollY * .1}deg)`
  wrapper.style.left = `${window.scrollY}px`
  wrapper.style.transform = `rotate(${window.scrollY * .1}deg)`
  star.style.top = `${window.scrollY }px`
  star.style.left = `${window.scrollY }px`
  star.style.transform = `rotate(${window.scrollY }deg)`
}
function alertIfCopied(element, index){

  if(index === 0) {

    element.setAttribute("text", "email copied on clipboard")
  }
  if(index === 1) {

    element.setAttribute("text", "phone number copied on clipboard")
  }
  if(index === 2) {

    element.setAttribute("text", "address copied on clipboard")
  }
}

function resetCopiers() {

  copiers.forEach((text, i) => {
    if(i === 0) {

      text.setAttribute("text", "click to copy email")
    }
    if(i === 1) {

      text.setAttribute("text", "click to copy phone number")
    }
    if(i === 2) {

      text.setAttribute("text", "click to copy address")
    }
  }) 
}

function setPopup(item, callback) {

  document.querySelector(".popup").innerHTML = `
    <span id="hide">&times;</span>
    <img src="${item}">
  `

  callback()
}

function increaseThumbsUp(e){

  if(localStorage.getItem("liked") === null) {
    localStorage.setItem("liked", true)
  
      likes.textContent = +likes.textContent + 1
    } else {
  
      likes.classList.add("showmsg")
  
      setTimeout(() => likes.classList.remove("showmsg"), 3000);
     
    }
}

resume.addEventListener("click", ()=>{
  setPopup('/images/resume.png', () => {
    document.querySelector(".popup").classList.remove("hide")
  hideElements()
    document.querySelector("#hide").addEventListener("click", ()=> {
     showElements()
  })
  })
})

const  setProjects =  async (callback) => {
    jsonProjects = await fetch("api.json").then(data => data.json())
jsonProjects.forEach(project => {
})
 const projectDomAarray = jsonProjects.map(({id, title, image, description , liveSiteLink, langs, githubRepo}) => {
   
  return  ` <div id="${id}" class="cards_item">
    <img src="${image}" alt="" />
    
    <div class="body">
  <p class="live">
  <a href="#" class="readmore" >view project &rarr;</a>
  <span>
  <a href="${liveSiteLink}"><img src="./images/external-link.svg" alt=""
  /></a>
  <a href="${githubRepo}"> <img src="./images/iconmonstr-github-1.svg" alt="github profile" />
  </a>
  </span>

  </p>
  <h3 class="title">${title}</h3>
  <br />
  <p>${description}</p>
  <br>
  <p class="langs">${langs.map(lang => `<a>${lang}</a>`).join("")}</p>
  </div>
  </div>`

 }
)

document.querySelector(".cards").innerHTML += projectDomAarray.join("")
callback()
}

function hideElements(){
  document.querySelector(".project").classList.remove('hide')
            document.querySelector("#home").classList.add('hide')
            document.querySelector("#about").classList.add('hide')
            document.querySelector("#contact").classList.add('hide')
            document.querySelector("#work h1").classList.add('hide')
            document.querySelector("#work").style.paddingTop = 0;
            document.querySelectorAll(".cards_item").forEach(project => project.classList.add('hide'))
}

function showElements(){
  document.querySelector(".popup").classList.add('hide')
            
  document.querySelector("#home").classList.remove('hide')
  document.querySelector("#about").classList.remove('hide')
  document.querySelector("#contact").classList.remove('hide')
  document.querySelector("#work h1").classList.remove('hide')
  document.querySelector("#work").style.paddingTop = '100px';
  document.querySelectorAll(".cards_item").forEach(project => project.classList.remove('hide'))
}

setProjects(()=> {
const readmorebtn = document.querySelectorAll(".readmore")

  readmorebtn.forEach(viewbtn => {
        viewbtn.addEventListener("click", ()=> {
            setPopup(jsonProjects[viewbtn.closest(".cards_item").id - 1].image, () => {

              document.querySelector("#hide").addEventListener("click", ()=> {
               showElements()
            })
            })
        
            hideElements()
        })
    })
})


document.querySelectorAll("h1")
  .forEach(h1 => {

h1.innerHTML = h1
  .textContent
  .split("")
  .map(char => {
const newDiv = document.createElement("a")
newDiv.textContent = char
return newDiv.outerHTML
}).join("")
  }

)



