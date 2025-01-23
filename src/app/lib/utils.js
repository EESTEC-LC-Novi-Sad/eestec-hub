/**
* @param {String} def 
* @param {Number} n 
* */
function trimProjectDescription(def, n) {
    if (def.length <= n) return def;
    
    return def.slice(0, n - 3) + "...";
}


export {
    trimProjectDescription
}
