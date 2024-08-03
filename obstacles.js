class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.type = type
        this.frameX = 0
        this.frameY = 0
        this.randomize = Math.floor(Math.random() * 30 + 30 )
        this.carType = Math.floor(Math.random() * numberOfCars)  // رقم هشوائي  بين 0 و 2 يلي هو عدد السيارات بلاعمدة مشان تطلع صور عشواائية للسيبارات
    }

    draw(){
        if (this.type === 'turtle') {
            if (frame % this.randomize == 0) {
                if (this.frameX >= 1) 
                this.frameX = 0
                 else this.frameX ++
            }
            
            // ctx1.fillRect(this.x, this.y, this.width, this.height)
            ctx1.drawImage(turtle,this.frameX * 70 ,this.frameY * 70 ,70 ,70 ,this.x ,this.y ,this.width ,this.height )
        } 
        else if (this.type === 'log') { // صورة واحدة احداثياتها معروفة 5 بارامتر
            ctx1.drawImage(logs, this.x, this.y, this.width, this.height)
        }
        else { // بالنسبة للاكس هيي عرض لصورة ضرب 0 او 1 يلي هيي قيم الفريم اكس احداثيات و عرض الصورة بعد التقسيم كالعادة
            ctx2.drawImage(cars,this.frameX * this.width ,this.carType * 80, 160, 80, this.x, this.y, this.width, this.height)
        }
    }
    update(){  
        this.x += this.speed * gameSpeed // السرعة السالبة بتحرك السيارة لليسار
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width
                this.carType = Math.floor(Math.random() * numberOfCars)
            }  // نرجع حركة السيارات تتكرر بلمقارنة مع عرض االكانفس   
        }
        //if (this.speed < 0) 
        else {
            this.frameX = 1 // مشان السيارات يلي بالعكس مايرحعو رجوع
            if (this.x < 0 - this.width) {  // 0 < - 250
                this.x = canvas.width + this.width
                this.carType = Math.floor(Math.random() * numberOfCars)
            }
        }
    }
    
}
function initObstacles() {
    // line 1
    for (let i = 0; i < 2; i++) {
       let x = i * 350  // المسافة بين السيارات اول مرة بيرسم سيارة اكساتها القيمة الابتدائيةلانة اكس 0 تاني مرة بتكون اكس 350*1 يعني المسافة بين السيارة ولبعدها تالت مرة بيتوقف الشرط عند اكس = 2
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'))
    }
    // line 2
    for(let i =0 ; i < 2 ; i++) {
       let x = i * 300
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2,
        grid, -2,'car')) // ضربنا غريد ب 3 مشان نطلع فوق اول سطر ب 80 قيمة غريد
    }
    // line 3
    for (let i = 0; i < 2; i++) {
       let x = 400 * i
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car' ))        
    }
    // line 4
    for (let i = 0; i < 2; i++) {
       let x = 400 * i
       logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log' ))        
    }
    //line 5
    for (let i = 0; i < 3; i++) {
        let x = 200 * i
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle'))
    }
}

initObstacles()

function handleObastacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update()
        carsArray[i].draw()
    }
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update()
        logsArray[i].draw()   
    }
    // collision with cars
    for (let i = 0; i < carsArray.length; i++) {
        if (collision(carsArray[i], frogger)) {
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50)
            resetGame()
        }  
    }
    // collision with logs and turtle
    if (frogger.y < 250 && frogger.y > 100) { // الضفدع عالنهر
        safe = false
        for (let i = 0; i < logsArray.length; i++) {
            if (collision(logsArray[i] , frogger)) {
                frogger.x += logsArray[i].speed  // التحرك على ظهر السلحفاة عند الوقوف عليها
                safe =true
            }
        }
        if (! safe) {
            for (let i = 0; i < 20 ; i++) { //  بدو يرسم العدد لمنحطو عندالمتغير رسم فقاعة لماالضفدع عالنهر
                ripplesArray.unshift(new Particle(frogger.x , frogger.y)) // رسم فقاعة محلاحداثيات الضفدع لما بيوقع عالنهر
            }
            resetGame()
        }
    }
}