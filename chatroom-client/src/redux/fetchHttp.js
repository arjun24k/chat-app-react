export const fetchData = async (addressHttp,dataToSend,headers,method) =>{
    const data = await fetch(addressHttp,{
        method,
        headers,
        body:JSON.stringify(dataToSend)
    }); 
    if(data.status >200)
        throw new Error('Error 404');
    return data.json();
}