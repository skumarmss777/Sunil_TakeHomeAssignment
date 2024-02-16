const fr= require('fs')
var output=[]
var beats=[]
var timestamp=[]
//using the file system module to load heartrate.json file
//and writing the json object to output.json file after computation
fr.readFile('./heartrate.json', 'utf-8',(err,jsonString)=>{

    if(err){
        console.log(err);

    }else{
        try{
            const data= JSON.parse(jsonString);            
            for(var key in data){             
                  output.push(data[key])              
                          }
            output.forEach(d=> {
                //pushing the beatsperminute key values to beats array
                beats.push(d.beatsPerMinute)
                //pushing the timestamps.endtime key values to timestamp array
                timestamp.push(d.timestamps.endTime)              
                               
            })
            //sorting the beats array in ascending order
            // before calculating the median
            beats.sort(function (a, b) { return a - b })
            //logic to calculate median from the beats-array 
            var number=beats.length-1
            const result = (number % 2  == 0) ? "even" : "odd";
            var minBeats=beats[0]
            var maxBeats=beats[beats.length-1]
            var pos=0,pos1=0,pos2=0
            var median=0
            if(result=="odd"){
                pos= (number+1)/2
                median=beats[pos]
            }else{
                pos1=number/2
                pos2=(number/2)+1
                var temp= (beats[pos1]+beats[pos2])/2
                median=temp

            }
            //displaying the values to terminal/console
            console.log("HeartBeat MIN: " + minBeats)
            console.log("HeartBeat MAX: "+ maxBeats)
            console.log("HeartBeat MEDIAN: "+ median)
            console.log("Latest TimeStamp:"+ timestamp[timestamp.length-1])
            var latestDate=String(timestamp[timestamp.length-1]).split("T",1)
            console.log("Date: "+ latestDate[0])
            //writing the calculated output to output.json file
            var jsonObject=[]
            const newObject={
                "date":latestDate[0],
                "min":minBeats,
                "max":maxBeats,
                "median":median,
                "latestDateTimeStamp":timestamp[timestamp.length-1]
            };
            jsonObject.push(newObject)
            fr.writeFileSync('./output.json',JSON.stringify(jsonObject))
        }catch(err){
            console.log('Error parsing JSON', err)
        }
    }

});
