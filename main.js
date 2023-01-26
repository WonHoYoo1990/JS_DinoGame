// canvas 태그 사용
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'dino.png';

var img2 = new Image();
img2.src = 'cactus.png';

//공룡 객체(주인공)
var dino = { 
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    
    draw() {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height); //hitbox 그리기
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}

dino.draw(); 

// 장애물 Object
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red ';
        // ctx.fillRect(this.x, this.y, this.width, this.height); // hitbox 그리기
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }
}

// var cactus = new Cactus();  
// cactus.draw();

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;

function 프레임마다실행할거() {
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    // 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 장애물 그리기(설정한 프레임마다)
    if (timer % 200 === 0) {
        var cactus = new Cactus();
        cactus여러개.push(cactus); //array에 넣기
    }

    cactus여러개.forEach((arguments, i, o) => {
        
        //x좌표가 0 미만이면 제거
    	if (arguments.x < 0) {
            o.splice(i,1);
        }

        arguments.x--; // 장애물 왼쪽으로 이동

        충돌하냐(dino, arguments);
        
        arguments.draw(); //array에 있는 장애물 전부 draw() 하기
    })

    if (점프중 == true) {
        dino.y--;
        점프timer++; // 점프시 프레임마다 +1 증가
    }

    if (점프중 == false) {
        if (dino.y < 200) {
            dino.y++;
        }
    }

    if (점프timer > 100) { //점프 100이상일때
        점프중 = false; // 점프 멈추기
        점프timer = 0; // 점프 반복작업하기 위한 초기화
    }

    // 공룡 그리기
    dino.draw();
}

프레임마다실행할거();

// 충돌 확인
function 충돌하냐(dino, cactus) {
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);

    if (x축차이 < 0 && y축차이 < 0) { //장애물과 충돌시
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 정리하기
        cancelAnimationFrame(animation); //애니메이션 중지시키기
    }
}



var 점프중 = false;
document.addEventListener('keydown', function (e) { // SpaceBar 누를 때 이벤트 발생
    if (e.code === 'Space') {
        점프중 = true;
    }
})

// test01
