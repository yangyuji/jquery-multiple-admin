import './login.scss'
import $ from 'jQuery'

$(function () {
  if(top.location != self.location){
    top.location = self.location //防止页面被框架包含
  }
})