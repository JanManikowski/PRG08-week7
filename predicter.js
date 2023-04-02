const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

function modelLoaded() {

      const houseAreaField = document.getElementById('houseArea')
      const gardenSizeField = document.getElementById("gardenSize")
      const bathroomsField = document.getElementById('bathrooms')
      const balconyField = document.getElementById('balcony')
      const buildyearField = document.getElementById('buildyear')

      const predictBtn = document.getElementById('btn')
      const result = document.getElementById('result')

      predictBtn.addEventListener("click", predict)

      async function predict() {

        const Housearea = Number(houseAreaField.value)
        const Gardensize = Number(gardenSizeField.value)
        const bathrooms = Number(bathroomsField.value)
        const Balcony = Number(balconyField.value)
        const Buildyear = Number(buildyearField.value)

        console.log("Input values are: ", {Housearea, Gardensize,bathrooms, Balcony, Buildyear })

        const predResult = await nn.predict({Housearea, Gardensize,bathrooms, Balcony, Buildyear})

        console.log(predResult)

        const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
        const estimatedPrice = fmt.format(predResult[0].retailvalue)

        result.innerText = `Voorspelde prijs is: ${estimatedPrice}`
        console.log(estimatedPrice)
      }  

}


  
  
  
  



