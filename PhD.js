let detailSize = 500;

class PhD {
    constructor(nome, sexo, universidade, dominio, dominioGeral, titulo, ano, local, pos, code) {
        this.nome = nome;
        this.sexo = sexo;
        this.universidade = universidade;
        this.dominio = dominio;
        this.dominioGeral = dominioGeral;
        this.titulo = titulo;
        this.ano = ano;
        this.local = local;
        this.pos = pos;
        this.code = code;
        this.houses = [];
        this.housesGerais = [];
        this.groupingPos = [];

        this.c = dominios[this.dominio][0];
    }

    drawPhD(pos, univ) {

        if (univ != "univ") {
            this.pos[0] = pos[0];
            this.pos[1] = pos[1];

            if (this.sexo == "Masculino") {
                noStroke();
                fill(this.c);
                rect(this.pos[0] * gridModule, this.pos[1] * gridModule, gridModule, gridModule);
                if (this.local.includes("estrangeiro")) {
                    noFill();
                    stroke(0);
                    strokeWeight(1);
                    rect(this.pos[0] * gridModule + 1, this.pos[1] * gridModule + 1, gridModule - 2, gridModule - 2);
                }
            } else {
                noStroke();
                fill(this.c);
                ellipse(this.pos[0] * gridModule, this.pos[1] * gridModule, gridModule, gridModule);
                if (this.local.includes("estrangeiro")) {
                    noFill();
                    stroke(0);
                    strokeWeight(1);
                    ellipse(this.pos[0] * gridModule + 1, this.pos[1] * gridModule + 1, gridModule - 2, gridModule - 2);
                }
            }
        } else {
            if (this.sexo == "Masculino") {
                noStroke();
                fill(this.c);
                rect(pos[0] * gridModule, pos[1] * gridModule, gridModule, gridModule);
                if (this.local.includes("estrangeiro")) {
                    noFill();
                    stroke(0);
                    strokeWeight(1);
                    rect(pos[0] * gridModule + 1, pos[1] * gridModule + 1, gridModule - 2, gridModule - 2);
                }
            } else {
                noStroke();
                fill(this.c);
                ellipse(pos[0] * gridModule, pos[1] * gridModule, gridModule, gridModule);
                if (this.local.includes("estrangeiro")) {
                    noFill();
                    stroke(0);
                    strokeWeight(1);
                    ellipse(pos[0] * gridModule + 1, pos[1] * gridModule + 1, gridModule - 2, gridModule - 2);
                }
            }
        }
    }


    getInfo() {
        if (mouseX > this.pos[0] * gridModule && mouseX < this.pos[0] * gridModule + gridModule && mouseY > this.pos[1] * gridModule && mouseY < this.pos[1] * gridModule + gridModule) {
            
            fill(0)
            rect(this.pos[0] * gridModule + 50, this.pos[1] * gridModule + 50, 200, 50);
            stroke(255)
            line(this.pos[0] * gridModule, this.pos[1] * gridModule, this.pos[0] * gridModule + 50, this.pos[1] * gridModule + 50);
            noStroke();
            fill(255);
            //text(this.nome,this.pos[0] * gridModule + 60,this.pos[1] * gridModule + 60)
            text(this.dominio, this.pos[0] * gridModule + 60, this.pos[1] * gridModule + 70)
            text(this.ano, this.pos[0] * gridModule + 60, this.pos[1] * gridModule + 80)
            return true;
        }
    }

    getPos(px,py){
        if (px == this.pos[0] * gridModule && py == this.pos[1] * gridModule) {
            return true;
        }
    }

    drawDetailedPhD(pos) {
    

        stroke(250);
        rect(pos[0], pos[1], detailSize, detailSize);
        let nomes = [this.nome, this.dominio, this.titulo, this.ano];

        let rules = [];
        this.housesGerais = [];

        for (let t = 0; t < nomes.length; t++) {
            let ruleX = [];
            this.houses = [];
            for (let n = 0; n < nomes[t].length; n++) {
                let oct = unchar(nomes[t].charAt(n)).toString(8);
                ruleX.push(oct % 8);
            }
            rules.push(ruleX);
            this.painter(pos, ruleX, t, this.sexo);
        }
        let dim = this.bounding_box(this.housesGerais);
        

        $("#defaultCanvas0 > svg:nth-child(1) > g:nth-child(3) > g:nth-child(26) > path:not(:first-child)").css('transform', 'translate(' + (250 - (dim[2] + dim[0] / 2)) + 'px, ' + (250 - (dim[3] + dim[1] / 2)) + 'px)');

    

        fill(230);
        noStroke();
        textSize(8);
        text(this.nome + " - " + this.dominio, pos[0] + 20, pos[1] + detailSize - 40);
        text(this.titulo, pos[0] + 20, pos[1] + detailSize - 30);
        text(this.ano, pos[0] + 20, pos[1] + detailSize - 20);

    
    }

    ruler(rules, x, y) {
        switch (rules) {
            case 0:
                x -= detailSize / 50;
                y -= detailSize / 50;
                break;
            case 1:
                y -= detailSize / 50;
                break;
            case 2:
                x += detailSize / 50;
                y -= detailSize / 50;
                break;
            case 3:
                x -= detailSize / 50;
                break;
            case 4:
                x += detailSize / 50;
                break;
            case 5:
                x -= detailSize / 50;
                y += detailSize / 50;
                break;
            case 6:
                y += detailSize / 50;
                break;
            case 7:
                x += detailSize / 50;
                y += detailSize / 50;
                break;
        }
        return [x, y]
    }


    painter(ps, rules, number, sex) {
        let x = ps[0] + detailSize / 2; // + number%2*5;
        let y = ps[1] + detailSize / 2; // + number%2*5;
        let stk = 3;

        let pos = [x, y];

        for (let r = 0; r < rules.length; r++) {
            let np = this.ruler(rules[r], x, y);
            x = np[0];
            y = np[1];

            pos = [x, y];

            let includes = this.houses.some((a) => pos.every((v, i) => v === a[i]));

            if (includes == true) {
                this.ruler(rules[r], x, y);
                r--;

            } else {
                this.houses.push([x, y]);
                this.housesGerais.push([x, y]);


                if (number == 0) { //NOME
                    noStroke();
                    if (sex == "Masculino") {
                        fill(100, 20, 255); //fill(colors[6]);
                        rect(x, y, detailSize / 50, detailSize / 50);
                    } else {
                        fill(255,0,255);
                        ellipse(x, y, detailSize / 50, detailSize / 50);
                    }

                } else if (number == 2) { // TITULO
                    noFill();
                    //fill(0);
                    stroke(250)
                    strokeWeight(1);
                    rect(x + detailSize / 50 / 4, y + detailSize / 50 / 4, detailSize / 50 / 2, detailSize / 50 / 2);
                    if (this.local.includes("estrangeiro")) rect(x, y, detailSize / 50, detailSize / 50);
                    strokeCap(SQUARE)
                    line(x + detailSize / 50 / 2, y, x + detailSize / 50 / 2, y + detailSize / 50); // VERTICAL
                    line(x, y + detailSize / 50 / 2, x + detailSize / 50, y + detailSize / 50 / 2); // HORIZONTAL
                } else if (number == 1) { // DOMINIO CIENTIFICO
                    noFill();
                    strokeWeight(stk);
                    stroke(this.c);
                    rect(x + 1.5, y + 1.5, detailSize / 50 - 3, detailSize / 50 - 3);
                } else { // ANO
                    stroke(250);
                    strokeWeight(3);
                    strokeCap(SQUARE)
                    line(x + 1.5, y + 1.5, x + detailSize / 50 - 1.5, y + detailSize / 50 - 1.5);
                    line(x + 1.5, y + detailSize / 50 - 1.5, x + detailSize / 50 - 1.5, y + 1.5);

                }
            }
        }
    }

    bounding_box(points) {
        const min_x = points.reduce((min, p) => p[0] < min ? p[0] : min, points[0][0]);
        const max_x = points.reduce((max, p) => p[0] > max ? p[0] : max, points[0][0]);
        const min_y = points.reduce((min, p) => p[1] < min ? p[1] : min, points[0][1]);
        const max_y = points.reduce((max, p) => p[1] > max ? p[1] : max, points[0][1]);
        //DIMENSÃO X           +     DIMENSÃO Y
        return [max_x + gridModule - min_x, max_y + gridModule - min_y, min_x, min_y, max_x + gridModule, max_y + gridModule];
    }

}