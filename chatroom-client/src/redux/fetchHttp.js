export const fetchData = async (addressHttp,{username,chatroom},headers) =>{
    const user = await fetch(addressHttp,{
        method:'post',
        headers,
        body:JSON.stringify({
            username,
            chatroom
        })
    }); 
    if(user.status >200)
        throw new Error('Error 404');
    return user.json();
}