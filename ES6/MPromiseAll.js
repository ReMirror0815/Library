function promiseAll(arr) {
  var result = [];
  var successCount = 0;
  return new Promise((resolve, reject) => {
      arr.forEach((item, index) => {
      item.then((a) => {
          result[index] = a;
          successCount++;
          if (successCount === arr.length) {
              resolve(result);
          }
      }).catch(fail => {
          reject(fail)
      })
  })
  })
}