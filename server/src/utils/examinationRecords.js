export function getTrimmedBody(body){
    for (let key in body) {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
        }
    }
    return body;
}