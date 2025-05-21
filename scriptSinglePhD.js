let canvas;
let houses = [];
let housesGerais = [];
let i = 19955;

function drawDetailedPhD(i) {
    data = Object.values(data);
    data.sort((a, b) => a.anodograuemportugal - b.anodograuemportugal);

    background(245);

    let nomes = [data[i].nome, data[i].dominiocientifico,data[i].titulodetese, data[i].anodograuemportugal.toString()];  // OU UNIVERSIDADE ??
    let rules = [];

    housesGerais = [];

    for (let t = 0; t < nomes.length; t++) {
        let ruleX = [];
        houses = [];
        for (let n = 0; n < nomes[t].length; n++) {
            let oct = unchar(nomes[t].charAt(n)).toString(8);
            ruleX.push(oct % 8);
        }
        rules.push(ruleX);
        painter(ruleX, t, data[i].sexo, data[i].dominiocientifico,data[i].doutoramento);
    }
    let dim = bounding_box(housesGerais);

    $("#defaultCanvas0 > svg:nth-child(1) > g:nth-child(3) > path").css('transform', 'translate('+(250-(dim[2]+dim[0]/2))+'px, '+(250-(dim[3]+dim[1]/2))+'px)');

    fill(0);
    noStroke();
    textSize(8);
    text(data[i].nome, 10, height - gridModule * 2);
    text(data[i].universidade + " · " + data[i].anodograuemportugal, 10, height - gridModule);

}

function ruler(rules, x, y) {
    switch (rules) {
        case 0:
            x -= gridModule;
            y -= gridModule;
            break;
        case 1:
            y -= gridModule;
            break;
        case 2:
            x += gridModule;
            y -= gridModule;
            break;
        case 3:
            x -= gridModule;
            break;
        case 4:
            x += gridModule;
            break;
        case 5:
            x -= gridModule;
            y += gridModule;
            break;
        case 6:
            y += gridModule;
            break;
        case 7:
            x += gridModule;
            y += gridModule;
            break;
    }
    return [x, y]
}

function painter(rules, number, sex, dom,local) {
    let x = 250; // + number%2*5;
    let y = 250; // + number%2*5;
    let stk = 3;

    let pos = [x, y];

    for (let r = 0; r < rules.length; r++) {
        let np = ruler(rules[r], x, y);
        x = np[0];
        y = np[1];

        pos = [x, y];

        let includes = houses.some((a) => pos.every((v, i) => v === a[i]));

        if (includes == true) {
            ruler(rules[r], x, y);
            r--;

        } else {
            houses.push([x, y]);
            housesGerais.push([x, y]);


                noStroke();
            if (number == 0) { //NOME
                if (sex == "Masculino") {
                    fill(100,20,255);
                    rect(x, y, gridModule, gridModule);
                } else {
                    fill(255,0,255);
                    ellipse(x, y, gridModule, gridModule);
                }

            } else if (number == 2) { // TITULO
                noFill();
                stroke(0)
                strokeWeight(1);
                rect(x + gridModule / 4, y + gridModule / 4, gridModule / 2, gridModule / 2);
                if(local.includes("Estrangeiro"))rect(x, y, gridModule, gridModule);
                strokeCap(SQUARE)
                line(x + gridModule / 2, y, x + gridModule / 2, y + gridModule); // VERTICAL
                line(x, y + gridModule / 2, x + gridModule, y + gridModule / 2); // HORIZONTAL
            } else if (number == 1) { // DOMINIO CIENTIFICO
                noFill();
                strokeWeight(stk);
                stroke(dominios[dom][0]);
                rect(x +  1.5, y + 1.5, gridModule - 3, gridModule - 3);
            } else { // ANO
                stroke(0);
                strokeWeight(3);
                strokeCap(SQUARE)
                line(x + 1.5, y + 1.5, x + gridModule - 1.5, y + gridModule - 1.5);
                line(x + 1.5, y + gridModule - 1.5, x + gridModule - 1.5, y + 1.5);

            }

        }

    }

}

function bounding_box(points) {
    const min_x = points.reduce((min, p) => p[0] < min ? p[0] : min, points[0][0]);
    const max_x = points.reduce((max, p) => p[0] > max ? p[0] : max, points[0][0]);
    const min_y = points.reduce((min, p) => p[1] < min ? p[1] : min, points[0][1]);
    const max_y = points.reduce((max, p) => p[1] > max ? p[1] : max, points[0][1]);

    return [max_x + gridModule - min_x, max_y + gridModule - min_y, min_x, min_y, max_x + gridModule, max_y + gridModule];
}




function setup() {
    canvas = createCanvas(500, 500, SVG);
    ellipseMode(CORNER);
    textFont('Courier');
    drawDetailedPhD(i);

}

function keyPressed() {

    if (key === 'a') {
        i++;
        drawDetailedPhD(i);
    } else if (key === 'z') {
        i--;
        drawDetailedPhD(i);
    }
}
