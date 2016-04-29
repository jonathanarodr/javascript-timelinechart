function simulateChart(chartMode, start, end){
    var options = {
        mode: {type: chartMode} //month,day,hour
       ,title: {value: "Chart - " + chartMode}
       ,time: {start: start, end: end}
    };
    
    var data = [];
    
    switch (chartMode) {
        case "month" :
            data.push(addRow("1","activity 1",new Date(2015,00,01,0,0,0),new Date(2015,11,31,23,59,59),""));
            data.push(addRow("2","activity 2",new Date(2015,04,01,0,0,0),new Date(2015,06,26,23,59,59),""));
            data.push(addRow("3","activity 3",new Date(2015,03,01,0,0,0),new Date(2015,09,14,23,59,59),""));
            data.push(addRow("4","activity 4",new Date(2015,07,01,0,0,0),new Date(2015,11,21,23,59,59),""));
            break;
        case "day" :
            data.push(addRow("1","activity 1",new Date(2015,00,01,0,0,0),new Date(2015,00,05,23,59,59),""));
            data.push(addRow("2","activity 2",new Date(2015,00,21,0,0,0),new Date(2015,00,26,23,59,59),""));
            data.push(addRow("3","activity 3",new Date(2015,00,06,0,0,0),new Date(2015,00,10,23,59,59),""));
            data.push(addRow("4","activity 4",new Date(2015,00,01,0,0,0),new Date(2015,00,10,23,59,59),""));
            data.push(addRow("4","activity 4",new Date(2015,00,14,0,0,0),new Date(2015,00,19,23,59,59),""));
            data.push(addRow("4","activity 4",new Date(2015,00,21,0,0,0),new Date(2015,00,22,23,59,59),""));
            data.push(addRow("5","activity 5",new Date(2015,00,29,0,0,0),new Date(2015,00,31,23,59,59),""));
            data.push(addRow("6","activity 6",new Date(2015,00,02,0,0,0),new Date(2015,00,07,23,59,59),""));
            break;
        case "hour" :
            data.push(addRow("1","activity 1",new Date(2015,00,01,10,0,0),new Date(2015,00,01,13,0,0),""));
            data.push(addRow("2","activity 2",new Date(2015,00,01,07,0,0),new Date(2015,00,01,10,30,0),""));
            data.push(addRow("2","activity 2",new Date(2015,00,01,13,0,0),new Date(2015,00,01,22,25,0),""));
            break;
        default : return;
    }
    
    drawChart(data, options);
}