
  const http = require('http');
  const url = require('url');
  const port = 80;
  
  const Player1 = 1;
  const Player2 = 2;

  const initData = {
    'C00': ' ',
    'C01': ' ',
    'C02': ' ',
    'C10': ' ',
    'C11': ' ',
    'C12': ' ',
    'C20': ' ',
    'C21': ' ',
    'C22': ' '
  };

  var data = {...initData}


  const requestHandler = (request, response) => {

    var storage = url.parse( request.url, true).query;

    var typeTest = /^[1-2]$/;
    var xyTest = /^[0-2]$/;
    var x = storage.x;
    var y = storage.y;
    var type = storage.type;

    var index = "C" + x + y;
    switch(request.method){

      case 'PUT':
      if(data[index] == ' '){
        if(xyTest.test(x) && xyTest.test(y)){
          if(typeTest.test(type)){
            type = type.replace(/1/i, 'X');
            type = type.replace(/2/i, 'O');
            data[index] = type;
            
            for(var key in data) {
              response.write(data[key] + '  ');
              if(key == 'C02' || key == 'C12' || key == 'C22'){
                response.write(' \n');
              }
              
          }
        }else{
          response.end('Тип должен быть 1 или 2.')
        }
      }else{
        response.end('Координаты должны быть цифрой от 0 до 2.')
      }
    }else{
      response.end('Вы не можете изменять занятую клетку.')
    }


      
    break;
      case "DELETE":
          data = {...initData};
        response.end(JSON.stringify(data))
      break
      default: response.end('Другие методы запрещены!')
    }

    response.end('')
    // response.end(JSON.stringify(storage))

    console.log(request.url)
    // console.log(Object.keys(storage))

  }

  const server = http.createServer(requestHandler)

  
  server.listen(port, (err) => {
      if (err) {
          return console.log('something bad happened', err)
      }
      console.log(`server is listening on ${port}`)
  })