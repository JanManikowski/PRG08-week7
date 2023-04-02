import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({task: 'regression', debug: true})
const savebtn = document.getElementById('save-button');

function saveNN(){
        nn.save()
}

function loadData(){
        Papa.parse("./data/utrecht-houseprices.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    }

async function drawPredictions(data) {
        let predictions = []    
        for (let ha = 80; ha <= 260; ha += 1) {
                const prediction = await nn.predict({Housearea: ha})       
                predictions.push({x: ha, y: prediction[0].retailvalue})   
        }
        
        updateChart("Predictions", predictions)
        // nn.save()
}

function checkData(data) {
        data.sort(() => Math.random() > 0.5)   
        let trainData = data.slice(0, Math.floor(data.length * 0.8))    
        let testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        const chardata = data.map (house => ({
                x: house.Housearea,
                y: house.retailvalue
        }))
        
        for (let house of trainData) {
                nn.addData({Housearea:house.Housearea}, {retailvalue: house.retailvalue})
        }

        nn.normalizeData()
        nn.train({ epochs:10}, ()=> drawPredictions())


        async function makePrediction() {
                const testHouse = { Housearea: testData[0].Housearea, Gardensize: testData[0].Gardensize }
                const pred = await nn.predict(testHouse)
                console.log(pred[0].retailvalue)
        }

        createChart(chardata)
        makePrediction()
}





loadData()