export function slugify(title: string): string {
    let slugArr = '';

    for (let i = 0; i < title.length; i++) {
        if (i > 30) break;

        let char = title[i].toLowerCase();

        if (char === ' ') slugArr += '-'
        else slugArr += char;
    }

    return slugArr;
}