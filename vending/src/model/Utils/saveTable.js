export function saveTable(table) {
    let tableData = [];

    for (let i = 1; i < table.rows.length; i++) {
        let rowData = [];
        for (let cell of table.rows[i].cells) {
            if (cell.cellIndex !== 3) {
                rowData.push(cell.innerHTML);
            }
        }
        tableData.push(rowData);
    }

    localStorage.setItem("item-tree", JSON.stringify(tableData));
}