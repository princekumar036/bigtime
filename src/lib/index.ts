// place files you want to import through the `$lib` alias in this folder.

export function normaliseName(input:String) {
    return input.replace(/[\s_-]+/g, '').toLowerCase();
}