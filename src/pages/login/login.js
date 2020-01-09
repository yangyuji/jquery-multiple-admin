import './login.scss'
import $ from 'jQuery'
import layui from 'layui'

$(function () {
  if(top.location != self.location){
    top.location = self.location //防止页面被框架包含
  }
  layui.use('form')
})