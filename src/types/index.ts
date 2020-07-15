export type OptionsType = {
  sendType: "ajax" | 'image' | 'script';
  [propName: string]: any 
};

export type OptsType = {
  headers: HeadersType,
  url: string;
  [propName: string]: any 
};

type HeadersType = {
  [propName: string]: string
};