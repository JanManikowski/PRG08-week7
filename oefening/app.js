import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({task: 'regression', debug: false})

//
// demo data
//
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
        for (let by = 1970; by <= 2010; by += 1) {
                const prediction = await nn.predict({Buildyear: by})       
                predictions.push({x: by, y: prediction[0].retailvalue})    
        }
        console.log(predictions)

        updateChart("Predictions", predictions)
}

function checkData(data) {
        data.sort(() => Math.random() > 0.5)   
        let trainData = data.slice(0, Math.floor(data.length * 0.8))    
        let testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        const chardata = data.map (house => ({
                x: house.Buildyear,
                y: house.retailvalue
        }))
        
        for (let row of trainData) {
                nn.addData({Buildyear:row.Buildyear}, {retailvalue: row.retailvalue})
        }

        nn.normalizeData()
        nn.train({ epochs:30}, ()=> drawPredictions())

        createChart(chardata)
}


loadData()


    

