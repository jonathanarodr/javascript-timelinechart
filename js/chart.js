var arrayColor = new Array();
    
arrayColor[0] = "#5e97f6";
arrayColor[1] = "#db4437";
arrayColor[2] = "#25b870";
arrayColor[3] = "#ee8100";
arrayColor[4] = "#6a1b9a";
arrayColor[5] = "#f25b5b";
arrayColor[6] = "#ab47bc";
arrayColor[7] = "#f0cd0c";
arrayColor[8] = "#566887";
    
function randomColor(background, color) {
    if (background === "") {
        return arrayColor[color-1];
    }
    return background;
}

function calcMilliseconds(start, end) {
    return Date.UTC(end.getYear(),end.getMonth(),end.getDate(),end.getHours(),end.getMinutes(),end.getSeconds()) - Date.UTC(start.getYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes(),start.getSeconds());
}

function millisecondsToDays(millis) {
    return millis / 1000 / 60 / 60 / 24;
}

function millisecondsToHours(millis) {
    return millis / 1000 / 60 / 60;
}

function millisecondsToMinutes(millis) {
    return millis / 1000 / 60;
}

function millisecondsToSeconds(millis) {
    return millis / 1000;
}

function stringLimit(val){    
    if (val.toString().length > 13) {
        return val.substring(0,10) + "...";
    }
    return val;
}

function formatMonth(month) {
    var arrayMonth = new Array(12);
    
    arrayMonth[0] = "jan";
    arrayMonth[1] = "feb";
    arrayMonth[2] = "mar";
    arrayMonth[3] = "apr";
    arrayMonth[4] = "may";
    arrayMonth[5] = "jun";
    arrayMonth[6] = "jul";
    arrayMonth[7] = "aug";
    arrayMonth[8] = "sep";
    arrayMonth[9] = "oct";
    arrayMonth[10] = "nov";
    arrayMonth[11] = "dec";
    
    return arrayMonth[month];
}

function formatTime(secs) {
    var times = new Array(3600, 60, 1);
    var time  = "";
    var tmp;
   
    for(var i = 0; i < times.length; i++) {
        tmp = Math.floor(secs / times[i]);
      
        if(tmp < 1) {
            tmp = "00";
        } else if(tmp < 10) {
            tmp = "0" + tmp;
        }
      
        time += tmp;
      
        if(i < 2) {
            time += ":";
        }
      
        secs = secs % times[i];
   }
   
   return time;
}

function calcProgress(mode, startChart, start, end) {    
    var progress = [];

    switch (mode) {
        case "month": {
            progress.push((millisecondsToDays(calcMilliseconds(startChart, start))+1.2)*3);
            progress.push(millisecondsToDays(calcMilliseconds(start, end))*3);
            progress.push(start.toLocaleDateString() + " à " + end.toLocaleDateString());
            progress.push(Math.ceil(millisecondsToDays(calcMilliseconds(start, end))) + " days");
            break;
        }
        case "day": {
            progress.push((millisecondsToHours(calcMilliseconds(startChart, start))+2)*2);
            progress.push(millisecondsToHours(calcMilliseconds(start, end))*2);
            progress.push(start.toLocaleDateString() + " à " + end.toLocaleDateString());
            progress.push(Math.ceil(millisecondsToDays(calcMilliseconds(start, end))) + " days");
            break;
        }
        case "hour": {
            progress.push(millisecondsToMinutes(calcMilliseconds(startChart, start))+4);
            progress.push(millisecondsToMinutes(calcMilliseconds(start, end)));
            progress.push(start.toLocaleTimeString() + " à " + end.toLocaleTimeString());
            progress.push(formatTime(millisecondsToSeconds(calcMilliseconds(start, end))) + " hours");
            break;
        }
    }
   
    return progress;
}

function customChart(chartMode, start, end, title) {
    var options = {
        mode: {type: chartMode} //month,day,hour
       ,title: {value: title}
       ,time: {start: start, end: end}};
   
    return options;
}

function addRow(id, value, start, end, background) {
    var data = {id: id
                ,value: value
                ,start: new Date(start)
                ,end: new Date(end)
                ,background: background};
        
    return data;
}

function drawChart(dataTable, options){
    var htmlProc  = "";
    var htmlData  = "";
    var htmlSubt  = "<div class='subtitle'><ul>";
    var dataAux   = null;
    var dataLocal = null;
    var screenW   = 0;
    var id        = "";
    var color     = 1;
    var colorAux  = "";
    var isIE      = /*@cc_on!@*/false || !!document.documentMode;
    
    //criando gráfico
    var progress = null;
    for(var i=0; i<dataTable.length; i++) {
        progress = calcProgress(options.mode.type, 
                                new Date(options.time.start), 
                                new Date(dataTable[i].start), 
                                new Date(dataTable[i].end));
        
        if (dataTable[i].id === id) {
            htmlData += "<section class='data' style='background-color: " + colorAux + "; left: " + progress[0] + "px; width: " + progress[1] + "px;'><section><h4 style='color: " + colorAux + "'>" + dataTable[i].value + "</h4><p>Period: " + progress[2] + "</p><p>Duration: " + progress[3] + "</p></section></section>";
        } else {
            htmlProc = htmlProc.replace("@data" + id, htmlData);
            
            id        = dataTable[i].id;
            colorAux  = randomColor(dataTable[i].background, color);
            dataAux   = new Date(options.time.start);
            htmlData  = "<section class='data' style='background-color: " + colorAux + "; left: " + progress[0] + "px; width: " + progress[1] + "px;'><section><h4 style='color: " + colorAux + "'>" + dataTable[i].value + "</h4><p>Period: " + progress[2] + "</p><p>Duration: " + progress[3] + "</p></section></section>";   
            htmlProc  += "<div><section class='id'>" + stringLimit(dataTable[i].value) + "</section>@data" + id + "<ul>";
        
            while(dataAux <= new Date(options.time.end)) {
                htmlProc += "<li class='" + options.mode.type + "'></li>";

                switch (options.mode.type) {
                    case "month": {                    
                        if (i === 0) {
                            htmlSubt += "<li class='" + options.mode.type + "'><span>" + formatMonth(dataAux.getMonth()) + "/" + dataAux.getFullYear() + "</span></li>";   
                            screenW = 90;
                        }

                        dataAux.setMonth(dataAux.getMonth() + 1);
                        break;
                    }
                    case "day": {                   
                        if (i === 0) {
                            dataLocal = (isIE) ? dataAux.toLocaleDateString().substring(1,3) : dataAux.toLocaleDateString().substring(0,2);
                            htmlSubt += "<li class='" + options.mode.type + "'><span>" + dataLocal + "</span></li>";
                            screenW   = 48;
                        }

                        dataAux.setDate(dataAux.getDate() + 1);
                        break;
                    }
                    case "hour": {                    
                        if (i === 0) {
                            dataLocal = (isIE) ? dataAux.toLocaleDateString().substring(1,8) : dataAux.toLocaleDateString().substring(0,5);
                            htmlSubt += "<li class='" + options.mode.type + "'><span>" + dataLocal + "</span></li>";
                            screenW   = 60;
                        }

                        dataAux.setHours(dataAux.getHours() + 1);
                        break;
                    }
                }
            }
            
            htmlProc += "</ul></div>";
            

            if (color < arrayColor.length) {
                ++color;
            } else {
                color = 1;
            }
        }
    }
    
    htmlProc = htmlProc.replace("@data" + id, htmlData);
    
    //configurando gráfico
    document.getElementById("chart_title").innerHTML = options.title.value;
    document.getElementById("chart_data").innerHTML  = htmlProc + htmlSubt + "</ul></div>";
    
    var objData = document.getElementById("chart_data").getElementsByTagName("div");
    screenW += screenW * document.getElementsByClassName("subtitle")[0].childNodes[0].getElementsByTagName("span").length;
    
    for (var i=0; i<objData.length; i++) {
        objData[i].style.minWidth = screenW + "px";
    }
    
    //exibe gráfico final
    document.getElementById("chart_data").style.visibility = "visible";    
}
