var myArray2 = [
    {'class':'Spainsh', 'work':'Read 20 mins', 'due':'11:00 AM'},
    {'class':'English', 'work':'Write Essay', 'due':'11:00 PM'},
    {'class':'Math', 'work':'Trig functions and parallel lines using math stuff', 'due':'11:00 PM'},
    {'class':'Science', 'work':'Study whales', 'due':'11:00 AM'},
]
buildTable2(myArray2)
function addElipses(x){
    var y;
    var z;

    if (x.length > 37) {
    y = x.substr(0, 37);
    z = y.substr(0, y.lastIndexOf(" "));
    return(z + "...");
    } else {
    return(x);
    }
}

function buildTable2(data){
    var table = document.getElementById('myTable2')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td class="classcolumn">${addElipses(data[i].class)}</td>
                        <td class="workcolumn">${addElipses(data[i].work)}</td>
                        <td class="duecolumn">${data[i].due}</td>
                  </tr>`
        table.innerHTML += row


    }
}

var myArray = [
    {'day':'Today', 'asignments':'You Have 5 Assignments'},
]

buildTable(myArray)
function buildTable(data){
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td class="daybox">${data[i].day}</td>
                        <td class="dayhead">${data[i].asignments}</td>
                  </tr>`
        table.innerHTML += row
    }
}
