import { createChart, updateChart } from "./scatterplot.js"
const nn = ml5.neuralNetwork({task: 'regression', debug: true})
let testData = []
function loadData(){
        Papa.parse("./data/utrecht-houseprices.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
}
loadData()

function checkData(data) {
        data.sort(() => Math.random() > 0.5)   
        let trainData = data.slice(0, Math.floor(data.length * 0.8))    
        testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        // const chardata = data.map (house => ({
        //         x: house.Housearea,
        //         y: house.retailvalue
        // }))
        
        for (let house of trainData) {
                nn.addData({Housearea:house.Housearea, Gardensize: house.Gardensize, Balcony: house.Balcony, Buildyear:house.Buildyear, bathrooms: house.bathrooms}, {retailvalue: house.retailvalue})
        }

        nn.normalizeData()
        nn.train({ epochs:30}, ()=> makePrediction())

        // createChart(chardata)
        // makePrediction()
}

async function makePrediction() {
        const testHouse = { Housearea: testData[0].Housearea, Gardensize: testData[0].Gardensize }
        const pred = await nn.predict(testHouse)
        console.log(pred[0].retailvalue)
}

// async function drawPredictions(data) {
//         let predictions = []    
//         for (let ha = 80; ha <= 260; ha += 1) {
//                 const prediction = await nn.predict({Housearea: ha})       
//                 predictions.push({x: ha, y: prediction[0].retailvalue})   
//         }
        
//         updateChart("Predictions", predictions)
// }

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  nn.save();
  console.log("Model saved!");
});







