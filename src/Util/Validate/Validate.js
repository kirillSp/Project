export let requiredField = (val) => {
    if (!val) return "Error, field is required";
    return undefined;
}

export let maxLengthCreator = (maxLength) => (val) => {
    if (val.length > maxLength) return `Error, max length if ${maxLength} symbols`;
    return undefined;
}