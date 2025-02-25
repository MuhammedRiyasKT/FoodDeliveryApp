import axios from "axios"


const commonApi = async (httPMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httPMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"content-type":"application/json"}
    }

    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}

export default commonApi;