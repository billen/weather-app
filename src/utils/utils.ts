const convertToCelsius = (kelvin: number, toFixed = 2) : string => {
    return (kelvin - 273.15).toFixed(toFixed);
}

export {
    convertToCelsius
}
    