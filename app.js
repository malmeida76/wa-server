const fs = require('fs');
const http = require('http');

const url = 'http://sistemarafael.us.to:8081/instance/fetchInstances';
const apiKey = 'mrla21010305FM231503@';
const options = {
    headers: {
      'apikey': apiKey,
    },
  };


const outputFilePath = 'saida.txt';

function filterOpenInstances(jsonData) {

    const filteredData = [];
    jsonData.forEach((instance) => {
        if (instance.instance.status === 'open') {
            filteredData.push(instance);
            console.log( JSON.stringify(instance, null, 2));
        }
    });
  return filteredData;

}

function writeDataToFile(data, path) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile(path, jsonData, (err) => {
    if (err) {
      console.error('Error writing data to file:', err);
    } else {
      console.log(`Successfully wrote filtered data to ${path}`);
    }
  });
}


http.get(url, options, (res) => {

    let data = '';

    res.on('data', (chunk) => {

      data += chunk;
      //console.log ( data );

    });

    res.on('end', () => {
      
        const jsonData = JSON.parse(data);

        // Tratar a jsonData aqui
        try {

            //console.log ( JSON.stringify(jsonData, null, 2) );

            const filteredData = filterOpenInstances(jsonData);

            //writeDataToFile(filteredData);

            //console.log( JSON.stringify(filteredData, null, 2) );
            console.log( 'REGISTROS ENCONTRADOS',filteredData.length )

        } catch (error) {

            console.error('Error parsing JSON data:', error);

        }
      
    });

});


