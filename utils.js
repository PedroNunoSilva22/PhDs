let data;

const univs = {
    "Universidade do Porto": ["University of Porto",[0, 0]],
    "Universidade de Trás-os-Montes e Alto Douro": ["University of Trás-os-Montes and Alto Douro",[1, 0]],
    "Universidade do Minho": ["University of Minho",[2, 0]],
    "Universidade de Lisboa": ["University of Lisbon",[3, 0]],
    "Universidade Católica Portuguesa": ["Portuguese Catholic University",[4, 0]],
    "Universidade Técnica de Lisboa": ["Technical University of Lisbon",[5, 0]],
    "Universidade Nova de Lisboa": ["NOVA University Lisbon",[6, 0]],
    "ISCTE - Instituto Universitário de Lisboa": ["Iscte - University Institute of Lisbon",[7, 0]],
    "-": ["Unknown",[8, 0]],
    "Universidade Portucalense Infante D. Henrique": ["Portucalense Infante D. Henrique University",[9, 0]],
    "Universidade Fernando Pessoa": ["Fernando Pessoa University",[10, 0]],
    "Universidade Lusófona do Porto": ["Lusophone University of Porto",[11, 0]],
    "Universidade Lusíada do Porto": ["Lusíada University of Porto",[12, 0]],
    "Universidade Lusíada de Vila Nova de Famalicão": ["Lusíada University of Vila Nova de Famalicão",[13, 0]],
    "Universidade Lusíada - Norte": ["Lusíada University - North",[14, 0]],

    "Universidade de Aveiro": ["University of Aveiro",[0, 1]],
    "Universidade de Coimbra": ["University of Coimbra",[1, 1]],
    "Universidade da Beira Interior": ["University of Beira Interior",[2, 1]],
    "Universidade de Évora": ["University of Évora",[3, 1]],
    "Universidade do Algarve": ["University of the Algarve",[4, 1]],
    "Universidade dos Açores": ["University of the Azores",[5, 1]],
    "Universidade da Madeira": ["University of Madeira",[6, 1]],
    "Universidade Lusíada": ["Lusíada University",[7, 1]],
    "Universidade Autónoma de Lisboa Luís de Camões": ["Autonomous University of Lisbon",[8, 1]],
    "Universidade Aberta": ["Universidade Aberta",[9, 1]],
    "Universidade Lusófona de Humanidades e Tecnologias": ["Lusophone University of Humanities and Technologies",[10, 1]],
    "ISPA-Instituto Universitário de Ciências Psicológicas, Sociais e da Vida": ["ISPA - Institute of Applied Psychology",[11, 1]],
    "Universidade Europeia": ["European University",[12, 1]],
    "Instituição Estrangeira": ["Foreign Institution",[13, 1]],
    "DGES": ["DGES - Directorate General for Higher Education",[14, 1]]
};

let colors = [
    [0, 255, 0],   //GREEN
    [255, 0, 255], //PINK
    [255, 0, 0], //RED
    [0, 0, 255], //BLUE
    [0, 255, 255],  //CYAN
    [255, 255, 0], //YELLOW
];

const dominios = {

    "Filosofia, Ética e Religião": [colors[0], 0],
    "Línguas e Literaturas": [colors[0], 0],
    "Outras Humanidades": [colors[0], 0],
    "História e Arqueologia": [colors[0], 0],
    "Artes": [colors[0], 0],


    "Psicologia": [colors[1], 1],
    "Sociologia": [colors[1], 1],
    "Economia e Gestão": [colors[1], 1],
    "Ciências Políticas": [colors[1], 1],
    "Ciências da Comunicação": [colors[1], 1],
    "Geografia Económica e Social": [colors[1], 1],
    "Ciências da Computação e da Informação": [colors[1], 1],
    "Outras Ciências Sociais": [colors[1], 1],
    "Direito": [colors[1], 1],


    "Matemática": [colors[2], 2],
    "Química": [colors[2], 2],
    "Física": [colors[2], 2],
    "Ciências da Terra e Ciências do Ambiente": [colors[2], 2],
    "Ciências Biológicas": [colors[2], 2],
    "Outras Ciências Naturais": [colors[2], 2],
    "Ciências da Educação": [colors[2], 2],


    "Engenharia Electrotécnica, Electrónica e Informática": [colors[3], 3],
    "Engenharia Civil": [colors[3], 3],
    "Engenharia dos Materiais": [colors[3], 3],
    "Engenharia Química": [colors[3], 3],
    "Engenharia Médica": [colors[3], 3],
    "Engenharia Mecânica": [colors[3], 3],
    "Engenharia do Ambiente": [colors[3], 3],
    "Nanotecnologia": [colors[3], 3],
    "Outras Ciências da Engenharia e Tecnologias": [colors[3], 3],
    "Biotecnologia Industrial": [colors[3], 3],
    "Biotecnologia Agrária e Alimentar": [colors[3], 3],
    "Biotecnologia Ambiental": [colors[3], 3],
    "Biotecnologia Médica": [colors[3], 3],
    "Ciência Animal e dos Lacticínios": [colors[3], 3],


    "Agricultura, Silvicultura e Pescas": [colors[4], 4],
    "Ciências Veterinárias": [colors[4], 4],
    "Outras Ciências Agrárias": [colors[4], 4],


    "Medicina Clínica": [colors[5], 5],
    "Medicina Básica": [colors[5], 5],
    "Ciências da Saúde": [colors[5], 5],
    "Outras Ciências Médicas": [colors[5], 5]
}

const mainDominios = {
    "Artes e Humanidades":
        ["Filosofia, Ética e Religião",
            "Línguas e Literaturas",
            "Outras Humanidades",
            "História e Arqueologia",
            "Artes"]
    ,
    "Ciências Sociais e Direito":
        ["Psicologia",
            "Sociologia",
            "Economia e Gestão",
            "Ciências Políticas",
            "Ciências da Comunicação",
            "Geografia Económica e Social",
            "Ciências da Computação e da Informação",
            "Outras Ciências Sociais",
            "Direito"]
    ,
    "Ciências e Matemática":
        ["Matemática",
            "Química",
            "Física",
            "Ciências da Terra e Ciências do Ambiente",
            "Ciências Biológicas",
            "Outras Ciências Naturais",
            "Ciências da Educação"]
    ,
    "Engenharias e Indústria":
        ["Engenharia Electrotécnica, Electrónica e Informática",
            "Engenharia Civil",
            "Engenharia dos Materiais",
            "Engenharia Química",
            "Engenharia Médica",
            "Engenharia Mecânica",
            "Engenharia do Ambiente",
            "Nanotecnologia",
            "Outras Ciências da Engenharia e Tecnologias",
            "Biotecnologia Industrial",
            "Biotecnologia Agrária e Alimentar",
            "Biotecnologia Ambiental",
            "Biotecnologia Médica",
            "Ciência Animal e dos Lacticínios"]
    ,
    "Agrária":
        ["Agricultura, Silvicultura e Pescas",
            "Ciências Veterinárias",
            "Outras Ciências Agrárias"]
    ,
    "Saúde":
        ["Medicina Clínica",
            "Medicina Básica",
            "Ciências da Saúde",
            "Outras Ciências Médicas"]
}

let universidades = [];

let grid = Array(1650).fill(null).map(() => Array(300).fill(0));//round(random(1))));;

function preload() {
    OCR = loadFont('Fonts/OCRAEXT.TTF');
    FK = loadFont('Fonts/FKRasterGrotesk-Sharp.ttf');
    data = loadJSON("Data/ppp.json");
}

function setupData() {

    data = Object.values(data);

    for (let i = 0; i < data.length; i++) {

        //FUNÇÃO TRAÇADO GLOBAL AQUI

        if (data[i].Area == "-") continue;
        if (data[i].UnivPT == "Instituto Universitário de Ciências da Saúde") continue;

        let index = universidades.findIndex(e => e.nome === univs[data[i].UnivPT][0]);

        if (index > -1) {
            // ——————————————————————————————> ALREADY CREATED <——————————————————————————————

            universidades[index].getFree(universidades[index].pos[0], universidades[index].pos[1]);
            let np = universidades[index].newPos();

            let novoPhD = new PhD(
                data[i].Name,
                data[i].Sex,
                data[i].UnivPT,
                data[i].Area,
                Object.keys(mainDominios).find(key => mainDominios[key].includes(data[i].Area)),
                data[i].Title,
                data[i].Ano,
                data[i].Realizado,
                np,
                "ze to");//code(index, i));

            if (universidades[index].PhDs.some(e => e.ano === novoPhD.ano) == false) {
                universidades[index].addBarrier(novoPhD.ano - 1);
            }

            universidades[index].PhDs.push(novoPhD);
            universidades[index].PhDsPoints.push(JSON.parse(JSON.stringify(novoPhD.pos)));
            PHDs.push(novoPhD);


        } else { // ——————————————————————————————> NOT CREATED <——————————————————————————————

            universidades.push(new Universidade(univs[data[i].UnivPT][0], univs[data[i].UnivPT][1]));

            let novoPhD = new PhD(
                data[i].Name,
                data[i].Sex,
                data[i].UnivPT,
                data[i].Area,
                Object.keys(mainDominios).find(key => mainDominios[key].includes(data[i].Area)),
                data[i].Title,
                data[i].Ano,
                data[i].Realizado,
                [universidades[universidades.length - 1].pos[0], universidades[universidades.length - 1].pos[1]],
                "ze to");//code(index, i));


            universidades[universidades.length - 1].PhDs.push(novoPhD);
            universidades[universidades.length - 1].PhDsPoints.push(JSON.parse(JSON.stringify(novoPhD.pos)));
            PHDs.push(novoPhD);

        }
    }

    for (let u = 0; u < universidades.length; u++) universidades[u].bounding_box();

}

function code(index, i) {
    //------------------------------------------------------------------------------------------------------
    //                                3 CODE LETTER (23 X 22 X 21)
    //------------------------------------------------------------------------------------------------------

    let codes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let codeX = "";
    if (index < 0) index = universidades.length - 1;


    codeX += codes[index];
    codes.splice(index, 1);

    for (let c = 0; c < 3; c++) {
        let ran = round(random(codes.length - 1));
        codeX += codes[ran];
        codes.splice(ran, 1);
    }
    return codeX;
}

let xxx = 0;
let xx = 50;
let yy = 50;
let yyy = 0;

//------------------------------ MINE --------------------------------------
let PHDstoGroup = [];

function runGrouping() {
    PHDstoGroup = [];
    xxx = 0;
    xx = 50;
    yy = 50;
    yyy = 0;

    for (let i = 0; i < universidades.length; i++) {
        if (universidades[i].activePhDs.length !== 0) PHDstoGroup.push(universidades[i].activePhDs);
    }
    PHDstoGroup = PHDstoGroup.flat();

    PHDstoGroup.sort((a, b) => a.ano - b.ano)
    

    grupos = nestGroupsBy(PHDstoGroup, order);
    let x = 0;
    let y = 50;

    let outSquare = 0;

    for (keys in grupos) {
        outSquare = grupos[keys].length;
        xxx += 100;
        xx = 0;
        yy = 50;
        //yyy +=400;

        if (Array.isArray(grupos[keys])) {
            groupPosition(grupos, keys, outSquare);

        } else {
            for (keys2 in grupos[keys]) {
                outSquare = grupos[keys][keys2].length;
                //xxx += round(Math.sqrt(outSquare)) + 25;
                xx = 0;
                yy = 50;

                if (Array.isArray(grupos[keys][keys2])) {
                    groupPosition(grupos[keys], keys2, outSquare)

                } else {
                    for (keys3 in grupos[keys][keys2]) {
                        outSquare = grupos[keys][keys2][keys3].length;
                        xx = 0;
                        yy = 50;
                        groupPosition(grupos[keys][keys2], keys3, outSquare);
                    }
                }
            }
        }
    }
}

function groupPosition(grupos, key, sqr) {

    let sqrtVal = round(Math.sqrt(sqr));

    for (val of grupos[key]) {

        if (xx % sqrtVal == 0) {
            xx = 0;
            yy += 1;
        }

        val.groupingPos = [xxx + xx, yyy / 10 + yy];
        xx++;

    }

    // QUADRADO ENVOLVENTE
    noFill();
    stroke(255);
    rect((xxx - 10) * 10, yyy + 40 * 10, (sqrtVal + 20) * 10, (sqrtVal + 20) * 10);
    xxx += sqrtVal + 25;


}


//---------------------------------------------------------------------------

function nestGroupsBy(arr, properties) {
    properties = Array.from(properties);
    if (properties.length === 1) {
        return groupBy(arr, properties[0]);
    }
    const property = properties.shift();
    var grouped = groupBy(arr, property);


    for (let key in grouped) {
        grouped[key] = nestGroupsBy(grouped[key], Array.from(properties));
    }
    return grouped;
}


let groups = {}

function groupBy(conversions, property) {
    return conversions.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
            groups[key] = 0;
        }
        acc[key].push(obj);
        groups[key]++;

        if (groups[key] % 200 == 0) {

        }
        return acc;
    }, {});
}

function evolution() {
    //------------------------------------------------------------------------------------------------------
    //              DRAW THE TRACES OF ALL PhDs TO SEE THEIR EVOLUTION OVER THE YEARS
    //------------------------------------------------------------------------------------------------------


    let x = 9000;
    let y = 500;
    let px = 9000;
    let py = 500;
    let inc = 2;
    for (let p = 0; p < data.length; p++) {


        if (data[p].Area == "-") continue;
        let c = dominios[data[p].Area][0];
        let r = dominios[data[p].Area][1];
        
        stroke(c);
        x = x + inc * cos(r * TWO_PI / 6);
        y = y + inc * sin(r * TWO_PI / 6);
        line(x, y, px, py);
        px = x;
        py = y;
        
    }
    //------------------------------------------------------------------------------------------------------

}