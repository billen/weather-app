
type CitiesType = {
    [key:string] : City 
}

type City = {
    id: number;
    city: string;
    country: string;
}

const Cities : CitiesType = {
    'Toronto': { city: 'Toronto', id: 6167865, country: 'CA'},
    'Tokyo': { city: 'Tokyo', id: 1850147, country: 'JP' },
    'Ottawa': { city: 'Ottawa', id: 6094817, country: 'CA' }
};


export default  Cities;
export type { City, CitiesType };
