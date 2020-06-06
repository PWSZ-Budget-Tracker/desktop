function getType(choosedType) {
    let type = 0;
    switch (choosedType) {
        case "PRZYCHODY":
            type = 0;
            break;
        case "WYDATKI":
            type = 1;
            break;
        default:
    }
    return type;
}

export {
    getType
};