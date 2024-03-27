const ResponseHandler = (toast) => {
    function handle(response,successHandler, failureHandler){
        if(response?.status==='SUCCESS' && response?.data){
            successHandler(response.data);
          } else {
            failureHandler(response?.message)
          }
    }
      return Object.freeze({
        handle
      })
}

export default ResponseHandler;