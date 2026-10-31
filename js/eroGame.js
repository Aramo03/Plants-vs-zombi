let gorox = document.querySelector(".gorox")
let podsolnux = document.querySelector(".podsolnux")
let orex = document.querySelector(".orex")
let arena = document.querySelector(".ero_arena")
let selectedPlant = null

let user = {
    name: "User",
    bank: 150,
    addBank(amount) {
        this.bank += amount
    },
    removeBank(amount) {
        this.bank -= amount
    },
    getBank() {
        return this.bank
    }
}

let plantCards = [
    {
        name: "gorox",
        cost: 125,
        health: 100,
        plant: gorox,
        img: gorox.querySelector("img").src,

        bullet: {
            img: gorox.querySelector("img").src,
            damage: 10,
        },
        removePlant() {
            this.health = 0
            this.remove()
        },
        attackToZombie(zombie) {
            zombie.health -= this.bullet.damage
            if (zombie.health <= 0) {
                zombie.removeZombie()
            }
            return zombie.health
        }
    },
    {
        name: "podsolnux",
        cost: 25,
        health: 100,
        img: podsolnux.querySelector("img").src,
        plant: podsolnux,
        removePlant() {
            this.health = 0
            this.remove()
        },
        spamSun() {
            setInterval(() => {
                user.addBank(25)
                console.log(user.bank);
            }, 10000)
        }
    },
    {
        name: "orex",
        cost: 75,
        health: 300,
        img: orex.querySelector("img").src,
        plant: orex,
        removePlant() {
            this.health = 0
            this.remove()
        }
    }
]

let zombie = {
    health: 100,
    attack: 10,
    removeZombie() {
        this.health = 0
        this.remove()
    },
    attackToPlant(plant) {
        setInterval(() => {
            plant.health -= this.attack
            if (plant.health <= 0) {
                plant.removePlant()
            }
        }, 1000)
        return plant.health
    },
}

function createArena() {
    const arena = document.querySelector(".ero_arena");

    for (let i = 0; i < 45; i++) {
        const cell = document.createElement("div");
        cell.classList.add("ero_cell")
        arena.appendChild(cell);

    }
}
createArena();

let cells = document.querySelectorAll(".ero_cell")



// plantCards.forEach((card) => {
//     card.addEventListener("click", () => {
//         selectedPlant = card.querySelector("img").src
//         console.log(selectedPlant);

//         plantCards.forEach((item) => item.classList.remove("selected"))
//         card.classList.add("selected")


//     })
// })
plantCards.forEach((card) => {
    card.plant.addEventListener("click", () => {
        selectedPlant = card.img
        plantCards.forEach((item) => item.plant.classList.remove("selected"))
        card.plant.classList.add("selected")
        console.log(selectedPlant);
    })
})

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!selectedPlant) return
        if (cell.querySelector("img")) return

        cell.innerHTML = `<img src="${selectedPlant}" alt="plant">`
        selectedPlant = null
        plantCards.forEach((item) => item.plant.classList.remove("selected"))

    })
})
