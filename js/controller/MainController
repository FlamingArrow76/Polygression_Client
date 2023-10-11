app.controller('MainController',['$scope',function($scope, $rootScope){
    var xml = new XMLHttpRequest();
    const url = "http://localhost:8080"
    //const url = "http://13.40.32.239:8080"
    
    xml.open('GET', url , true);
    xml.setRequestHeader('Access-Control-Allow-Origin', "*");
    xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xml.onreadystatechange = handleReceiveMessagesResponse

    const slid_in = document.getElementById('rangeinput');
    const slid_out = document.getElementById('rangevalue');
    slid_out.innerHTML = slid_in.value;

    const inputHandler = function(e) {
        slid_out.innerHTML = slid_in.value;
    }
    slid_in.addEventListener('input', inputHandler);
    slid_in.addEventListener('propertychange', inputHandler)


    $scope.sendData = function(){
        xml.open("POST", url, true);
        var data = JSON.stringify({"data": xyValues, "power" : slid_in.value});
        xml.send(data);  
    }
    
    $scope.increment_power = function(){
        slid_in.value  = parseInt(slid_in.value) + 1;
        slid_out.innerHTML = slid_in.value;
    }
    $scope.decrement_power = function(){
        slid_in.value  = parseInt(slid_in.value) - 1;
        slid_out.innerHTML = slid_in.value;
    }
    


    xyValues = [
        {x:50, y:7},
        {x:60, y:8},
        {x:70, y:3}
    ];
    lineValues =[
        {x: 10, y: 37}, 
        {x: 20, y: 40}, 
        {x: 30, y: 50}
    ];
    

    var myChart = new Chart("myChart", {
        type: "scatter",
        data: {
            labels: ['Sactter','line'],
            datasets: [{
                type: 'scatter',
                pointRadius: 4,
                pointBackgroundColor: "rgba(0,0,255,1)",
                data: xyValues
            },
            {
                type: 'line',
                pointRadius: 1,
                pointBackgroundColor: "rgba(0,255,0,1)",
                data: lineValues
            }]
        },
        options:{plugins: {
            legend:{
                position: 'bottom',
                display: true,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        }}
    });

    $scope.colist ={
        title: "Co-ordinates",
        list: []
    }

    var plotItem = function(xyValues){
        myChart.data.datasets[0].data = xyValues;
        myChart.update();
    }
    var plotLine = function (lineValues){
        
        myChart.data.datasets[1].data = lineValues;
        myChart.update();
    }

    $scope.addItem = function(itemlist, item_x, item_y) {
        console.log(item_x.length , item_y.length )
        console.log("'" + item_x + "'")
        console.log(item_x.value);
        var x_in = document.getElementById("x_input")
        var y_in = document.getElementById("y_input")
        console.log(x_in.value);
        console.log(x_in.value.length);
        
        if(x_in.value.length > 0 && y_in.value.length> 0){
            itemlist.push(parseFloat(item_x) + ' , ' + parseFloat(item_y))
            xyValues.push({x: parseFloat(item_x), y: parseFloat(item_y)})
            
            x_in.value = ""
            y_in.value = ""
            console.log(xyValues)
            plotItem(xyValues)

        }
        else{
            alert("Enter number into both fields");
        }
    };

    var script_dict ={
        2: '\u00B2',
        3: '\u00B3',
        4: '\u2074',
        5: '\u2075',
        6: '\u2076',
        7: '\u2077',
        8: '\u2078',
        9: '\u2079',
        0: '\u2070',
        1: '\u00B9'};   

    $scope.val_change = function(){
        var val = document.getElementById("slider_Val").innerHTML
        console.log(val)
    }
    


function handleReceiveMessagesResponse() {       
        if (xml.readyState == 4) {
          response = xml.responseText;
          console.log(response)
          var obj = JSON.parse(response);
          console.log(obj)

          var line_vals = []
          var consts = obj.Constants;
          console.log(response["Constants"])
          var minx = 'dec';
          var maxx = 'dec';
          for (var b in xyValues){
            var a = xyValues[b]
            if (a.x > maxx || maxx == 'dec'){
              maxx = a.x
            }
            if (a.x < minx || minx == 'dec'){
              minx = a.x
            }
          }
          console.log(minx + " "+ maxx)
          for (var co_it_x = minx -1; co_it_x <= maxx+1; co_it_x+=0.1){
              var line_co = {}
              line_co.x = co_it_x
              var b = 0
              for (var gh =0; gh< consts.length; gh++ ){
                b += consts[gh] * (co_it_x**gh); 
              }
              line_co.y = b;
              line_vals.push(line_co);
          }
          var content = "";
          for (var gh =0; gh< consts.length; gh++ ){
    
            var selec_num = ((consts[gh][0]).toPrecision(3))

            if (gh == 0){
                content += `${selec_num} `;
                continue
            }
            if (selec_num < 0){
                content += " - "
                content += `${-1*selec_num}x`
            }
            else{
                content += " + "
                content += `${selec_num}x`;
            }
            if (gh>1){
                content+= script_dict[gh] +" "
            }
            }
          var lab = document.getElementById("Formula")  
          lab.innerHTML = content;
          console.log(content)
          plotLine(line_vals);
        }
    }  
}])


        //   var lineChartData = {};
        //   lineChartData.labels = []; 
        //   lineChartData.datasets = []; 
        //   lineChartData.datasets.push({})
        //   var dataset = lineChartData.datasets[lineChartData.datasets.length-1]
        //   dataset.fillColor = "rgba(0,0,0,0)";
        //   dataset.strokeColor = "rgba(200,200,200,1)";
        //   dataset.data = [];
