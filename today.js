let sortDirection = false;
let headData = [
    {class: 'Math', asignment: 'read', due: '1'}
];

window.onload = () => {
    loadHeadData(headData);
};

function loadHeadData(headData) {
    const tableBody = document.getElementById('headerData');
    let dataHtml = '';

    for(let head of headData) {
        dataHtml += `<tr><td>${head.class}</td><td>${head.asignment}</td><td>${head.due}</td>
        </tr>`;
    }

    tableBody.innerHTML = dataHtml;
}