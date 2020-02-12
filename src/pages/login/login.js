import './login.scss'

$(function () {
  if(top.location != self.location){
    top.location = self.location //防止页面被框架包含
  }
  layui.use('form')
})