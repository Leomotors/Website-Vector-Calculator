/**
 * * program.(js/ts)
 * * Core Program to run this website
 */

// TODO If possible add cookie.
var decimalPlaces: number = 2

// * VECTOR OPERATING & DISPLAY SECTION
// * Vector's Class containing i,j,k field and Method
class Vector {
    readonly i: number
    readonly j: number
    readonly k: number

    constructor(i: number, j: number, k: number) {
        this.i = i
        this.j = j
        this.k = k
    }

    // * Class Method (Vector Calculation)
    size(): number {
        let result: number = this.i * this.i + this.j * this.j + this.k * this.k
        return Math.sqrt(result)
    }
    multiply(multiplicand: number): Vector {
        let i: number = this.i * multiplicand
        let j: number = this.j * multiplicand
        let k: number = this.k * multiplicand
        return new Vector(i, j, k)
    }
    add(operand: Vector): Vector {
        let i: number = this.i + operand.i
        let j: number = this.j + operand.j
        let k: number = this.k + operand.k
        return new Vector(i, j, k)
    }
    subtract(operand: Vector): Vector {
        let i: number = this.i - operand.i
        let j: number = this.j - operand.j
        let k: number = this.k - operand.k
        return new Vector(i, j, k)
    }
    dotProduct(operand: Vector): number {
        let i: number = this.i * operand.i
        let j: number = this.j * operand.j
        let k: number = this.k * operand.k
        return i + j + k
    }
    crossProduct(operand: Vector): Vector {
        let i: number = this.j * operand.k - this.k * operand.j
        let j: number = this.k * operand.i - this.i * operand.k
        let k: number = this.i * operand.j - this.j * operand.i
        return new Vector(i, j, k)
    }

    // * Class Method that call other Method
    projectOn(operand: Vector): Vector {
        let projectedVectorRelSize: number = this.dotProduct(operand) / (operand.size() * operand.size())
        let w: Vector = operand.multiply(projectedVectorRelSize)
        return w
    }
    parallelogramArea(operand: Vector): number {
        return this.crossProduct(operand).size()
    }

    // * Method for formatted printing
    formattedPrint(): String {
        let i: string = this.i.toFixed(decimalPlaces)
        let j: string = this.j.toFixed(decimalPlaces)
        let k: string = this.k.toFixed(decimalPlaces)
        return `( ${i} , ${j} , ${k} )`
    }
}

// * Function that input Vector from <input>
function inputVector(VectorID: number = 1): Vector {
    let i: string, j: string, k: string

    if (VectorID == 1) {
        i = (<HTMLInputElement>document.getElementById("vector-i")).value
        j = (<HTMLInputElement>document.getElementById("vector-j")).value
        k = (<HTMLInputElement>document.getElementById("vector-k")).value
    }
    else {
        i = (<HTMLInputElement>document.getElementById("operand-i")).value
        j = (<HTMLInputElement>document.getElementById("operand-j")).value
        k = (<HTMLInputElement>document.getElementById("operand-k")).value
    }

    return new Vector(parseFloat(i), parseFloat(j), parseFloat(k))
}

// * Operation when <button> have been clicked
function Operation(choice: number): void {
    let ResultVector: Vector = null // * Store Result Vector
    let ResultTxt: string = "" // * Store Text to display

    switch (choice) {
        // * One Vector Operation
        case 1: ResultTxt = `Result is ${inputVector(1).size().toFixed(decimalPlaces)} unit(s).`
            break
        case 2:
            let multiplicand: number = parseInt(prompt("Please enter Multiplicand"))
            ResultTxt = `Result is ${inputVector(1).multiply(multiplicand).formattedPrint()}`
            break

        // * Two Vector Operation
        case 3:
            ResultVector = inputVector(1).add(inputVector(2))
            ResultTxt = `Result is ${ResultVector.formattedPrint()}`
            break
        case 4:
            ResultVector = inputVector(1).subtract(inputVector(2))
            ResultTxt = `Result is ${ResultVector.formattedPrint()}`
            break
        case 5:
            ResultTxt = `Result is ${inputVector(1).dotProduct(inputVector(2)).toFixed(decimalPlaces)}`
            break
        case 6:
            ResultVector = inputVector(1).crossProduct(inputVector(2))
            ResultTxt = `Result is ${ResultVector.formattedPrint()}`
            break
        case 7:
            ResultVector = inputVector(1).projectOn(inputVector(2))
            ResultTxt = `Result is ${ResultVector.formattedPrint()}`
            break
        case 8:
            ResultTxt = `Result is ${inputVector(1).parallelogramArea(inputVector(2)).toFixed(decimalPlaces)} sq.unit.`
            break
        default:
            ResultTxt = "Unknown Choice, is invalid or not implemented."
    }

    // * Clean Output
    let ResultClass: any = document.getElementsByClassName("ResultTxt")
    for (let element of ResultClass) {
        element.innerHTML = ""
    }

    // * Show Output
    if (choice <= 2)
        document.getElementById("ResultTxt01").innerHTML = ResultTxt
    else
        document.getElementById("ResultTxt02").innerHTML = ResultTxt
}

// * Set Display Decimal Places
function SetDecimalPlaces() {
    let inputNum: number = parseInt((<HTMLInputElement>document.getElementById("DecimalPlacesInput")).value)
    if (inputNum >= 0 && inputNum <= 50) {
        decimalPlaces = inputNum
        console.log(`Changed Decimal Places to ${inputNum}`)
    }
    else
        alert("Decimal Places must be between 0-50!")
}

// * BACKGROUND SETTINGS SECTION
// * Dictionary for Background Settings
var bgNameDict: object = {
    // ! Look like it's impossible to import from other file.
    // ! Unless host through server while this project want it to work locally.
    // * Key: Value of <option> in <select>
    // * Value: Another Dictionary of property:value as shown
    // ! File extension must be declared

    // * CATEGORY: Samsung Galaxy Wallpaper
    "Default01": {
        "displayname": "Default 01",
        "filelocation": "Samsung_Galaxy/Note_10_Wallpaper_Silver.jpg"
    },
    "Default02": {
        "displayname": "Default 02",
        "filelocation": "Samsung_Galaxy/Galaxy_Tab_S7_Wallpaper_9.jpg"
    },

    // * CATEGORY: Premium-Look Wallpaper
    "Gradient Giphy": {
        "displayname": "Gradient Giphy",
        "filelocation": "GIF/Gradient_Giphy.gif"
    },

    // * CATEGORY: Nature View
    "Hua Hin Sea Resort View": {
        "displayname": "Hua Hin Sea Resort View",
        "filelocation": "HuaHin_Luxury_Resort_View.jpg"
    },

    // * CATEGORY: Anime | アニメ
    "Elaina & Bubble Tea": { // * Source: 魔女の旅々
        "displayname": "Elaina & Bubble Tea (Cute)",
        "filelocation": "Anime/イレイナとชานมไข่มุก.jpg"
    },
    "Infinity Castle": { // * Source: 鬼滅の刃
        "displayname": "Infinity Castle",
        "filelocation": "Anime/無限城.jpg"
    },

    // * CATEGORY: Minecraft
    "Arendelle Castle": {
        "displayname": "MC: Arendelle Castle",
        "filelocation": "./Minecraft/Arendelle_Castle.jpg"
    },
    "Desert Village": {
        "displayname": "MC: Desert Village",
        "filelocation": "./Minecraft/Desert_Village.jpg"
    },
    "Nether Highway": {
        "displayname": "MC: Nether Highway",
        "filelocation": "./Minecraft/Nether_Highway_View.jpg"
    },
    "Ocean Village View": {
        "displayname": "MC: Ocean Village View",
        "filelocation": "./Minecraft/Ocean_Village_View.jpg"
    },
    "Rainy Day": {
        "displayname": "MC: Rainy Day",
        "filelocation": "./Minecraft/Rainy_Day.jpg"
    },
    "Snow Village": {
        "displayname": "MC: Snow Village",
        "filelocation": "./Minecraft/Snow_Village.jpg"
    },
    "Village Airview": {
        "displayname": "MC: Village Airview",
        "filelocation": "./Minecraft/Village_Airview.jpg"
    },
    "Void Ocean": {
        "displayname": "MC: Unpleasant Ocean",
        "filelocation": "./Minecraft/Void_Ocean.jpg"
    }
}

// * Add Select Options from Dictionary to HTML
function addBgOptions() {
    let optionNode = document.getElementById("bgOptions")
    for (let background in bgNameDict) {
        let bgOptionChildNode: HTMLOptionElement = document.createElement("option")
        bgOptionChildNode.value = background
        let displayText: Text = document.createTextNode(bgNameDict[background]["displayname"])
        bgOptionChildNode.appendChild(displayText)
        optionNode.appendChild(bgOptionChildNode)
    }
}

// * Set Background
function SetBackground() {
    let selectBg: string = (<HTMLInputElement>document.getElementById("bgOptions")).value
    let filelocation: string = `./assets/${bgNameDict[selectBg]["filelocation"]}`
    let bgString: string = `url(${filelocation})`
    document.getElementById("Body").style.backgroundImage = bgString
    console.log(`Set background to ${filelocation}`)
}
