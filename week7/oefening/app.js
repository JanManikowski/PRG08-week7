import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({task: 'regression', debug: true})

//
// demo data
//
function loadData(){
        Papa.parse("./data/cars.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    }

    async function drawPredictions() {
        let predictions = []    
        for (let hp = 40; hp <= 250; hp += 5) {
                const prediction = await nn.predict({horsepower: hp})       
                predictions.push({x: hp, y: prediction[0].mpg})    
        }

        updateChart("Predictions", predictions)
}

function checkData(data) {
        data.sort(() => Math.random() > 0.5)   
        let trainData = data.slice(0, Math.floor(data.length * 0.8))    
        let testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        const chardata = data.map (car => ({
                x: car.horsepower,
                y: car.mpg
        }))
        
        for (let row of trainData) {
                nn.addData({horsepower:row.horsepower}, {mpg: row.mpg})
        }

        nn.normalizeData()
        nn.train({ epochs:20}, ()=> drawPredictions())

        createChart(chardata)
}

loadData()


    

