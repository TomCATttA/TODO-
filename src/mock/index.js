import Mock from 'mockjs'
const baseURL = 'http://todo-list.za.net'
//定义登录的数据
//伪造一个用户的数据
const accountInfo = [
    {
    'account':'zzaa',
    'password':'123456',
    'id':'101',
    'username':'zzaa',
    'email':'1688888888@qq.com',
    'imgUrl':'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCLkvKDmmbrmlZnogrIrMVwiLFwiaWRcIjpcIjEzNjk1OTQ5NTQ3Mzk4NTk0NThcIixcInVzZXJuYW1lXCI6XCJ4aWFvdHV4aWFuMDAxXCJ9IiwiaWF0IjoxNjU1NDcxNTExLCJleHAiOjE2NTU3MzA3MTF9.pruHg2laVUHy84NHI8QFCkG2tzTbDy8ASAaHpm7iHxE",
    }
]

Mock.mock(`${baseURL}/login`,'post',(userInfo)=>{
    const body =JSON.parse(userInfo.body) 
    //查找是否有满足条件的用户
    const user = accountInfo.find(item=>
        (item.account === body.account) && (item.password === body.password)
    )
    //如果用户存在
    if(user){
        return{
            code:1,
            status:200,
            msg:'登录成功',
            result:{
                account:user.account,
                imgUrl:user.imgUrl,
                token:user.token,
                id:user.id,
                username:user.username,
                email:user.email
            }
        }
    }else{
    //如果用户不存在
        return{
            code:526,
            status:400,
            msg:'用户不存在或密码错误'
        }
    }
    
})

