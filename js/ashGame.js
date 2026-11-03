let gorox = document.querySelector(".gorox")
let podsolnux = document.querySelector(".podsolnux")
let orex = document.querySelector(".orex")
let arena = document.querySelector(".ero_arena")
let selectedPlant = null
let sun_count = document.querySelector(".suns")
let zombies = []
let bullets = []

let user = {
    name: "User",
    bank: 150,
    addBank(amount) {
        this.bank += amount
        sun_count.textContent = `Sun: ${this.bank}`
    }

    ,
    removeBank(amount) {
        this.bank -= amount
        sun_count.textContent = `Sun: ${this.bank}`
    },
    getBank() {
        return this.bank
    }
}
sun_count.textContent = `Sun: ${user.bank}`

let plantCards = [
    {
        name: "gorox",
        cost: 125,
        health: 100,
        plant: gorox,
        img: gorox.querySelector("img").src,

        bullet: {
           img: "/ero-images/bullet.png",

            damage: 10,
        },
        removePlant() {
            this.health = 0
            this.remove()
        },
        startShooting(cell) {
            return setInterval(() => {
                const bullet = document.createElement("img")
                bullet.src = this.bullet.img
                bullet.alt = "Bullet"
                bullet.classList.add("bullet")
                bullet.style.position = "absolute"
                bullet.style.left = `${cell.offsetLeft + cell.offsetWidth}px`
                bullet.style.top = `${cell.offsetTop + cell.offsetHeight / 2 - 10}px`
                bullet.style.width = "40px"
                bullet.style.height = "40px"
                bullet.style.pointerEvents = "none"
                arena.appendChild(bullet)
                bullets.push(bullet)

            }, 2000)
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
        spamSun(cell) {
             return setInterval(() => {
            if (cell.querySelector(".sun")) return

            const sun = document.createElement("img")
            sun.src = "/ero-images/sun.png"
            sun.alt = "Sun"
            sun.classList.add("sun")

            sun.addEventListener("click", (event) => {
                event.stopPropagation()
                user.addBank(25)
                sun.remove()
            })

            cell.appendChild(sun)
            }, 15000)
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
function moveBullets() {
    bullets.forEach((bullet) => {
        const newLeft = parseInt(bullet.style.left) + 5
        bullet.style.left = `${newLeft}px`

        if (newLeft > arena.offsetWidth) {
            bullet.remove()
            bullets = bullets.filter((item) => item !== bullet)
        }
    })
}
setInterval(moveBullets, 50)
function createZombie() {
    const row = Math.floor(Math.random() * 5)

    const zombieimg = document.createElement("img")
    zombieimg.src = "/ero-images/zombie.png"
    zombieimg.alt = "Zombie"
    zombieimg.classList.add("zombie")
    zombieimg.style.position = "absolute"
    zombieimg.row = row
    zombieimg.health = 100

    left = arena.offsetWidth + 80
    zombieimg.style.left = `${left}px`
    zombieimg.style.top = `${row * 100}px`
    zombieimg.style.transition = "left 1s linear"
    zombieimg.style.width = "80px"
    zombieimg.style.height = "80px"

    arena.appendChild(zombieimg)

    zombies.push(zombieimg)
}
function moveZombies() {
    zombies.forEach((zombie) => {
        const currentLeft = parseInt(zombie.style.left)
        const newLeft = currentLeft - 10

        zombie.style.left = `${newLeft}px`
    })
}
// setInterval(createZombie, 10000)
// setInterval(moveZombies, 1000)
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
        selectedPlant = card
        
        plantCards.forEach((item) => item.plant.classList.remove("selected"))
        card.plant.classList.add("selected")
        console.log(selectedPlant);
    })
})

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!selectedPlant) return
        if (cell.querySelector("img")) return
        if (user.bank < selectedPlant.cost) return

        user.removeBank(selectedPlant.cost)
        if (selectedPlant.name === "gorox") {
            selectedPlant.startShooting(cell)
        }
        cell.innerHTML = `<img src="${selectedPlant.img}" alt="plant">`
            if (selectedPlant.name === "podsolnux") {
                selectedPlant.spamSun(cell)
            }

        selectedPlant = null
        plantCards.forEach((item) => item.plant.classList.remove("selected"))

    })
})