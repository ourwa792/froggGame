class Particle{  // للفقاعات و كرات الغبار
    constructor(x, y, radius, directionX, directionY, opacity) {
        this.x = x + 25
        this.y = y + 25
        this.radius = Math.random() * 20 + 1
        this.directionX = Math.random() * 1 - 0.5 // حركة الغبار عشوائية
        this.directionY = Math.random() * 1 - 0.5
        this.opacity = 1
    }
    draw() {
        ctx3.fillStyle = 'rgba(200, 200, 200' + this.opacity + ')'
        ctx3.beginPath()
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx3.fill()
        ctx3.closePath()
    }
    update(){
        this.x += this.directionX 
        this.y += this.directionY 
        if (this.opacity > 0.1) {
            this.opacity -= 0.9
        }
        if (this.radius > 0.15) {
            this.radius -= 0.13
        }
    }
    drawRipple() {
        ctx1.strokeStyle = 'rgba(250, 250, 250' + this.opacity + ')'
        ctx1.beginPath()
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx1.stroke()
        ctx1.closePath()
    }
    ripple(){
        if (this.radius < 50) {
            this.radius += 0.5
            this.x -= 0.03
            this.y -= 0.03
        }
        if (this.opacity > 0) {
            this.opacity -= 0.005
        }
    }
 }

function handleParticles(){
    // dust
for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()
}

if (particlesArray.length > maxParticles) { // اذا عدد الفقاعات اكبر من 300 احذف 30
    for (let i = 0; i < 30; i++) {
       particlesArray.pop()
    }
}

if ((keys[37] || keys[38] || keys[39] || keys[40]) &&  frogger. y > 250 &&
particlesArray.length < maxParticles + 10) { // شرط ع حركة الضفدع و ع انو اكبر من 250 يعني مانو عالنهر رح نحط بلمصفوفة بس 200 كرة غبرة مشان الاداء وبعد هك بيتوقف توليد الغبرة و كراتها 
    for (let i = 0; i < 10; i++) {  // بتشتغل كل 10 اطار فريم
        particlesArray.unshift(new Particle(frogger.x, frogger.y)) // منحط الكرة محل الاولى
    }
}

}

function handleRipples(){
//water ripples
for (let i = 0; i < ripplesArray.length; i++) { // نفس القبلو بس عالفقاعات
    ripplesArray[i].ripple() ;
    ripplesArray[i].drawRipple() ;
}

if (ripplesArray.length > 20) {
   for (let i = 0; i < 5; i++) {
       ripplesArray.pop()
   }
}

if (( keys[37] || keys[38] || keys[39] || keys[40] ) && frogger.y < 250 && frogger.y > 100 ) { // الضفدع عالنهر لانو اقل من250 عكس الشرط السابق
  for (let i = 0; i < 20; i++) {
       ripplesArray.unshift(new Particle(frogger.x, frogger.y))
  }
}

}

