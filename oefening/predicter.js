const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

function predict(houseArea, gardenSize) {
    const input = {
      houseArea: houseArea,
      gardenSize: gardenSize
    };
    nn.predict(input, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      const predictedValue = result[0].value;
      console.log(`Predicted retail value: ${predictedValue}`);
    });
  }  
  
  
  
  

function modelLoaded() {

    const form = document.getElementById('houseForm');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const houseArea = document.getElementById('houseArea').value;
        const gardenSize = document.getElementById("gardenSize").value

        // const housePred = {houseArea, gardenSize}
        // const pred =  nn.predict(housePred)
        // console.log(pred[0].retailvalue)
        predict(houseArea, gardenSize);

        });

}

