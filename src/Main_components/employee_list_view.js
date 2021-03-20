let gridView = document.querySelector('.grid-view');
let tableView = document.querySelector('.table-view');
let sortButton = document.querySelector('.sort-button');

tableView.addEventListener('click', makeTableView);
gridView.addEventListener('click', makeGridView);
sortButton.addEventListener('click', function () {
    sortEmployees('.employee-single')
});

export function makeTableView() {
    let cardsView = document.querySelectorAll('.employee-single');
    for (let view of cardsView) {
        view.classList.add('table-view');
    }
    tableView.classList.add('active');
    gridView.classList.remove('active');
    sortButton.style.display = 'block';
}

export function makeGridView() {
    let cardsView = document.querySelectorAll('.employee-single');
    for (let view of cardsView) {
        view.classList.remove('table-view');
    }
    tableView.classList.remove('active');
    gridView.classList.add('active');
    sortButton.style.display = 'none';
}

export function sortEmployees(selector) {
    const nodeList = document.querySelectorAll(selector);
    const dict = {};
    const parent = nodeList[0].parentNode;
    nodeList.forEach(node => {
        const key = node.querySelector('.name').innerText;
        dict[key] = node;
        node.parentNode.removeChild(node);
    });
    const keys = Object.keys(dict);
    keys.sort().forEach(k => parent.appendChild(dict[k]));
}