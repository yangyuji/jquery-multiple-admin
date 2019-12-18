import './multiple.scss'
import $ from 'jQuery'
import layui from 'layui'

$(function () {
  if(top.location != self.location){
    top.location = self.location //防止页面被框架包含
  }
  oa.init()
})

const oa = {
  init() {
    layui.use('element')
    this.addEventListener()
  },
  tabChange(id) {
    const element = layui.element
    element.tabChange('layadmin-layout-tabs', id);
    $('#LAY_app_body ' + '#tabsbody-item-' + id).addClass('layui-show').siblings().removeClass('layui-show')
  },
  tabAdd(opt) {
    const element = layui.element
    $('#LAY_app_body .layui-show').removeClass('layui-show')
    $('#LAY_app_body').append([
      '<div id="tabsbody-item-' + opt.id + '" class="layadmin-tabsbody-item layui-show">'
        ,'<iframe src="'+ opt.url +'" frameborder="0" class="layadmin-iframe"></iframe>'
      ,'</div>'
    ].join(''))
    element.tabAdd('layadmin-layout-tabs', {
      title: '<span>'+ opt.text +'</span>'
      ,id: opt.id
      ,attr: opt.url
    })
    //标题切换到选项卡
    element.tabChange('layadmin-layout-tabs', opt.id)
  },
  addEventListener() {
    const that = this

    // 点击tab
    $('#LAY_app_tabsheader').on('click', 'li', function () {
      that.tabChange($(this).attr('lay-id'))
    })

    // 点击关闭tab
    $('#LAY_app_tabsheader').on('click', '.layui-tab-close', function (e) {
      console.log(11111, e.target)
    })

    // 点击关闭其他选项卡
    $('#layadmin-pagetabs-nav').on('click', 'a', function(e){
      const dd = $(this).parent()
      dd.removeClass('layui-this')
      dd.parent().removeClass('layui-show')
      const cmd = dd.data('event')


      if (cmd === 'closeThisTabs') {
        const cur_header = $('#LAY_app_tabsheader ' + '.layui-this')
        const cur_body = $('#LAY_app_body ' + '.layui-show')
        cur_header.prev().addClass('layui-this')
        cur_header.not('li[lay-id=desktop]').remove()
        cur_body.prev().addClass('layui-show')
        cur_body.not('#tabsbody-item-desktop').remove()
      }
      if (cmd === 'closeOtherTabs') {
        $('#LAY_app_tabsheader li:not(.layui-this)').not('li[lay-id=desktop]').remove()
        $('#LAY_app_body .layadmin-tabsbody-item:not(.layui-show)').not('#tabsbody-item-desktop').remove()
      }
      if (cmd === 'closeAllTabs') {
        const tab_header = $('#LAY_app_tabsheader li')
        const tab_body = $('#LAY_app_body .layadmin-tabsbody-item')
        tab_header.not('li[lay-id=desktop]').remove()
        tab_body.not('#tabsbody-item-desktop').remove()
        $('li[lay-id=desktop]').addClass('layui-this')
        $('#tabsbody-item-desktop').addClass('layui-show')
      }
    })
    
    //监听导航点击
    $('.layui-nav-child').on('click', 'a', function() {
      const target = $(this)
      const url = target.data('url');
      const id = target.data('id')
      if(!url) return;
      const isActive = $('#LAY_app_tabsheader').find("li[lay-id=" + id + "]")
      if(isActive.length > 0) {
        //切换到选项卡
        that.tabChange(id)
      } else {
        // 新增选项卡
        that.tabAdd({ id: id, url: url, text: target.data('text') })
      }
    })

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