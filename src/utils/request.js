import $ from 'jQuery'

function request(options) {
  return new Promise(function (resolve, reject) {
    $.ajax(options).done(resolve).fail(reject)
  })
}

export default request
