import './index.scss'
import $ from 'jquery'
import layui from 'layui'

$(function () {
  layui.use('element', function () {
    var element = layui.element
    console.log(element)
  })
  oa.init()
})

const oa = {
  init() {
    this.addEventListener()
  },
  addEventListener() {
    $('.open_shrink').click(function () {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $('.layui-side').stop().animate({ left: -220 }, 300);
        $('.layui-body').stop().animate({ left: 0 }, 300);
      } else {
        $(this).addClass('open')
        $('.layui-side').stop().animate({ left: 0 }, 300);
        $('.layui-body').stop().animate({ left: 220 }, 300);
      }
    })
  }
}