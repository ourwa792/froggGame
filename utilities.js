function animate(){
    ctx1.clearRect(0,0,canvas.width,canvas.height)  // انا ضفتها
    ctx2.clearRect(0,0,canvas.width,canvas.height)  // انا ضفتها
    ctx3.clearRect(0, 0, canvas.width, canvas.height)
    ctx4.clearRect(0, 0, canvas.width, canvas.height)
    ctx5.clearRect(0, 0, canvas.width, canvas.height)

    handleRipples()
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height)
    handleParticles()
    frogger.draw()
    frogger.update()

    handleObastacles() // بعد الضفدع ما ينرسم
    handleScoreBoard()
    ctx4.drawImage(grass, 0, 0)
    frame ++
    
    requestAnimationFrame(animate)
}

animate()

// event listner
window.addEventListener('keydown', function (e) {
    keys = []
    keys[e.keyCode] = true//  ومنخزن كل الكبست بمصفوفة اي كبسة عالكيبورد تنضغط منعطيها ترو
    if(keys[37] || keys[38] || keys[39] || keys[40]) {
        frogger.jump()
    }
})

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode]
    frogger.moving = false

    frogger.frameX = 0
})

function scored() {
    score ++
    gameSpeed +=  0.05
    frogger.x = canvas.width/2 - frogger.width/2
    frogger.y = canvas.height - frogger.width - 40
}

// score
function handleScoreBoard() {
    ctx4.fillStyle = 'black'
    ctx4.strokeStyle = 'black'
    ctx4.font = '15px Verdana'
    ctx4.strokeText('Score', 265, 15)
    ctx4.font = '60px Verdana'
    ctx4.fillText(score, 270, 65)
    ctx4.font = '15px Verdana'
    ctx4.strokeText('Collision :'+ collisionsCount, 10, 175)
    ctx4.strokeText('GameSpeed :'+ gameSpeed.toFixed(1), 10, 195)
}
// collision
function collision(first, seconde) {
    return !( ( first.x > seconde.x + seconde.width ||
                first.x + first.width < seconde.x ||
                first.y > seconde.y + seconde.height ||
                first.y + first.height < seconde.y
        ) 
    )
}

function resetGame() {
    frogger.x = canvas.width/2 - frogger.width/2
    frogger.y = canvas.height - frogger.width - 40
    collisionsCount ++
    score = 0
    gameSpeed = 1
}