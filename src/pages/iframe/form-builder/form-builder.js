import "./form-builder.scss"

$(function () {

  $(".draggable").draggable({
    appendTo: "body",
    helper: "clone"
  });

  $(".droppable").droppable({
    accept: ".draggable",
    helper: "clone",
    hoverClass: "droppable-active",
    drop: function (event, ui) {
      $(".empty-form").remove();
      var $orig = $(ui.draggable)
      if (!$(ui.draggable).hasClass("dropped")) {
        var $el = $orig
          .clone()
          .addClass("dropped")
          .css({
            "position": "static",
            "left": null,
            "right": null
          })
          .appendTo(this);

        // update id
        var id = $orig.find(":input").attr("id");

        if (id) {
          id = id.split("-").slice(0, -1).join("-") + "-" + (parseInt(id.split("-").slice(-1)[0]) + 1)

          $orig.find(":input").attr("id", id);
          $orig.find("label").attr("for", id);
        }

        // tools
        $(`<p class="tools layui-col-md12 layui-col-md-offset3">
						 <a class="remove-link">移除</a>
					 </p>`).appendTo($el);
      } else {
        if ($(this)[0] != $orig.parent()[0]) {
          var $el = $orig
            .clone()
            .css({
              "position": "static",
              "left": null,
              "right": null
            }).appendTo(this);
          $orig.remove();
        }
      }
    }
  }).sortable();

  $(document).on("click", ".remove-link", function (ev) {
    $(this).parent().parent().remove();
  });

})
