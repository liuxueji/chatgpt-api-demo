const express = require('express')

const app = express()

const cors = require('cors');

app.use(cors())

app.listen(8000,()=>{
  console.log('服务器已经启动');
  
})

app.all('/chat',(request,response)=>{
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Headers','*');
  example(request,response)
})

const example = async (request,response) =>{
  const { ChatGPTAPI } = await import('chatgpt')
  console.log('request',request.query.issue)
  const api = new ChatGPTAPI({
    sessionToken:'your token',
    markdown:false
  })

  await api.ensureAuth()

  const answer = await api.sendMessage(
    request.query.issue
  )

  const data = { issue: request.query.issue,answer:answer}
  response.send(JSON.stringify(data));
  console.log(data)
}