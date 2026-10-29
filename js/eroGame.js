function createArena() {
    const arena = document.querySelector(".ero_arena");

    for (let i = 0; i < 45; i++) {
        const cell = document.createElement("div");
        cell.classList.add("ero_cell")
        arena.appendChild(cell);

    }
}

createArena();


let gorox = document.querySelector(".gorox")
let podsolnux = document.querySelector(".podsolnux")
let orex = document.querySelector(".orex")
let arena = document.querySelector(".ero_arena")
console.log(podsolnux);
console.log(orex);
console.log(gorox);


let selectedPlant = null
let plantCards = [gorox, podsolnux, orex]
let isCliced =

plantCards.forEach((card) => {
    card.addEventListener("click", () => {
        selectedPlant = card.querySelector("img").src
        console.log(selectedPlant);

        plantCards.forEach((item) => item.classList.remove("selected"))
        card.classList.add("selected")

        
    })
})


if(plantCards){
    arena.classList.add("selectedPlant")

}