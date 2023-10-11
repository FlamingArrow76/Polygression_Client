app.controller('CommController',['$scope',function($scope){

    window.response = ""

    var xml = new XMLHttpRequest();
    const url = "http://localhost:8080"
    xml.open('GET', url , true);
    xml.setRequestHeader('Access-Control-Allow-Origin', "*");
    xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xml.onreadystatechange = handleReceiveMessagesResponse

    $scope.sendData = function(){
        //console.log(lineValues)
        xml.open("POST", url, true);
        var data = JSON.stringify({"data": xyValues});
        xml.send(data);  
    }

    function renderLine(){
        
       
        //console.log(myChart.datasets)
        //console.log("bruh")
        //myChart.data.datasets[1].data = lineValues;
        //myChart.update();
        //console.log(myChart)
    } 

    function handleReceiveMessagesResponse() {       
        if (xml.readyState == 4) {
          response = xml.responseText;
          console.log(response)
          var obj = JSON.parse(response);
          console.log(obj)

          var lineChartData = {};
          lineChartData.labels = []; 
          lineChartData.datasets = []; 
          lineChartData.datasets.push({})
          var dataset = lineChartData.datasets[lineChartData.datasets.length-1]
          dataset.fillColor = "rgba(0,0,0,0)";
          dataset.strokeColor = "rgba(200,200,200,1)";
          dataset.data = [];



          var line_vals = []
          var k = obj.Constants;
          console.log(response["Constants"])
          var minx = 10**20;
          var maxx = -1*10**20;
          var a;
          for (var b in xyValues){
            a = xyValues[b]
            console.log(a.x)
            if (a.x > maxx){
              maxx = a.x
              console.log("big" + maxx)

            }
            if (a.x < minx){
              minx = a.x
              console.log("small" + minx)
            }
          }
          console.log(minx + " "+ maxx)
          for (var a = minx -1; a < maxx+1; a+=0.5){
              var line_co = {}
              line_co.x = a
              var b = 0
              for (var gh =0; gh< k.length; gh++ ){
                b += k[gh] * (a**gh); 
              }
              line_co.y = b;
              line_vals.push(line_co);
          }
          renderLine();
          //jQuery.getscript("js\controller\MainController.js", function(){
          //plotLine(lineValues);
          //});
   
          //lineValues = line_vals;
          //console.log(lineValues)
          
          //var ctx = document.getElementById("myChart");
          //console.log(ctx.dataset[1]);

          //myChart.data.datasets[1].data = line_vals;

          // var new_chart = new Chart("myChart", {
          //   type: "scatter",
          //   data: {
          //   datasets: [{
          //       pointRadius: 4,
          //       pointBackgroundColor: "rgba(0,0,255,1)",
          //       data: xyValues
          //   },
          //   {
          //     pointRadius: 4,
          //     pointBackgroundColor: "rgba(0,255,0,1)",
          //     data: line_vals
          //   }]
          //   },
          //   options:{plugins: {
          //       legend:{
          //           display: false
          //       }
          //   }}
          // });
          console.log("ended")

          //var ctx = document.getElementById("myChart");
          //console.log(ctx)

          //console.log(ctx.dataset.data.);

          //document.getElementById("myChart") = 
          
          //ctx = myChart;

        }
      }    
}])
