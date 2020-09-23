// export const ApiCall = (headers, type, method, parms, callback) => {
//     console.log(parms)
//      var url = 'http://3.12.64.95:3000/api/v1/' + method;
//      fetch(url, {
//          method: type != null ? type : 'POST',
//          headers: headers != null ? headers : {
//              Accept: 'application/json',
//              'Content-Type': 'application/json',
//              //'Content-type':'multipart/form-data'
//          },
//          body: parms
//      })
//          .then((response) => response.json())
//          .then((responseJson) => {
//           //  console.log(responseJson)
//              // return responseJson;
//              callback({error: false, data: responseJson});
//          })
//          .catch((error) => {
//             //  console.error(error);
//             //  alert(error)
//             //  callback({ data: error });
//             callback({error: true, data: error});
//          });
//  }

export const ApiCall = (method, parms, callback) => {
    console.log(parms)
     var url = 'http://18.156.66.145/public/api/auth/' + method;
     fetch(url, {
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
            //  'Content-type':'multipart/form-data'
         },
         body: JSON.stringify(parms)
     })
         .then((response) => response.json())
         .then((responseJson) => {
          //  console.log(responseJson)
             // return responseJson;
             callback({error: false, data: responseJson});
         })
         .catch((error) => {
            //  console.error(error);
            //  alert(error)
            //  callback({ data: error });
            callback({error: true, data: error});
         });
 }

 export const ApiCallWithImage = (method, parms, callback) => {
    console.log(parms)
     var url = 'http://18.156.66.145/public/api/detailer/' + method;
     fetch(url, {
         method: 'POST',
         headers: {
          Accept: 'application/json', 
             'Content-Type': 'multipart/form-data',
            //  'Content-Type': 'application/json'
         },
         body: parms
     })
         .then((response) => response.json())
         .then((responseJson) => {
          //  console.log(responseJson)
             // return responseJson;
             callback({error: false, data: responseJson});
         })
         .catch((error) => {
            //  console.error(error);
            //  alert(error)
            //  callback({ data: error });
            callback({error: true, data: error});
         });
 }

 
 export const CallGetApi = (method, callback) => {
     var url = 'http://18.156.66.145/public/api/' + method;
     fetch(url, {
         method: 'GET',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
            
            //  'Content-type':'multipart/form-data'
         }
     })
         .then((response) => response.json())
         .then((responseJson) => {
          //  console.log(responseJson)
             // return responseJson;
             callback({error: false, data: responseJson});
         })
         .catch((error) => {
            //  console.error(error);
            //  alert(error)
            //  callback({ data: error });
            callback({error: true, data: error});
         });
 }
 export const  CallApi = (method, parms, callback) => {
   console.log(parms)
     var url = 'http://18.156.66.145/public/api/' + method;
     fetch(url, {
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
            //  'Content-type':'multipart/form-data'
         },
         body: JSON.stringify(parms)
     })
         .then((response) => response.json())
         .then((responseJson) => {
          //  console.log(responseJson)
             // return responseJson;
             callback({error: false, data: responseJson});
         })
         .catch((error) => {
            //  console.error(error);
            //  alert(error)
            //  callback({ data: error });
            callback({error: true, data: error});
         });
 }