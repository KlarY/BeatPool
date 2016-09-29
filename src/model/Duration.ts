const Quarter:number = 360360;

export enum Duration{
    full = Quarter * 4,
    half = Quarter * 2,
    quarter = Quarter,
    eighth = Quarter / 2
}

export let DurationPack:any = {
    full: Duration.full,
    half : Duration.half,
    quarter: Duration.quarter,
    eighth: Duration.eighth
};
