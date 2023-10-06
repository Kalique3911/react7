export const requireField = value => {
    if (value) {
        return undefined
    }

    return 'Field is required'
}

export const maxLengthCreator = maxLength => value => {
    if (value && value.length > maxLength) {
        return `Max Length is ${maxLength} Symbols`
    }

    return undefined
}