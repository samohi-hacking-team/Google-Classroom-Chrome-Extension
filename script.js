let sortDirection = false;
let workData = [
    {class: 'English', asignment: 'read', due: '1'},
    {class: 'English', asignment: 'read', due: '2'},
    {class: 'English', asignment: 'read', due: '3'},
    {class: 'English', asignment: 'read', due: '4'},
    {class: 'English', asignment: 'read', due: '5'}
];

window.onload = () => {
    loadTableData(workData);
};

function loadTableData(workData) {
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';

    for(let work of workData) {
        dataHtml += `<tr><td>${work.class}</td><td>${work.asignment}</td><td>${work.due}</td>
        </tr>`;
    }

    tableBody.innerHTML = dataHtml;
}