import { blogData } from "./data.js";



document.addEventListener('click', (e)=>{
    if (e.target.closest('.menu-btn')){
        
        toggleDisplay('menu-container')
    }
})

function toggleDisplay(id){
    document.getElementById(id).classList.toggle('hidden')
}