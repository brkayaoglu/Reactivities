export interface ICar  {
    model:string,
    color:string,
    topSpeed?:number
}


const car1 = {
    model:"BMW",
    color:"red"
}

const car2 = {
    model:"BMW2",
    color:"reddd",
    topSpeed: 100
}

export const cars = [car1,car2];