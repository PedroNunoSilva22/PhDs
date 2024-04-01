let gridStep = 100;

let PhDsUniv = 0;
let Ms = 0;
let Fs = 0;
let pt = 0;

let Arts = 0;
let Social = 0;
let Sciences = 0;
let Engineering = 0;
let Agrarian = 0;
let Health = 0;

let outside = 0;
let mode = 4;

class Universidade {
    constructor(nome, pos) {
        this.nome = nome;
        this.PhDs = [];
        this.activePhDs = [];
        this.PhDsPoints = [];
        this.bb = {min_x: 0, max_x: 0, min_y: 0, max_y: 0}
        this.barriers = [];
        this.frees = [];
        this.pos = [gridStep * 0.8 + gridStep * pos[0], gridStep * 1.25 + gridStep * pos[1]];


        this.startPos = [gridStep * 0.8 + gridStep * pos[0], gridStep * 1.25 + gridStep * pos[1]];
        this.statPos = [gridStep * 1.2 + gridStep * pos[0], gridStep * 0.8 + gridStep * pos[1]];

        noFill();
        stroke(255);
        ellipse(this.pos[0] * gridModule + 2.5, this.pos[1] * gridModule + 2.5, 5, 5);


        this.getFree(this.pos[0], this.pos[1]);
        this.newPos();


    }

    univPainter(year, dom) {
        const index = this.PhDs.findIndex(function (el) {
            if (el.ano > year) return el;
        });

        this.activePhDs = this.PhDs.slice(0, index);

        for (let i = 0; i < this.activePhDs.length; i++) {

            // if (this.PhDs[i].ano <= year || year == undefined) {
            if (this.PhDs[i].dominioGeral == dom || dom == undefined) {


                this.activePhDs[i].drawPhD(this.PhDsPoints[i], "univ");

            }

            // }
        }

    }

    univXDrawDetails() {
        background(30);

        push();
        translate(960, 960);
        scale(1.5);
        translate(-this.startPos[0] * gridModule - 100, -this.startPos[1] * gridModule)
        this.univPainter(year);
        pop();

        fill(250);
        textSize(80);
        text(universidades[univX].nome, 230, 230);
        textSize(16);
        universidades[univX].getStats(year);
        universidades[univX].statsUnivX(40, 250);

        let x = 0;
        let y = 0;
        let ano = this.activePhDs[0].ano;

        fill(250);
        noStroke();
        text(ano, 1750, 31 * gridModule + y * 5 * gridModule);

        for (let p = 0; p < this.activePhDs.length; p++) {
            /* if (x % 200 == 0 && x != 0) {
                 x=0;
                 y++;
             }*/

            if (this.activePhDs[p].ano != ano) {
                ano = this.activePhDs[p].ano;
                y++;
                x = 0;
                fill(250);
                text(ano, 1750, 31 * gridModule + y * 5 * gridModule);
            }
            this.activePhDs[p].drawPhD([x % 200 * 5 + 300, 30 + y * 5]);
            //this.activePhDs[p].drawPhD([x * 5 + 300, 30 + y * 5]);
            x++;
        }

        stroke(240);
        noFill();
        rect(Ax - 7.5, Ay - 7.5, 20, 20);

        //--------------- SCREENS ---------------
        /*stroke(255, 0, 255);
        noFill();
        for (let e = 0; e < 9; e++) {
            rect(e * 1080, 0, 1080, 1920)
        }*/

        for (let p = 0; p < this.activePhDs.length; p++) {
            if (this.activePhDs[p].getPos(Ax, Ay)) {
                push();
                scale(2);
                this.activePhDs[p].drawDetailedPhD([4115, 230]);
                pop();
                break;
            }
        }
        //noLoop();
    }

    addBarrier(y) {
        //console.log("novo ano para " + this.nome)

        this.barriers.push(this.frees);

        //this.barriers.push({[y]: this.frees});

        //this.frees = [];
        //for (let b = 0; b < this.barriers[this.barriers.length - 1].length; b++) {
        /*for (let f = 0; f < this.frees.length; f++) {

            let newPos = this.getFree(this.frees[f][0], this.frees[f][1]);
            console.log(newPos,newPos.length)

            if (newPos.length > 0) {
                this.newPos(newPos);
                //console.log(this.pos, this.frees)
                break;
            }
        }*/
        //if (this.frees.length == 0) console.log("vai dar merda")

        /*console.log(this.barriers)
        this.frees = this.frees[this.frees.length-1];

        this.pos = this.frees;
        console.log(this.pos)
        this.getFree(this.pos[0],this.pos[1])
        this.newPos();*/

    }


    getStats(year, dom) {

        PhDsUniv = 0;
        Ms = 0;
        Fs = 0;
        pt = 0;
        outside = 0;
        Arts = 0;
        Social = 0;
        Sciences = 0;
        Engineering = 0;
        Agrarian = 0;
        Health = 0;


        for (let i = 0; i < this.activePhDs.length; i++) {

            if (this.activePhDs[i].ano <= year || year == undefined) {
                if (this.activePhDs[i].dominioGeral.includes(dom) || dom == undefined) {

                    PhDsUniv++;
                    if (this.activePhDs[i].sexo == "Masculino") Ms++; else Fs++;
                    if (this.activePhDs[i].local.includes("estrangeiro")) outside++; else pt++;

                    if (this.activePhDs[i].dominioGeral == "Artes e Humanidades") Arts++;
                    else if (this.activePhDs[i].dominioGeral == "Ciências Sociais e Direito") Social++;
                    else if (this.activePhDs[i].dominioGeral == "Ciências e Matemática") Sciences++;
                    else if (this.activePhDs[i].dominioGeral == "Engenharias e Indústria") Engineering++;
                    else if (this.activePhDs[i].dominioGeral == "Agrária") Agrarian++;
                    else if (this.activePhDs[i].dominioGeral == "Saúde") Health++;
                }

            }

        }
    }

    statsGerais(x,y) {
        let inc = 25;

        noStroke();
        fill(250);
        text(this.nome, x * gridModule - 25, y * gridModule - inc / 2);
        rect(x * gridModule - 50, y * gridModule + 2, this.nome.length * 8 + 50, 1);
        noFill();
        stroke(250);
        line(this.startPos[0] * gridModule, this.startPos[1] * gridModule, x * gridModule - 50, y * gridModule + 2);
        noStroke();
        fill(250);
        text(PhDsUniv + ' PhD', x * gridModule, y * gridModule + inc);
        text(Fs + ' / ' + Ms + ' Women|Men', x * gridModule, y * gridModule + inc * 2);
        text(pt + ' / ' + outside + ' Portugal|Abroad', x * gridModule, y * gridModule + inc * 3);

    }

    statsUnivX(x,y) {
        let inc = 25;

        fill(250);
        noStroke();
        text(PhDsUniv + ' PhD', x * gridModule, y * gridModule + inc);
        text(Fs + ' / ' + Ms + ' Women|Men', x * gridModule, y * gridModule + inc * 2);
        text(pt + ' / ' + outside + ' Portugal|Abroad', x * gridModule, y * gridModule + inc * 3);

        rect(x * gridModule, y * gridModule + inc * 4-5, 400, 1);

        text(Arts + " Arts and Humanities", x * gridModule, y * gridModule + inc * 5);
        text(Social + " Social Sciences and Law", x * gridModule, y * gridModule + inc * 6);
        text(Sciences + " Sciences and Matematics", x * gridModule, y * gridModule + inc * 7);
        text(Engineering + " Engineering and Industry", x * gridModule, y * gridModule + inc * 8);
        text(Agrarian + " Agrarian", x * gridModule, y * gridModule + inc * 9);
        text(Health + " Health", x * gridModule, y * gridModule + inc * 10);

    }


    getFree(x, y) {
        let count = 0;
        let newFrees = []

        //if(x-1<0 || x+1>849 || y-1<0 || y+1>949)return;
        if (mode == 8 && grid[x - 1][y - 1] == 0) {                     // TOP-LEFT
            grid[x - 1][y - 1] = 1;
            this.frees.push([x - 1, y - 1]);
            newFrees.push([x - 1, y - 1]);
            count++;
        }

        if (grid[x][y - 1] == 0) {                                      //TOP
            grid[x][y - 1] = 1; //1;
            this.frees.push([x, y - 1]);
            newFrees.push([x, y - 1]);
            count++;
        }
        if (mode == 8 && grid[x + 1][y - 1] == 0) {                      //TOP-RIGHT
            grid[x + 1][y - 1] = 1;
            this.frees.push([x + 1, y - 1]);
            newFrees.push([x + 1, y - 1]);
            count++;
        }

        if (grid[x - 1][y] == 0) {                                       //LEFT
            grid[x - 1][y] = 1; //1;
            this.frees.push([x - 1, y]);
            newFrees.push([x - 1, y]);
            count++;
        }


        if (grid[x + 1][y] == 0) {                                        //RIGHT
            grid[x + 1][y] = 1; //1;
            this.frees.push([x + 1, y]);
            newFrees.push([x + 1, y]);
            count++;
        }
        if (mode == 8 && grid[x - 1][y + 1] == 0) {                      // BOTTOM-LEFT
            grid[x - 1][y + 1] = 1;
            this.frees.push([x - 1, y + 1]);
            newFrees.push([x - 1, y + 1]);
            count++;
        }
        if (grid[x][y + 1] == 0) {                                      //BOTTOM
            grid[x][y + 1] = 1; //1;;
            this.frees.push([x, y + 1]);
            newFrees.push([x, y + 1]);
            count++;
        }
        if (mode == 8 && grid[x + 1][y + 1] == 0) {                    //BOTTOM-RIGHT
            grid[x + 1][y + 1] = 1;
            this.frees.push([x + 1, y + 1]);
            newFrees.push([x + 1, y + 1]);
            count++;
        }

        this.frees = Array.from(new Set(this.frees.map(JSON.stringify)), JSON.parse);

        //console.log(this.frees)
        return newFrees;
    }

    newPos(pos) {
        let newPos;
        if (pos != undefined) {
            console.log(pos)
            this.pos = [pos[0][0], pos[0][1]];
            console.log(this.pos)
            pos.splice(0, 1);
            this.frees = pos;
        } else {
            newPos = round(random(this.frees.length - 1));
            if (this.frees[newPos] == undefined) console.log(this.frees, newPos, this)
            this.pos = [this.frees[newPos][0], this.frees[newPos][1]];
            this.frees.splice(newPos, 1);
        }

        return this.pos;
    }

    over() {
        return (mouseX > this.bb.min_x && mouseX < this.bb.max_x + gridModule
            && mouseY > this.bb.min_y && mouseY < this.bb.max_y + gridModule)
    }

    bounding_box() {
        this.bb.min_x = this.PhDsPoints.reduce((min, p) => p[0] < min ? p[0] : min, this.PhDsPoints[0][0]) * gridModule;
        this.bb.max_x = this.PhDsPoints.reduce((max, p) => p[0] > max ? p[0] : max, this.PhDsPoints[0][0]) * gridModule;
        this.bb.min_y = this.PhDsPoints.reduce((min, p) => p[1] < min ? p[1] : min, this.PhDsPoints[0][1]) * gridModule;
        this.bb.max_y = this.PhDsPoints.reduce((max, p) => p[1] > max ? p[1] : max, this.PhDsPoints[0][1]) * gridModule;
    }
}

