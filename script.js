let PHDs = [];

let year = 2022;
let gridModule = 6;
let univX;

let OCR;
let FK;

let grupos;
let order = ["universidade","ano", "local"];

let dom = undefined;

numYears = [60, 78, 64, 60, 87, 86, 65, 103, 61, 105, 116, 112, 130, 177, 214, 206, 216, 274, 275, 341, 337, 319, 354, 493, 453, 567, 607, 579, 719, 773, 862, 908, 991, 1032, 1085, 1203, 1310, 1486, 1541, 1639, 1749, 1913, 2362, 2582, 2684, 3163, 2510, 2117, 2207, 1727, 1750, 1899, 1514];

let global = true;
let moving = false;

let Ax = 1800;
let Ay = 180;

let iterate = false;

let statsGerais = {
    total: 0,
    totalAnterior: 0,
    masculino: 0,
    feminino: 0,
    portugal: 0,
    estrangeiro: 0,
    "Artes e Humanidades": 0,
    "Ciências Sociais e Direito": 0,
    "Ciências e Matemática": 0,
    "Engenharias e Indústria": 0,
    "Agrária": 0,
    "Saúde": 0
}


let port, reader;


function setup() {

    createCanvas(9720+120, 1920+120, "P2D");
    
    background(30);
    ellipseMode(CORNER);


    textFont(OCR);
    fill(255);
    

    textAlign(CENTER);
   
    textFont(FK);
    textSize(200);
    text("PhDs - Portugal has Doctors!", 4860, 850)
    textAlign(LEFT);
    textSize(16);
    textFont(OCR);


    setupData();



}

setInterval(skipper, 500);

function draw() {



    if (keyIsDown(UP_ARROW)) {
        Ay = Ay - 5 * gridModule;
    } else if (keyIsDown(DOWN_ARROW)) {
        Ay = Ay + 5 * gridModule;
    }
    if (keyIsDown(LEFT_ARROW)) {
        Ax = Ax - 5 * gridModule;
    } else if (keyIsDown(RIGHT_ARROW)) {
        Ax = Ax + 5 * gridModule;
    }


    if (moving) {
        background(30);
        for (let p = 0; p < PHDstoGroup.length; p++) move(PHDstoGroup[p]);
    }

    if (global) {
  
    } else {
        universidades[univX].univXDrawDetails();
    }
}


function drawYears(year, dom) {
    background(30);

    for (let i = 0; i < universidades.length; i++) {
        universidades[i].univPainter(year, dom);
        if (universidades[i].activePhDs.length != 0) {
            universidades[i].getStats(year, dom);
            universidades[i].statsGerais(universidades[i].statPos[0], universidades[i].statPos[1]);
        }
    }

    globalStats(dom);

}

function globalStats(dom) {

    statsGerais.total = 0;

    statsGerais.masculino = 0;
    statsGerais.feminino = 0;

    statsGerais.portugal = 0;
    statsGerais.estrangeiro = 0;

    statsGerais["Artes e Humanidades"] = 0;
    statsGerais["Ciências Sociais e Direito"] = 0;
    statsGerais["Ciências e Matemática"] = 0;
    statsGerais["Engenharias e Indústria"] = 0;
    statsGerais["Agrária"] = 0;
    statsGerais["Saúde"] = 0;




    fill(250);
    textSize(100);
    textFont(FK);
    text("PhDs - Portugal has Doctors!", 100, 150)
    textSize(60);
    textFont(OCR);
    text("Visualizing the PhDs in Portugal from 1970 to 2022", 100, 250)
    textSize(16);




    for (let u = 0; u < universidades.length; u++) {
        for (let p = 0; p < universidades[u].activePhDs.length; p++) {
            let d = universidades[u].activePhDs[p];

            
            if (d.dominioGeral == dom || dom == undefined) {
                statsGerais.total++;

                if (d.sexo === "Masculino") statsGerais.masculino++; else statsGerais.feminino++;
                if (d.local.includes("estrangeiro")) statsGerais.estrangeiro++; else statsGerais.portugal++;

                if (d.dominioGeral == "Artes e Humanidades") statsGerais["Artes e Humanidades"]++;
                else if (d.dominioGeral == "Ciências Sociais e Direito") statsGerais["Ciências Sociais e Direito"]++;
                else if (d.dominioGeral == "Ciências e Matemática") statsGerais["Ciências e Matemática"]++;
                else if (d.dominioGeral == "Engenharias e Indústria") statsGerais["Engenharias e Indústria"]++;
                else if (d.dominioGeral == "Agrária") statsGerais["Agrária"]++;
                else if (d.dominioGeral == "Saúde") statsGerais["Saúde"]++;

            }
        }
    }


    let inc = 550;
    //--------------------------------- STATS TEXT ---------------------------------------------
    noStroke();
    fill(250);
    textSize(50);


    //------------------------------------ NUMBERS ---------------------------------------------
    textSize(50);
    textFont(FK);

    text(year, 100, 1800);

    if (year !== 1970)
        statsGerais.totalAnterior = statsGerais.total - statsGerais.totalAnterior;
    text(statsGerais.total, 600, 1800);


    text(statsGerais.feminino + ' / ' + statsGerais.masculino, 1150, 1800);
    text(statsGerais.portugal + ' / ' + statsGerais.estrangeiro, 1700, 1800);

    text(statsGerais["Artes e Humanidades"], 3300, 1800);
    text(statsGerais["Ciências Sociais e Direito"], 3300 + inc, 1800);
    text(statsGerais["Ciências e Matemática"], 3300 + inc * 2, 1800);
    text(statsGerais["Engenharias e Indústria"], 3300 + inc * 3, 1800);
    text(statsGerais["Agrária"], 3300 + inc * 4, 1800);
    text(statsGerais["Saúde"], 3300 + inc * 5, 1800);

    //------------------------------------ TEXTS ---------------------------------------------
    textSize(20);
    textFont(OCR);

    text("Year", 100, 1835);

    text("PhDs (+" + statsGerais.totalAnterior + " than last year)", 600, 1835);
    statsGerais.totalAnterior = statsGerais.total;


    text('Women / Men', 1150, 1835);
    text('Portugal / Abroad', 1700, 1835);

    text("Arts and Humanities", 3335, 1835);
    text("Social Sciences and Law", 3335 + inc, 1835);
    text("Sciences and Matematics", 3335 + inc * 2, 1835);
    text("Engineering and Industry", 3335 + inc * 3, 1835);
    text("Agrarian", 3335 + inc * 4, 1835);
    text("Health", 3335 + inc * 5, 1835);


    //------------------------------ HISTOGRAM DOMAINS ---------------------------------------------
    fill(colors[0])
    rect(3302, 1822, 15, 15);

    fill(colors[1])
    rect(3302 + inc, 1822, 15, 15);

    fill(colors[2])
    rect(3302 + inc * 2, 1822, 15, 15);

    fill(colors[3])
    rect(3302 + inc * 3, 1822, 15, 15);

    fill(colors[4])
    rect(3302 + inc * 4, 1822, 15, 15);

    fill(colors[5])
    rect(3302 + inc * 5, 1822, 15, 15);

    textSize(20);
    textAlign(CENTER);
    fill(250);
    text("(" + round(statsGerais["Artes e Humanidades"] / statsGerais.total * 100) + "%)", 3330, 1875);
    text("(" + round(statsGerais["Ciências Sociais e Direito"] / statsGerais.total * 100) + "%)", 3330 + inc, 1875);
    text("(" + round(statsGerais["Ciências e Matemática"] / statsGerais.total * 100) + "%)", 3330 + inc * 2, 1875);
    text("(" + round(statsGerais["Engenharias e Indústria"] / statsGerais.total * 100) + "%)", 3330 + inc * 3, 1875);
    text("(" + round(statsGerais["Agrária"] / statsGerais.total * 100) + "%)", 3330 + inc * 4, 1875);
    text("(" + round(statsGerais["Saúde"] / statsGerais.total * 100) + "%)", 3330 + inc * 5, 1875);

    //------------------------------ HISTOGRAMA TOTAL PHDS ---------------------------------------------

    for (let y = 0; y < year % 1970 + 1; y++) {
        fill(250)
        rect(7700 + 30 * y, 1800, 20, -numYears[y] / 10);


        if (y % 2 == 0) {
            let yy = 1970 + y;
            yy.toString();
            text(String(yy).substring(2), 7710 + 30 * y, 1835);
        }
    }

    for (let l = 0; l < 16; l++) {
        noFill()
        stroke(250)
        strokeWeight(0.5);
        line(7700, 1800 - 20 * l, 9280, 1800 - 20 * l) // STEP 200
        fill(250);
        noStroke();
        if (l % 2 !== 0) text(200 * l, 7650, 1805 - 20 * l);
    }

    textAlign(LEFT);
    text("Total PhDs by Year", 7700, 1875);
    textSize(16);

    //-------------------------------------- INFOS ---------------------------------------------

    noFill();
    stroke(250);
    rect(9425, 1750, 275, 150);
    textSize(12);
    noStroke();
    fill(250);
    text("A / Z - Next/ Previous Year", 9450, 1780);
    text("I - Animate / Static Mode", 9450, 1800);
    text("G - Return to Global Mode", 9450, 1820);
    text("ARROWS - Navigate PhDs", 9450, 1840);
    text("1 to 6 - Filter PhDs by Domain", 9450, 1860);
    text("8 - Grouping", 9450, 1880);

    textSize(16);
}


function move(phd) {

    let x = lerp(phd.pos[0], phd.groupingPos[0], 0.25);
    let y = lerp(phd.pos[1], phd.groupingPos[1], 0.25);
    phd.drawPhD([x, y]);
}

function network() {
    for (let i = 0; i < numCircles; i++) {
        isConnected[i] = false;
    }

    //edge reflection
    for (let i = 0; i < numCircles; i++) {
        randomNumbersArrayX[i] = randomNumbersArrayX[i] + speedX[i];
        randomNumbersArrayY[i] = randomNumbersArrayY[i] + speedY[i];
    }

    for (let i = 0; i < numCircles; i++) {
        if ((randomNumbersArrayX[i] > width) || (randomNumbersArrayX[i] < 0)) {
            speedX[i] = speedX[i] * -1;
        }
    }

    for (let i = 0; i < numCircles; i++) {
        if ((randomNumbersArrayY[i] > height) || (randomNumbersArrayY[i] < 0)) {
            speedY[i] = speedY[i] * -1;
        }
    }


    //connecting lines
    for (let i = 0; i < numCircles; i++) {
        for (let j = 0; j < numCircles; j++) {

            let dp = dist(randomNumbersArrayX[i], randomNumbersArrayY[i], randomNumbersArrayX[j], randomNumbersArrayY[j]);
            if (dp < distance) {
                if (i != j) {
                    stroke((distance - dp) / distance * 255);
                    strokeWeight(0.5);
                    line(randomNumbersArrayX[i], randomNumbersArrayY[i], randomNumbersArrayX[j], randomNumbersArrayY[j]);
                    isConnected[i] = true;
                    isConnected[j] = true;
                }
            }
        }
    }

    //points

    for (let i = 0; i < numCircles; i++) {

        if (isConnected[i] == true) {
            stroke(255);
            strokeWeight(3);
            rect(randomNumbersArrayX[i], randomNumbersArrayY[i], 5, 5);
        } else {
            stroke(255);
            strokeWeight(1);
            rect(randomNumbersArrayX[i], randomNumbersArrayY[i], 5, 5);

        }
    }
}

function skipper() {
    if (iterate) {
        if (year == 2022) year = 1969;
        year++;
        drawYears(year, dom);
    }
}

function keyPressed() {


    // --------------------------------- SKIPPER ---------------------------------------
    if (key === 'i' || key === 'I') {
        iterate = !iterate;
    }

    // --------------------------------- YEARS ------------------------------------------
    if (key === 'a' || key === 'A') {
        year++;
        if(year==2023)year=1970;
        drawYears(year, dom);

    } else if (key === 'z' || key === 'Z') {
        year--;
        if(year==1969)year=2022;
        drawYears(year, dom);
    }


    // --------------------------------- GLOBAL/UNIQ -----------------------------------
    if ((key === 'g' || key === 'G') && !global) {
        global = !global;

        if (global) {
            drawYears(year, dom);
        }
    }

    // --------------------------------- ARROWS PHDS -----------------------------------
    if (keyCode === UP_ARROW) {
        Ay = Ay - 5 * gridModule;
    } else if (keyCode === DOWN_ARROW) {
        Ay = Ay + 5 * gridModule;
    }
    if (keyCode === LEFT_ARROW) {
        Ax = Ax - 5 * gridModule;
    } else if (keyCode === RIGHT_ARROW) {
        Ax = Ax + 5 * gridModule;
    }

    // ---------------------------------------------------------------------------------

    if (key === '1') {
        dom = "Artes e Humanidades";
        drawYears(year, dom);
    }
    if (key === '2') {
        dom = "Ciências Sociais e Direito";
        drawYears(year, dom);
    }
    if (key === '3') {
        dom = "Ciências e Matemática";
        drawYears(year, dom);
    }
    if (key === '4') {
        dom = "Engenharias e Indústria";
        drawYears(year, dom);
    }
    if (key === '5') {
        dom = "Agrária";
        drawYears(year, dom);
    }
    if (key === '6') {
        dom = "Saúde";
        drawYears(year, dom);
    }
    if (key === '7') {
        dom = undefined;
        drawYears(year, dom);
    }
    if (key === '8') runGrouping();
    if (key === '9') moving = !moving;
    if (key === 's') save("mySVG.svg");
}

function mousePressed() {

    Ax = floor((mouseX - 1800) / (5 * gridModule)) * (5 * gridModule) + 1800;
    Ay = floor((mouseY - 180) / (5 * gridModule)) * (5 * gridModule) + 180;


    for (let u = 0; u < universidades.length; u++) {
        if (universidades[u].over()) {
            global = false;
            background(30);
            univX = u;
        }
    }
}




