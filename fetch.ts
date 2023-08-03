export const Fetch = async <T>(url:string)=>{
    const res = await fetch(url);
    return await res.json() as T
}