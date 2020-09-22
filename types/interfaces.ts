export interface IResult {
	img: string;
	link: string;
}

export interface DeepArray<T> extends Array<T | DeepArray<T>> {}
