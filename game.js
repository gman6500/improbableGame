var DEBUG=false;


(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var jumpSnd= new Audio("sound/jump.wav");
var jumpSndAlt= new Audio("sound/jump.wav");
var music= new Audio("sound/music.wav");
var death=new Audio("sound/death.wav"),death2=new Audio("sound/death.wav"),death3=new Audio("sound/death.wav");

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1120,
    height = 590,
    player = {
        x: width / 10,
        y: height - 15,
        width: 10,
        height: 10,
        speed: 4,
        velX: 0,
        velY: 0,
        startX: width/2,
        startY: height - 55,
        level:1,
        checkpoint:1,
        jumping: false,
        doubleJump:true,
        grounded: false,
        deaths:0,
        debug:false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;
var mute=true;
var boxes = [];
var currentLevelBlocks=[];
var lava=[];
var currentLevelLava=[];
var goal=[];
var jumpPow=[]; 
var currentLevelJumpPow=[];
var button=[];
var currentLevelButton=[];
var storyText=["blocker","Oh, another one, let's see how it does","Huh, at least it's better than 10% of the others","It's progress is steady, Personal note: Keep an eye on this one","Good. It wants to survive. Let's see how badly it does.","Let's give you a little challenge","Let's see how you'll handle this one"]
var startPoint=[
    {x:width/10,y:height-15,needsSpawn:true},// level 1
    {x:width/10,y:height-15,needsSpawn:true},// level 12
    {x:465,y:480,needsSpawn:true},// level 3
    {x:500,y:100,needsSpawn:true},// level 4
    {x:width/10,y:height-15,needsSpawn:true},// level 5
    {x:390,y:565,needsSpawn:true},// level 6
    {x:540,y:45,needsSpawn:true},// level 7
    {x:520,y:560,needsSpawn:true},// level 8
    {x:930,y:555,needsSpawn:true},// level 9
    {x:50,y:500,needsSpawn:true},//level 10
    {x:15,y:15,needsSpawn:true},//level 11
    {x:1075,y:510,needsSpawn:true},//level 12
    {x:1075,y:510,needsSpawn:true},//level 13
    {x:1075,y:510,needsSpawn:true},//level 14
    {x:1075,y:510,needsSpawn:true},//level 15
    {x:150,y:150,needSpawn:true},//level 16
    {x:1050,y:550,needSpawn:true},//Level 17
    {x:550,y:550,needSpawn:true}
    ];
var ghosts=[];

// dimensions
// Walls
boxes.push({
    x: 0,
    y: 0,
    width: 15,
    height: height,
    level:"all"
});
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50,
    level:"all"
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height,
    level:"all"
});
boxes.push({
    x: 0,
    y: -10,
    width: width,
    height: 15,
    level:"all"
});
//platforms
//level 1 start
//level 1 end

//level 2 start
boxes.push({
    x: 300,
    y: 320,
    width: 15,
    height: 100,
    level:2
});
boxes.push({
    x: 420,
    y: 500,
    width: 100,
    height: 15,
    level:2
});
//level 2 end
//level 3 start
boxes.push({
    x: 420,
    y: 500,
    width: 100,
    height: 15,
    level:3
});
boxes.push({
    x: 520,
    y: 210,
    width: 15,
    height: 300,
    level:3
});
boxes.push({
    x: 410,
    y: 210,
    width: 15,
    height: 300,
    level:3
});
boxes.push({
    x: 490,
    y: 200,
    width: 100,
    height: 15,
    level:3
});
//level 3 end
//level 4 start
boxes.push({
    x: 280,
    y: 460,
    width: 75,
    height: 15,
    level:4
});
boxes.push({
    x: 650,
    y: 460,
    width: 75,
    height: 15,
    level:4
});
//level 4 end
//level 5 start
boxes.push({
    x: 120,
    y: 500,
    width: 100,
    height: 15,
    level:5
});
boxes.push({
    x: 370,
    y: 400,
    width: 80,
    height: 30,
    level:5
});
boxes.push({
    x: 905,
    y: 190,
    width: 20,
    height: 100,
    level:5
});
boxes.push({
    x: 620,
    y: 300,
    width: 80,
    height: 35,
    level:5
});
boxes.push({
    x: 720,
    y: 140,
    width: 80,
    height: 15,
    level:5
})
boxes.push({
    x: 920,
    y: 190,
    width: 80,
    height: 15,
    level:5
});
boxes.push({
    x: 460,
    y: 140,
    width: 80,
    height: 15,
    level:5
});
boxes.push({
    x: 300,
    y: 190,
    width: 15,
    height: 80,
    level:5
})
boxes.push({
    x: 100,
    y: 190,
    width: 100,
    height: 15,
    level:5
});
//level 5 end
//level 6 start
boxes.push({
    x: 900,
    y: 400,
    width: 100,
    height: 15,
    level:6
});
boxes.push({
    x: 950,
    y: 260,
    width: 15,
    height: 100,
    level:6
});
boxes.push({
    x: 800,
    y: 400,
    width: 100,
    height: 15,
    level:6
});
boxes.push({
    x: 480,
    y: 400,
    width: 100,
    height: 15,
    level:6
});
boxes.push({
    x: 480,
    y: 200,
    width: 15,
    height: 100,
    level:6
});
boxes.push({
    x: 590,
    y: 200,
    width: 100,
    height: 15,
    level:6
});
boxes.push({
    x: 890,
    y: 180,
    width: 100,
    height: 15,
    level:6
});
boxes.push({
    x: 530,
    y: 70,
    width: 500,
    height: 15,
    level:6
});
//level 6 end
//Level 7 start
boxes.push({
    x: 530,
    y: 70,
    width: 75,
    height: 15,
    level:7
});
boxes.push({
    x: 490,
    y: 0,
    width: 15,
    height: 595,
    level:7
});
boxes.push({
    x: 590,
    y: 0,
    width: 15,
    height: 595,
    level:7
});
//Level 7 end
//Level 8 Start
boxes.push({
    x: 140,
    y: 100,
    width: 15,
    height: 395,
    level:8
});
boxes.push({
    x: 140,
    y: 100,
    width: 120,
    height: 15,
    level:8
});
boxes.push({
    x: 290,
    y: 0,
    width: 15,
    height: 430,
    level:8
});
boxes.push({
    x: 140,
    y: 480,
    width: 240,
    height: 15,
    level:8
});
boxes.push({
    x: 340,
    y: 480,
    width: 240,
    height: 15,
    level:8
});
boxes.push({
    x: 760,
    y: 350,
    width: 15,
    height: 105,
    level:8
});
//Level 8 end
//level 10
boxes.push({x:15,y:524,width:130,height:90,level:10})
boxes.push({x:224,y:511,width:15,height:90,level:10})
boxes.push({x:334,y:461,width:10,height:140,level:10})
boxes.push({x:427,y:452,width:10,height:150,level:10})
boxes.push({x:505,y:420,width:5,height:180,level:10})
boxes.push({x:580,y:412,width:10,height:200,level:10})
boxes.push({x:652,y:326,width:5,height:280,level:10})
boxes.push({x:767,y:284,width:5,height:320,level:10})
boxes.push({x:877,y:263,width:15,height:350,level:10})
boxes.push({x:1054,y:284,width:35,height:325,level:10})

//level 11
boxes.push({level:11,x:15,y:28,width:16,height:5})
boxes.push({level:11,x:53,y:12,width:5,height:546})
boxes.push({level:11,x:150,y:125,width:40,height:475})
boxes.push({level:11,x:150,y:118,width:80,height:11})
boxes.push({level:11,x:249,y:14,width:8,height:544})
boxes.push({level:11,x:417,y:527,width:5,height:63})
boxes.push({level:11,x:417,y:529,width:7,height:63})

//level 12
boxes.push({level:12,x:1000,y:540,width:110,height:25})
boxes.push({level:12,x:1000,y:150,width:15,height:440})
boxes.push({level:12,x:900,y:450,width:15,height:100})
boxes.push({level:12,x:860,y:5,width:15,height:420})
boxes.push({level:12,x:750,y:50,width:15,height:540})
boxes.push({level:12,x:640,y:440,width:15,height:100})
boxes.push({level:12,x:590,y:5,width:15,height:400})
boxes.push({level:12,x:330,y:300,width:110,height:15})
//level 13
boxes.push({level:13,x:1000,y:540,width:110,height:25})
boxes.push({level:13,x:1000,y:150,width:15,height:440})
boxes.push({level:13,x:900,y:450,width:15,height:100})
boxes.push({level:13,x:860,y:5,width:15,height:420})
boxes.push({level:13,x:750,y:50,width:15,height:540})
boxes.push({level:13,x:640,y:440,width:15,height:100})
boxes.push({level:13,x:590,y:5,width:15,height:400})
boxes.push({level:13,x:330,y:300,width:110,height:15})
//level 14
boxes.push({level:14,x:1000,y:540,width:110,height:25})
boxes.push({level:14,x:1000,y:150,width:15,height:440})
boxes.push({level:14,x:900,y:450,width:15,height:100})
boxes.push({level:14,x:860,y:5,width:15,height:420})
boxes.push({level:14,x:750,y:50,width:15,height:540})
boxes.push({level:14,x:640,y:440,width:15,height:100})
boxes.push({level:14,x:590,y:5,width:15,height:400})
boxes.push({level:14,x:330,y:300,width:110,height:15})
//level 15
boxes.push({level:15,x:1000,y:540,width:110,height:25})
boxes.push({level:15,x:1000,y:150,width:15,height:440})
boxes.push({level:15,x:900,y:450,width:15,height:100})
boxes.push({level:15,x:860,y:5,width:15,height:420})
boxes.push({level:15,x:750,y:100,width:15,height:540})
boxes.push({level:15,x:640,y:440,width:15,height:100})
boxes.push({level:15,x:590,y:5,width:15,height:400})
boxes.push({level:15,x:330,y:300,width:110,height:15})
//Level 16
boxes.push({level:16,x:100,y:200,width:110,height:15})
boxes.push({level:16,x:400,y:100,width:15,height:155})
boxes.push({level:16,x:570,y:300,width:110,height:15})
boxes.push({level:16,x:850,y:200,width:15,height:110})
boxes.push({level:16,x:950,y:50,width:15,height:110})
//Level 17
boxes.push({level:17,x:950,y:100,width:15,height:900})
boxes.push({level:17,x:950,y:100,width:75,height:15})
boxes.push({level:17,x:800,y:0,width:15,height:500})
//Level 18

//goal
//level 1
goal.push({
    x: 1020,
    y: 500,
    width: 10,
    height: 10,
    level:1
});
//level 2
goal.push({
    x: 420,
    y: 280,
    width: 10,
    height: 10,
    level:2
});
//level 3
goal.push({
    x: 540,
    y: 170,
    width: 10,
    height: 10,
    level:3
});
//level 4
goal.push({
    x: 900,
    y: 500,
    width: 10,
    height: 10,
    level:4
});
//level 5
goal.push({
    x:150,
    y:140,
    width:10,
    height:10,
    level:5
});
//Level 6
goal.push({
    x:570,
    y:40,
    width:10,
    height:10,
    level:6
});
//level 7
goal.push({
    x:565,
    y:565,
    width:10,
    height:10,
    level:7
});
//level 8
goal.push({
    x:850,
    y:450,
    width:15,
    height:15,
    level:8
});
//level 9
goal.push({
    x:100,
    y:550,
    width:10,
    height:10,
    level:9
});
//level 10
goal.push({x:1064,y:264,width:10,height:10,level:10})
//level 11
goal.push({x:521,y:537,width:10,height:10,level:11})
// level 12
goal.push({x:380,y:270,width:10,height:10,level:12})
//level 13
goal.push({x:380,y:270,width:10,height:10,level:13})
//level 14
goal.push({x:380,y:270,width:10,height:10,level:14})
//level 15
goal.push({x:380,y:270,width:10,height:10,level:15})
//Level 16
goal.push({x:1080,y:550,width:10,height:10,level:16})
//Level 17
goal.push({x:500,y:550,width:10,height:10,level:17})
//Level 18

//Jump Power
//level 3
jumpPow.push({
    x:460,
    y:320,
    width:10,
    height:10,
    level:3
});
//level 8
jumpPow.push({
    x:60,
    y:420,
    width:10,
    height:10,
    level:8
});
jumpPow.push({
    x:60,
    y:270,
    width:10,
    height:10,
    level:8
});
jumpPow.push({
    x:60,
    y:170,
    width:10,
    height:10,
    level:8,
});
//level 11
jumpPow.push({x:99,y:512,width:10,height:10,level:11})
jumpPow.push({x:97,y:445,width:10,height:10,level:11})
jumpPow.push({x:98,y:392,width:10,height:10,level:11})
jumpPow.push({x:98,y:329,width:10,height:10,level:11})
jumpPow.push({x:98,y:274,width:10,height:10,level:11})
jumpPow.push({x:102,y:216,width:10,height:10,level:11})
jumpPow.push({x:102,y:170,width:10,height:10,level:11})
jumpPow.push({x:102,y:118,width:10,height:10,level:11})
//level 12
jumpPow.push({x:1060,y:370,width:10,height:10,level:12})
jumpPow.push({x:1060,y:270,width:10,height:10,level:12})
jumpPow.push({x:1060,y:170,width:10,height:10,level:12})
jumpPow.push({x:890,y:170,width:10,height:10,level:12})
jumpPow.push({x:840,y:430,width:10,height:10,level:12})
jumpPow.push({x:810,y:320,width:10,height:10,level:12})
jumpPow.push({x:810,y:220,width:10,height:10,level:12})
jumpPow.push({x:810,y:120,width:10,height:10,level:12})
jumpPow.push({x:640,y:170,width:10,height:10,level:12})
jumpPow.push({x:580,y:405,width:10,height:10,level:12})
jumpPow.push({x:580,y:330,width:10,height:10,level:12})
//level 13
jumpPow.push({x:1060,y:370,width:10,height:10,level:13})
jumpPow.push({x:1060,y:270,width:10,height:10,level:13})
jumpPow.push({x:1060,y:170,width:10,height:10,level:13})
jumpPow.push({x:890,y:170,width:10,height:10,level:13})
jumpPow.push({x:840,y:430,width:10,height:10,level:13})
jumpPow.push({x:810,y:320,width:10,height:10,level:13})
jumpPow.push({x:810,y:220,width:10,height:10,level:13})
jumpPow.push({x:810,y:120,width:10,height:10,level:13})
jumpPow.push({x:640,y:170,width:10,height:10,level:13})
jumpPow.push({x:580,y:405,width:10,height:10,level:13})
jumpPow.push({x:580,y:330,width:10,height:10,level:13})
//level 14
jumpPow.push({x:1060,y:370,width:10,height:10,level:14})
jumpPow.push({x:1060,y:270,width:10,height:10,level:14})
jumpPow.push({x:1060,y:170,width:10,height:10,level:14})
jumpPow.push({x:890,y:170,width:10,height:10,level:14})
jumpPow.push({x:840,y:430,width:10,height:10,level:14})
jumpPow.push({x:810,y:320,width:10,height:10,level:14})
jumpPow.push({x:810,y:220,width:10,height:10,level:14})
jumpPow.push({x:810,y:120,width:10,height:10,level:14})
jumpPow.push({x:640,y:170,width:10,height:10,level:14})
jumpPow.push({x:580,y:405,width:10,height:10,level:14})
jumpPow.push({x:580,y:330,width:10,height:10,level:14})
//level 15
jumpPow.push({x:1060,y:370,width:10,height:10,level:15})
jumpPow.push({x:1060,y:270,width:10,height:10,level:15})
jumpPow.push({x:1060,y:170,width:10,height:10,level:15})
jumpPow.push({x:890,y:170,width:10,height:10,level:15})
jumpPow.push({x:850,y:430,width:10,height:10,level:15})
jumpPow.push({x:810,y:320,width:10,height:10,level:15})
jumpPow.push({x:810,y:220,width:10,height:10,level:15})
// jumpPow.push({x:810,y:60,width:10,height:10,level:15})
jumpPow.push({x:810,y:120,width:10,height:10,level:15})
jumpPow.push({x:640,y:170,width:10,height:10,level:15})
jumpPow.push({x:580,y:405,width:10,height:10,level:15})
jumpPow.push({x:580,y:330,width:10,height:10,level:15})
//Level 16
jumpPow.push({x:420,y:50,width:10,height:10,level:16})
jumpPow.push({x:855,y:140,width:10,height:10,level:16})
jumpPow.push({x:910,y:140,width:10,height:10,level:16})
//Level 17
jumpPow.push({x:1030,y:390,width:10,height:10,level:17})
jumpPow.push({x:1030,y:290,width:10,height:10,level:17})
jumpPow.push({x:1030,y:190,width:10,height:10,level:17})
//Level 18

//lava
//level 3
lava.push({
    x: 10,
    y: height-20,
    width: width-20,
    height: 30,
    level:3
})
//level 4
lava.push({
    x: 300,
    y: 500,
    width: 400,
    height: 30,
    level:4
});
//level 6
lava.push({
    x: 620,
    y: 420,
    width: 160,
    height: 10,
    level:6
});
lava.push({
    x: 1000,
    y: 405,
    width: 40,
    height: 40,
    level:6
});
lava.push({
    x: 890,
    y: 240,
    width: 10,
    height: 175,
    level:6
});
lava.push({
    x: 840,
    y: 195,
    width: 260,
    height: 10,
    level:6
});
//Level 7
lava.push({
    x: 540,
    y: 205,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 505,
    y: 135,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 570,
    y: 135,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 505,
    y: 295,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 570,
    y: 295,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 540,
    y: 355,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 505,
    y: 425,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 570,
    y: 425,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 540,
    y: 475,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 505,
    y: 535,
    width: 20,
    height: 10,
    level:7
});
lava.push({
    x: 570,
    y: 535,
    width: 20,
    height: 10,
    level:7
});
//level 8
lava.push({
    x: 270,
    y: 155,
    width: 20,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 155,
    width: 70,
    height: 10,
    level:8
});
lava.push({
    x: 250,
    y: 185,
    width: 40,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 185,
    width: 50,
    height: 10,
    level:8
});
lava.push({
    x: 230,
    y: 215,
    width: 60,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 215,
    width: 30,
    height: 10,
    level:8
});
lava.push({
    x: 220,
    y: 245,
    width: 70,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 245,
    width: 10,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 275,
    width: 10,
    height: 10,
    level:8
});
lava.push({
    x: 210,
    y: 275,
    width: 80,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 305,
    width: 25,
    height: 10,
    level:8
});
lava.push({
    x: 215,
    y: 305,
    width: 75,
    height: 10,
    level:8
});
lava.push({
    x: 155,
    y: 335,
    width: 35,
    height: 10,
    level:8
});
lava.push({
    x: 240,
    y: 335,
    width: 50,
    height: 10,
    level:8
});
lava.push({
    x: 580,
    y: 480,
    width: 530,
    height: 15,
    level:8
});
//level 9
lava.push({
    x: 550,
    y: 0,
    width: 15,
    height: 589,
    level:9,
    tag:"alpha"
});
//level 10
lava.push({x:144,y:590,width:909,height:4,level:10})
lava.push({x:144,y:525,width:908,height:34,level:10})
lava.push({x:1021,y:295,width:90,height:16,level:10})
lava.push({x:859,y:307,width:50,height:30,level:10})
lava.push({x:748,y:336,width:45,height:24,level:10})
lava.push({x:634,y:372,width:40,height:19,level:10})
lava.push({x:562,y:436,width:45,height:28,level:10})
lava.push({x:486,y:463,width:40,height:30,level:10})
lava.push({x:414,y:482,width:35,height:25,level:10})
lava.push({x:320,y:490,width:40,height:28,level:10})

//level 11
lava.push({level:11,x:44,y:70,width:9,height:5})
lava.push({level:11,x:15,y:97,width:13,height:5})
lava.push({level:11,x:37,y:125,width:15,height:5})
lava.push({level:11,x:15,y:160,width:14,height:5})
lava.push({level:11,x:40,y:191,width:13,height:5})
lava.push({level:11,x:16,y:219,width:13,height:10})
lava.push({level:11,x:43,y:251,width:7,height:5})
lava.push({level:11,x:17,y:281,width:17,height:7})
lava.push({level:11,x:41,y:323,width:7,height:3})
lava.push({level:11,x:14,y:351,width:13,height:9})
lava.push({level:11,x:33,y:390,width:18,height:3})
lava.push({level:11,x:17,y:413,width:7,height:15})
lava.push({level:11,x:42,y:445,width:11,height:8})
lava.push({level:11,x:13,y:478,width:14,height:9})
lava.push({level:11,x:41,y:505,width:11,height:7})
lava.push({level:11,x:15,y:539,width:12,height:8})
lava.push({level:11,x:105,y:555,width:5,height:10})
lava.push({level:11,x:105,y:245,width:5,height:10})
lava.push({level:11,x:105,y:190,width:5,height:10})
lava.push({level:11,x:105,y:145,width:5,height:10})
lava.push({level:11,x:105,y:305,width:5,height:10})
lava.push({level:11,x:105,y:360,width:5,height:10})
lava.push({level:11,x:105,y:420,width:5,height:10})
lava.push({level:11,x:105,y:480,width:5,height:10})
lava.push({level:11,x:190,y:162,width:18,height:14})
lava.push({level:11,x:230,y:185,width:19,height:24})
lava.push({level:11,x:190,y:244,width:12,height:8})
lava.push({level:11,x:230,y:282,width:18,height:17})
lava.push({level:11,x:190,y:324,width:18,height:16})
lava.push({level:11,x:230,y:363,width:19,height:18})
lava.push({level:11,x:190,y:418,width:22,height:5})
lava.push({level:11,x:230,y:449,width:15,height:18})
lava.push({level:11,x:190,y:497,width:22,height:11})
lava.push({level:11,x:230,y:550,width:16,height:5})
lava.push({level:11,x:190,y:581,width:19,height:12})
lava.push({level:11,x:290,y:534,width:130,height:60})
// level 12
lava.push({level:12,x:0,y:height-15,width:width,height:60})
//level 13
lava.push({level:13,x:0,y:height-15,width:width,height:60})
lava.push({level:13,x:1000,y:150,width:15,height:15})
lava.push({level:13,x:900,y:450,width:15,height:15})
lava.push({level:13,x:750,y:50,width:15,height:15})
lava.push({level:13,x:640,y:440,width:15,height:15})
//level 14
lava.push({level:14,x:0,y:height-15,width:width,height:60})
lava.push({level:14,x:1000,y:150,width:15,height:15})
lava.push({level:14,x:900,y:450,width:15,height:15})
lava.push({level:14,x:915,y:450,width:10,height:115})
lava.push({level:14,x:900,y:550,width:15,height:15})
lava.push({level:14,x:750,y:50,width:15,height:15})
lava.push({level:14,x:640,y:440,width:15,height:15})
lava.push({level:14,x:655,y:440,width:10,height:115})
lava.push({level:14,x:640,y:540,width:15,height:15})
//level 15
lava.push({level:15,x:0,y:height-15,width:width,height:60})
lava.push({level:15,x:1105,y:440,width:10,height:20})
lava.push({level:15,x:1010,y:300,width:10,height:20})
lava.push({level:15,x:1105,y:200,width:10,height:20})
lava.push({level:15,x:1000,y:150,width:15,height:15})
lava.push({level:15,x:1015,y:150,width:5,height:50})
lava.push({level:15,x:995,y:150,width:5,height:50})
lava.push({level:15,x:870,y:300,width:10,height:20})
lava.push({level:15,x:900,y:445,width:15,height:15})
lava.push({level:15,x:915,y:445,width:10,height:120})
lava.push({level:15,x:900,y:550,width:15,height:15})
lava.push({level:15,x:760,y:350,width:10,height:20})
lava.push({level:15,x:760,y:250,width:10,height:20})
lava.push({level:15,x:760,y:150,width:10,height:20})
lava.push({level:15,x:600,y:270,width:10,height:20})
lava.push({level:15,x:750,y:95,width:15,height:15})
lava.push({level:15,x:640,y:435,width:15,height:15})
lava.push({level:15,x:655,y:435,width:10,height:120})
lava.push({level:15,x:640,y:540,width:15,height:15})
//Level 16
lava.push({level:16,x:0,y:300,width:570,height:15})
lava.push({level:16,x:400,y:250,width:15,height:50})
lava.push({level:16,x:500,y:0,width:15,height:100})
lava.push({level:16,x:950,y:160,width:15,height:700})
lava.push({level:16,x:850,y:200,width:15,height:15})
lava.push({level:16,x:0,y:575,width:960,height:15})
//Level 17
lava.push({level:17,x:1020,y:70,width:15,height:45})
lava.push({level:17,x:800,y:100,width:90,height:15})
lava.push({level:17,x:800,y:130,width:70,height:15})
lava.push({level:17,x:800,y:160,width:50,height:15})
lava.push({level:17,x:800,y:190,width:30,height:15})
lava.push({level:17,x:930,y:130,width:20,height:15})
lava.push({level:17,x:910,y:160,width:40,height:15})
lava.push({level:17,x:890,y:190,width:60,height:15})
lava.push({level:17,x:870,y:220,width:80,height:15})
lava.push({level:17,x:850,y:250,width:100,height:15})
lava.push({level:17,x:870,y:280,width:80,height:15})
lava.push({level:17,x:890,y:310,width:60,height:15})
lava.push({level:17,x:910,y:340,width:40,height:15})
lava.push({level:17,x:930,y:370,width:20,height:15})
lava.push({level:17,x:800,y:370,width:80,height:15})
lava.push({level:17,x:800,y:340,width:60,height:15})
lava.push({level:17,x:800,y:310,width:40,height:15})
lava.push({level:17,x:800,y:280,width:20,height:15})
//Level 18

//Buttons
//Level 9
button.push({
    x:990,
    y:500,
    width:15,
    height:15,
    level:9,
    tag:"alpha",
    command:"destroy",
    amount:null
});
canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[38] || keys[32]||keys[87]) {
        // up arrow or space
        
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
            if(isPlaying(jumpSnd)&&!mute){
                jumpSndAlt.play();
            }else if(!mute){
                jumpSnd.play();
            }
        }
        
    }
    if (keys[39]||keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]||keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
    player.velY += gravity;
 
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.rect(0,0,width,height);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "white";
    player.grounded = false;
    for (var i = 0; i < currentLevelBlocks.length; i++) {
        if(currentLevelBlocks[i].level===player.level||currentLevelBlocks[i].level==="all"){
            ctx.rect(currentLevelBlocks[i].x, currentLevelBlocks[i].y, currentLevelBlocks[i].width, currentLevelBlocks[i].height);
            var dir = colCheck(player, currentLevelBlocks[i]);
            if (dir === "l" || dir === "r") {
                player.velX = 0;
                player.jumping = false;
                if(player.doubleJump){
                    player.grounded=true;
                    if (keys[38] || keys[32]||keys[87]) {
                        player.jumping = true;
                        player.grounded = false;
                        player.doubleJump=false;
                        player.velY = - player.speed * 2;
                        if(dir==="l"){
                            player.velX=player.speed* 2;
                            if(isPlaying(jumpSnd)&&!mute){
                                jumpSndAlt.play();
                            }else if(!mute){
                                jumpSnd.play();
                            }
                        }else{
                            player.velX=player.speed* -2;
                            if(isPlaying(jumpSnd)&&!mute){
                                jumpSndAlt.play();
                            }else if(!mute){
                                jumpSnd.play();
                            }
                        }
                    }
                }else{
                    player.grounded=false;
                }
            } else if (dir === "b") {
                player.grounded = true;
                player.jumping = false;
                player.doubleJump=true;
            } else if (dir === "t") {
                player.velY *= -0.5;
            }
        }
 
    }
    ctx.fill();
    

    ctx.beginPath();
    ctx.fillStyle="red";
    for(var i=0;i<currentLevelLava.length; i++){
        if(currentLevelLava[i].level===player.level){
            ctx.rect(currentLevelLava[i].x, currentLevelLava[i].y, currentLevelLava[i].width, currentLevelLava[i].height);
            var dir=colCheck(player,currentLevelLava[i]);
            if(dir==="l"||dir==="r"||dir==="b"||dir==="t"){
                reset();
                typeStory(player.level);
            }
        }
    }
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="green";
    for(var i=0;i<goal.length; i++){
        if(goal[i].level===player.level){
            ctx.rect(goal[i].x, goal[i].y, goal[i].width, goal[i].height);
            var dir=colCheck(player,goal[i]);
            if(dir==="l"||dir==="r"||dir==="b"||dir==="t"){
                player.level++;
                loadLevel(player.level)
                typeStory(player.level)
            }
        }
    }
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="yellow";
    for(var i=0; i<currentLevelJumpPow.length;i++){
        if(currentLevelJumpPow[i].level===player.level){
            ctx.rect(currentLevelJumpPow[i].x, currentLevelJumpPow[i].y,currentLevelJumpPow[i].width,currentLevelJumpPow[i].height);
            var dir=colCheck(player,currentLevelJumpPow[i]);
            if(dir==="l"||dir==="r"||dir==="b"||dir==="t"){
                player.doubleJump=true
                currentLevelJumpPow[i].level*=-1;
            }
        }
    }
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="orange";
//     console.log("about to render buttons")
    for(var i=0; i<currentLevelButton.length;i++){
//         console.log(i)
//         console.log(currentLevelButton[i])
//         console.log("drawing button")
        if(currentLevelButton[i].level===player.level){
            ctx.rect(currentLevelButton[i].x,currentLevelButton[i].y,currentLevelButton[i].width,currentLevelButton[i].height);
//             console.log(currentLevelButton[i])
            var dir=colCheck(player,currentLevelButton[i]);
            if(dir==="l"||dir==="r"||dir==="b"||dir==="t"){
                console.log("button hit");
                buttonCommand(currentLevelButton[i]);
                
            }
        }
    }
//     console.log("done rendering buttons")
    ctx.fill()
    if(player.grounded){
         player.velY = 0;
    }
 
    player.x += player.velX;
    player.y += player.velY;
    ctx.beginPath();
    ctx.fillStyle="blue"
    ctx.rect(player.x,player.y,player.width,player.height)
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle="pink";
    ctx.globalAlpha=0.5;
    for(i=0;i<ghosts.length;i++){
        ctx.fillRect(ghosts[i].x,ghosts[i].y,ghosts[i].width,ghosts[i].height);
    }
    ctx.globalAlpha=1;
    ctx.fill();
    ctx.globalAlpha=0.4;
    ctx.font="64px myFont";
    ctx.fillStyle="white";
    ctx.fillText(player.deaths,width/2,height/2);
    ctx.font="36px myFont";
    ctx.fillText("Level "+player.level,15,35);
    ctx.globalAlpha=1;
    requestAnimationFrame(update);
}
 
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
//     console.log(colDir)
    return colDir;
}
function reset(){
    ghosts.push({
        x:player.x,
        y:player.y,
        width:player.width,
        height:player.height
    });
    
    player.x=startPoint[player.level-1].x;
    player.y=startPoint[player.level-1].y;
    
    player.velX=0;
    player.velY=0;
    if(!isPlaying(death)&&!mute){
        death.play()
    }else if(!isPlaying(death2)&&!mute){
        death2.play()
    }else if(!isPlaying(death3&&!mute)){
        death3.play()
    }
    player.deaths++;
    document.cookie="death="+player.deaths;
    for(var i=0;i<jumpPow.length;i++){
        jumpPow[i].level=Math.abs(jumpPow[i].level);
    }
}
function loadLevel(levelNum){
    document.cookie="level="+player.level;
    if(startPoint[player.level-1].needsSpawn){
        player.x=startPoint[player.level-1].x;
        player.y=startPoint[player.level-1].y;
    }
    
    ghosts.splice(0,ghosts.length);
    currentLevelBlocks.splice(0,currentLevelBlocks.length);
    for(var i=0; i<boxes.length;i++){
//         console.log("Checking if inside level")
        if(boxes[i].level===levelNum || boxes[i].level==="all"){
//             console.log("Is inside current level")
            currentLevelBlocks.push(boxes[i]);
        }
    }
    currentLevelBlocks.push({tag:"holder"});
    currentLevelLava.splice(0,currentLevelLava.length);
    for(var i=0;i<lava.length;i++){
//         console.log("checking if inside level lava")
        if(lava[i].level===levelNum){
//             console.log("is inside level lava")
            currentLevelLava.push(lava[i]);
        }
    }
    currentLevelLava.push({tag:"holder"});
    currentLevelJumpPow.splice(0,currentLevelJumpPow.length);
    for(var i=0;i<jumpPow.length;i++){
        if(jumpPow[i].level===levelNum){
            currentLevelJumpPow.push(jumpPow[i])
        }
    }
    currentLevelButton.splice(0,currentLevelButton.length);
    
    for(var i=0;i<button.length;i++){
        if(button[i].level===levelNum){
            currentLevelButton.push(button[i]);
        }
    }
    currentLevelJumpPow.push({tag:"holder"});
//     console.log(currentLevelButton)
    if(player.level%5===0){
        player.checkpoint=player.level;
    }
}
function buttonCommand(pressedButton){
    for(var i=0;i<currentLevelBlocks.length;i++){
        if(currentLevelBlocks[i].tag===pressedButton.tag){
            switch(pressedButton.command){
                case "moveLeft":
                    update();
                break;
                case "moveRight":
                    update();
                break;
                case "moveUp":
                    update();
                break;
                case "moveDown":
                    update();
                break;
                case "destroy":
                    currentLevelBlocks[i].level*=-1;
                    pressedButton.level*=-1;
                    update();
                break;
            }
        }
        if(currentLevelJumpPow[i].tag===pressedButton.tag){
            switch(pressedButton.command){
                case "moveLeft":
                    update();
                break;
                case "moveRight":
                    update();
                break;
                case "moveUp":
                    update();
                break;
                case "moveDown":
                    update();
                break;
            }
        }
        console.log(currentLevelLava[i])
        console.log(currentLevelLava[i].tag)
        if(currentLevelLava[i].tag===pressedButton.tag){
            switch(pressedButton.command){
                case "moveLeft":
                    
                break;
                case "moveRight":
                    
                break;
                case "moveUp":
                    
                break;
                case "moveDown":
                    
                break;
                case "destroy":
                    console.log("DESTROYING "+currentLevelLava[i])
                    currentLevelLava[i].level*=-1;
                    console.log(currentLevelLava[i].level)
                    pressedButton.level*=-1;
                    update()
                break;
        }
    }
    }
}
function isPlaying(sound){
    return !sound.paused;
};

function typeStory(levelNum){
    $("#storyConsole").text("");
    
    var fullText=storyText[levelNum];
//     console.log(fullText)
    var partialText=">";
    var currentStory= storyText[levelNum];
//     console.log(currentStory)
    var counter=0;
    var thisLevel=player.level;
    function myLoop(){
        setTimeout(function () {
            if(thisLevel!==player.level){
                return;
            }
//             console.log(fullText.charAt(counter))
            var newLetter=fullText.charAt(counter)
            partialText= partialText+ newLetter
//             console.log(partialText)
            $("#storyConsole").text(partialText);
            counter++
            if (counter < currentStory.length) {
                myLoop();
            }else if(counter===currentStory.length){
                flickerText();
            }
            
        }, 50)
        
    }
    myLoop();
    
    
}
function flickerText(){
    var originalText = $("#storyConsole").text();
    var underline = true;
    var thisLevel=player.level;
    setInterval(function(){
        if(thisLevel!==player.level){
            return;
        }
    	if(underline){
        	var newText= originalText+"|";
            underline=false;
            $("#storyConsole").text(newText);
        }else{
        	var newText=originalText+"";
            underline=true;
            $("#storyConsole").text(newText);
        }
    },500)
}
function muteMusic(){
    console.log('muting music')
    if(isPlaying(music)){
        console.log('music is playing')
        music.pause();
        mute=true
    }else{
        console.log('music is not playing')
        music.play();
        mute=false;
    }
}
function cavasMouseOver(e){
    console.log("X: "+e.clientX+" Y: "+e.clientY)
}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
    
window.addEventListener("load", function () {
//     alert("This game has music as well as sounds, make sure your sound is at an appropriate level");
    var saveData=getCookie("level");
    var deathData=getCookie("death");
    
//     alert(saveData)
    if(!DEBUG){
        if(saveData==""){
            document.cookie="level=1";
        }else{
            player.level=parseInt(saveData);
        }
        if(deathData==""){
            document.cookie="death=0";
        }else{
            player.deaths=parseInt(deathData);
        }
    }
//     alert(saveData)
    player.x=startPoint[player.level-1].x;
    player.y=startPoint[player.level-1].y;
    if(!mute){
    music.play();
    }
    
    update();
    loadLevel(player.level);
    typeStory(player.level);
});

//the power up updater
setInterval(function(){
    for(var i=0;i<jumpPow.length;i++){
        jumpPow[i].level=Math.abs(jumpPow[i].level);
    }
    console.log("x: "+player.x);
    console.log("y: "+player.y)
},4000)
//Music loop
music.addEventListener("ended",function(){
    this.currentTime=0;
    this.play();
},false)



function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//To do!
//Add levels
//Use a tag system for buttons