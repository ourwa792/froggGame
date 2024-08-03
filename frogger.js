class Frogger {
    constructor(){
        this.spriteWidth = 250
        this.spriteHeight = 250
        this.width = this.spriteWidth/5  
        this.height = this.spriteHeight/5 
        this.x = canvas.width/2 - this.width/2
        this.y = canvas.height - this.width - 40 // positionof frogg
        this.frameX = 0
        this.frameY = 0
        this.moving = false
    }

    update(){  
        console.log('updated')
        if(keys[38]){   // up
            if(this.moving === false) {
                this.y -= grid  // الحركة رح تتنفذ لمرة واحدة لذلك استخدمنا المصفوفة مع الحدثين كي اب و كي داون مع البوليان موفينغ
                this.moving = true
                this.frameX = 1 // اول سطر بصور الضفدع
                this.frameY = 0 // اتاني عمود بصورة الضفدع
            }
        }
        if (keys[40]) {  // down
            if (this.moving === false && this.y < canvas.height - this.height * 2) { // تاني جزء من الشرط تحديد موضع الضفدع من تحت ومنعو من الاختفاء اذا ضلينا عم نكبس
                this.y += grid
                this.moving = true
                this.frameX = 1  // اول سطر بصور الضفدع
                this.frameY = 3  // تالت عمود
            }
        }
        if (keys[37]) {  // left
            if (this.moving === false && this.x > this.width * 2) {
                this.moving = true
                this.x -= grid
                this.frameX = 1
                this.frameY = 2
            }
        }
        if (keys[39]) {  // right
            if (this.moving === false && this.x < canvas.width - this.width * 2) {
                this.moving = true
                this.x += grid
                this.frameX = 1
                this.frameY = 1
            }
        }
        if (this.y < 0) { // تجاوز الضفدع الكانفس و الفوز
            scored()
        }
    }
    draw(){
        ctx3.fillStyle = 'green'
        ctx3.fillRect(this.x, this.y, this.width, this.height)
        ctx3.drawImage(froggerSprite ,this.frameX*this.spriteWidth ,this.frameY*this.spriteHeight ,this.spriteWidth ,this.spriteHeight ,this.x - 25 ,this.y - 25 ,this.width * 2 ,this.height * 2)
    }
    jump(){
        /* console.log('jump') في مشكلة انها ما عم تشتعل بس اللعبة شغالة
        if (this.moving == false ) {
            this.frameX = 1
        }
        if (this.frameX === 1 ) {
            this.frameX = 0
        } */
    }
}

const frogger = new Frogger()  