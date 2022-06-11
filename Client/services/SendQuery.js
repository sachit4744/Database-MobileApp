const SendQuery = (query, database, dataset, setData, setCol, setTime, setLoading, setQueryStatus) => {
  console.log(query);
  // console.log(isSqlBtn);
  // console.log(isRsBtn);
  setLoading(true);
  fetch("http://192.168.1.196:5002/request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        isSqlBtn: database=="MySQL"?true:false,
        isRsBtn: database=="Redshift"?true:false,
        isInstaCart: dataset=="InstaCart"?true:false,
        isABC: dataset=="ABC"?true:false,
      }),
    })
      .then((response) => 
        // console.log(response)
        response.json()
        // console.log(code);
      )
      .then((responseJson) => {
        // console.log(responseJson);
        // console.log(code);
        // return responseJson;
        if (responseJson.Status === 200) {
          // console.log(responseJson.Response);
          let data = responseJson.Response;
          let cols = responseJson.Header;
          // return responseJson;
          setData(data);
          setCol(cols);
          // for(let i=0;i<data.length;i++) {
          //   console.log(data[i]);
          //   console.log("####")
          // }
          
          setTime(responseJson.ElapsedTime);
          setLoading(false);
          setQueryStatus("Success");
        } else {
          // We need to display the same screen with the error..
          setLoading(false);
          setData([[]]);
          setCol([]);
          setTime();
          // makeToolTipVisible();
          setQueryStatus(responseJson.Response)
          // alert(responseJson.Response);
        }
      })
      .catch((error) => {
        console.log("FROM ERROR");
        setLoading(false);
        console.log(error);
      });
};

export default SendQuery;
