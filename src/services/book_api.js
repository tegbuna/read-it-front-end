export function searchByTitle(search) {
    try{
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCAyMgb1r4yk2y20hok9Cmz0sd_E4nrq3E`).then(res => res.json());
    } catch(error) {console.log(error)}
}

export function searchByAuthor(titleSearch, authorSearch) {
    try{
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleSearch}+inauthor:${authorSearch}&key=AIzaSyCAyMgb1r4yk2y20hok9Cmz0sd_E4nrq3E`).then(res => res.json());
    } catch(error) {console.log(error)}
}

//Google Books API Key: AIzaSyCAyMgb1r4yk2y20hok9Cmz0sd_E4nrq3E