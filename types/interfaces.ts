export interface IResult {
	img: string;
	url: string;
}

export interface DeepArray<T> extends Array<T | DeepArray<T>> {}
