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
    const that = this
    layui.use('element', function () {
      const element = layui.element
      element.on('tab(layadmin-layout-tabs)', function(data){
        that.tabBodyChange($(this).attr('lay-id'))
        that.changeLeftNavItem($(this).attr('lay-attr'))
      })
      element.on('tabDelete(layadmin-layout-tabs)', function(data){
        // 删除iframe
        $('#LAY_app_body').find('.layadmin-tabsbody-item').eq(data.index).remove()
        // 改变左侧菜单
        const url = $(this).parent().attr('lay-attr')
        that.changeLeftNavItem(url)
      })
    })
    this.addEventListener()
  },
  tabBodyChange(id) {
    $('#LAY_app_body #tabsbody-item-' + id).addClass('layui-show').siblings().removeClass('layui-show')
    this.scrollTabHeader('auto', id)
  },
  changeLeftNavItem(rmv) {
    // 删除全部
    $('#LAY-app-menu .layui-this').removeClass('layui-this')
    // 修改左侧菜单项的样式
    if (rmv) {
      const a = $('#LAY-app-menu').find('a[data-url="' + rmv + '"]')
      a.parent().removeClass('layui-this')
    }
    const cur_url = $('#LAY_app_body .layui-show').find('iframe').eq(0).attr('src')
    $('#LAY-app-menu').find('a[data-url="' + cur_url + '"]').eq(0).parent().addClass('layui-this')
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
  gotoTabUrl(fresh, id, url, text) {
    const isActive = $('#LAY_app_tabsheader li[lay-id=' + id + ']')
    if(isActive.length > 0) {
      // 点击标题切换到选项卡
      isActive.eq(0).trigger('click')
      if (fresh) {
        const _iframe = $('#tabsbody-item-' + id + ' .layadmin-iframe')
        _iframe.attr('src', _iframe.attr('src'))
      }
    } else {
      // 新增选项卡
      this.tabAdd({ id: id, url: url, text: text })
    }
  },
  scrollTabHeader(type, id){
    var tabsHeader = $('#LAY_app_tabsheader')
      ,liItem = tabsHeader.children('li')
      ,outerWidth = tabsHeader.outerWidth()
      ,tabsLeft = parseFloat(tabsHeader.css('left'))

    // 往左滚动
    if(type === 'left'){
      if(!tabsLeft && tabsLeft <=0) return

      //当前的left减去可视宽度，用于与上一轮的页标比较
      var  prefLeft = -tabsLeft - outerWidth

      liItem.each(function(index, item) {
        var li = $(item)
          ,left = li.position().left

        if(left >= prefLeft){
          tabsHeader.css('left', -left)
          return false
        }
      });
    } else if(type === 'auto'){ //自动滚动
      (function() {
        var thisLi = $('#LAY_app_tabsheader').find("li[lay-id=" + id + "]"), thisLeft

        if(!thisLi[0]) return;
        thisLeft = thisLi.position().left

        //当目标标签在可视区域左侧时
        if(thisLeft < -tabsLeft) {
          return tabsHeader.css('left', -thisLeft)
        }

        //当目标标签在可视区域右侧时
        if(thisLeft + thisLi.outerWidth() >= outerWidth - tabsLeft) {
          var subLeft = thisLeft + thisLi.outerWidth() - (outerWidth - tabsLeft)
          liItem.each(function(i, item) {
            var li = $(item), left = li.position().left

            //从当前可视区域的最左第二个节点遍历，如果减去最左节点的差 > 目标在右侧不可见的宽度，则将该节点放置可视区域最左
            if(left + tabsLeft > 0) {
              if(left - tabsLeft > subLeft) {
                tabsHeader.css('left', -left)
                return false
              }
            }
          })
        }
      }())
    } else {
      //默认向左滚动
      liItem.each(function(i, item) {
        var li = $(item)
          ,left = li.position().left

        if(left + li.outerWidth() >= outerWidth - tabsLeft) {
          tabsHeader.css('left', -left)
          return false
        }
      })
    }
  },
  addEventListener() {
    const that = this

    // 点击关闭其他选项卡
    $('#layadmin-pagetabs-nav').on('click', 'a', function() {
      const dd = $(this).parent()
      dd.removeClass('layui-this')
      dd.parent().removeClass('layui-show')
      const cmd = dd.data('event')

      if (cmd === 'closeThisTabs') {
        const cur_header = $('#LAY_app_tabsheader .layui-this')
        const cur_body = $('#LAY_app_body .layui-show')
        cur_header.prev().addClass('layui-this')
        cur_header.not('li[lay-id=desktop]').remove()
        cur_body.prev().addClass('layui-show')
        cur_body.not('#tabsbody-item-desktop').remove()
        that.changeLeftNavItem(cur_header.attr('lay-attr'))
      }
      if (cmd === 'closeOtherTabs') {
        $('#LAY_app_tabsheader li:not(.layui-this)').not('li[lay-id=desktop]').remove()
        $('#LAY_app_body .layadmin-tabsbody-item:not(.layui-show)').not('#tabsbody-item-desktop').remove()
      }
      if (cmd === 'closeAllTabs') {
        const tab_header = $('#LAY_app_tabsheader li')
        const tab_body = $('#LAY_app_body .layadmin-tabsbody-item')
        tab_header.not('li[lay-id="desktop"]').remove()
        tab_body.not('#tabsbody-item-desktop').remove()
        $('#LAY_app_tabsheader li[lay-id="desktop"]').addClass('layui-this')
        $('#tabsbody-item-desktop').addClass('layui-show')
        that.changeLeftNavItem()
      }
    })

    // 滚动tab标签栏
    $('.layui-icon-next').on('click', function() {
      that.scrollTabHeader()
    })
    $('.layui-icon-prev').on('click', function() {
      that.scrollTabHeader('left')
    })
    
    //监听导航点击
    $('#LAY-app-menu').on('click', 'a[data-url]', function() {
      const target = $(this)
      const url = target.data('url')
      const id = target.data('id')
      if(!url) return
      that.gotoTabUrl.call(that, true, id, url, target.data('text'))
    })

    // 头部导航点击
    $('.layui-layout-right').on('click', 'a[data-url]', function() {
      const target = $(this)
      const url = target.data('url')
      const id = target.data('id')
      if(!url) return
      that.gotoTabUrl.call(that, true, id, url, target.data('text'))
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