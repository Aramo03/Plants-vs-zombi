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

            damage: 20,
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
//SPAWNING SUNS/////////////////////////////////////////////////////////////////
function spawnsun() {
    const sun = document.createElement("img")
    sun.src = "/ero-images/sun.png"
    sun.alt = "Sun"
    sun.classList.add("sun")
    sun.style.position = "absolute"
    sun.style.left = `${Math.random() * (arena.offsetWidth - 50)}px`
    sun.style.top = `${Math.random() * (arena.offsetHeight - 50)}px`
    sun.style.width = "50px"
    sun.style.height = "50px"
    sun.style.cursor = "pointer"

    sun.addEventListener("click", (event) => {
        event.stopPropagation()
        user.addBank(25)
        sun.remove()
    })
    arena.appendChild(sun)
}


///////////////////////////////////////////////////////////////////////////////





//garox shooting bullets/////////////////////////////////////////////////////////////////
function moveBullets() {
    bullets.forEach((bullet) => {
        const newLeft = parseInt(bullet.style.left) + 5
        bullet.style.left = `${newLeft}px`
        const target = zombies.find((zombie) => isHit(bullet, zombie))
        if (target) {
            hitZombie(bullet, target)
            return
        }
        if (newLeft > arena.offsetWidth) {
            bullet.remove()
            bullets = bullets.filter((item) => item !== bullet)
        }
    })
}


function isHit(bullet, zombie) {
    const b = bullet.getBoundingClientRect()
    const z = zombie.getBoundingClientRect()

    return b.right >= z.left && b.left <= z.right &&
           b.bottom >= z.top && b.top <= z.bottom
}

function hitZombie(bullet, zombie) {
    bullet.remove()
    bullets = bullets.filter((item) => item !== bullet)

    zombie.health -= 20

    if (zombie.health <= 0) {
        zombie.remove()
        zombies = zombies.filter((item) => item !== zombie)
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////
//ZOMBIES/////////////////////////////////////////////////////////////////////////////////////////
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
        const plantCell = findPlant(zombie)

        if (plantCell) {
            eatPlant(plantCell)
            return
        }

        const currentLeft = parseInt(zombie.style.left)
        const newLeft = currentLeft - 10

        zombie.style.left = `${newLeft}px`
    })
}
function findPlant(zombie) {
    
      return Array.from(cells).find((cell) => {
        const plantImg = cell.querySelector("img")
        return plantImg && isHit(plantImg, zombie)
    })
}
function eatPlant(cell) {
    cell.plantHealth -= 10

    if (cell.plantHealth <= 0) {
        clearInterval(cell.plantTimer)
        cell.innerHTML = ""
    }
}


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
/////////////////////////////////////////////////////////////////////////////////////////////

function createArena() {
    const arena = document.querySelector(".ero_arena");

    for (let i = 0; i < 45; i++) {
        const cell = document.createElement("div");
        cell.classList.add("ero_cell")
        arena.appendChild(cell);

    }
}
createArena()                    
setInterval(spawnsun, 10000)     
setInterval(moveBullets, 50)      
setInterval(createZombie, 5000)    
setInterval(moveZombies, 1000)     


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
        cell.innerHTML = `<img src="${selectedPlant.img}" alt="plant">`
        cell.plantHealth = selectedPlant.health

        if (selectedPlant.name === "gorox") {
            
            cell.plantTimer = selectedPlant.startShooting(cell)
        }
        if (selectedPlant.name === "podsolnux") {
            cell.plantTimer = selectedPlant.spamSun(cell)
        }
            

        selectedPlant = null
        plantCards.forEach((item) => item.plant.classList.remove("selected"))

    })
})