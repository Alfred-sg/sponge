export function stringify(params: any){
  let result = '';
  if ( !params ) return result;

  Object.keys(params).map(key => {
    const paramVal = params[key];
    if ( Array.isArray(paramVal) ){
      paramVal.forEach((val, idx) => {
        if ( val !== '' || val !== undefined )
          result += `&${key}[${idx}]=${encodeURIComponent(val)}`;
      });
    } else if ( paramVal !== '' || paramVal !== undefined ){
      result += `&${key}=${encodeURIComponent(paramVal)}`;
    };
  });

  return result;
};