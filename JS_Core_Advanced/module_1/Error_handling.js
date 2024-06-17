function catchErr(obj, property) {
    try {
        return obj[property];
    } catch (error) {
        console.error('TypeError');
    }
}

let obj = undefined;
catchErr(obj, 'property');
