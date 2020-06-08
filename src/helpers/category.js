function getType(choosedType) {
    let type = 0;
    switch (choosedType) {
        case "PRZYCHODY":
            type = 1;
            break;
        case "WYDATKI":
            type = 0;
            break;
        default:
    }
    return type;
}

export {
    getType
};