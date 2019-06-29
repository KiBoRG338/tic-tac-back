
  const http = require('http');
  const url = require('url');
  const querystring = require('querystring')
  const port = 80;

  var data = {
  };
  // data.item = {name: 'apples'};
  // data.item.q = 10;

  console.log(data)

  const requestHandler = (request, response) => {
    //   var data = url.parse(request.url, true).query
    //   JSON.parse(text, data])
    //   response.end('Hello, ragul123!')





    var storage = url.parse( request.url, true).query;

    var re = /^(0|[1-9]\d*)([.,]\d+)?/;
    var item = storage.item;
    var q = +storage.q || 0;


    
    // response.end(JSON.stringify(url.parse( request.url, true).query)) ///
    // var a = request.url;
    switch(request.method){
      case 'DELETE': 
        delete data[item];
      break

      case 'POST': 

      if(re.test(q)){
        if(!data[item]){
          data[item] = q;

        }else{
          response.end('Значение этой переменной уже присвоено. Используйте метод "PUT"')
        }
      }else{
        response.end('Количество должно быть цифрой.')
      }


      
      break

      case 'PUT':

       if(re.test(q)){
        if(data[item]){
          data[item] = q;

        }else{
          response.end('Значение этой переменной ещё не присвоено. Используйте метод "POST"')
        }
      }else{
        response.end('Количество должно быть цифрой.')
      }

      break

      case 'GET': 
      response.end(JSON.stringify(data))
      break
    
      default: response.end('Другие методы запрещены!')
    }
    // console.log(data.c);
    response.end(JSON.stringify(storage))
    // console.log(Object.keys(data))
        // console.log(request.method);
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