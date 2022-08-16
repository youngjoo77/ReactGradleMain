const isNumber = (value: string | number | undefined) => {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

export { isNumber }