$(function() {
  init();
});

function init() {
  var open = $('<a>').addClass('modal-open').text('shutto-id viewer');
  $('#pages header').append(open);

  var table = $('<table>').addClass('content-table');
  $.each($('#page-list li'), function() {
    var data = $(this).find('div');
    if (data.attr('data-enable') === 'true') {
      table.append($('<tr>')
        .append($('<td>').text(data.find('div.label').text()))
        .append($('<td>').text(data.attr('data-name'))));
    } else if (data.attr('data-enable') === 'false') {
      table.append($('<tr>')
        .append($('<td>').append($('<strike>').text(data.find('div.label').text())))
        .append($('<td>').append($('<strike>').text(data.attr('data-name')))));
    }
  });
  var close = $('<a>').addClass('modal-close').text('Close');
  var imgUrl = chrome.extension.getURL("images/close.gif");
  close.css('background', 'url(' + imgUrl + ') no-repeat 0');

  var content = $('<div>').addClass('modal-content');
  content.append(table);
  content.append(close);
  $("body").append(content);

  $('.modal-open').click(function() {
    $('html, body').addClass('lock');

    $('body').append('<div class="modal-overlay"></div>');
    $('.modal-overlay').fadeIn('slow');

    var modal = $('.modal-content');
    $(modal).wrap("<div class='modal-wrap'></div>");
    $('.modal-wrap').show();

    $(modal).fadeIn('slow');
    $(modal).click(function(e) {
        e.stopPropagation();
    });

    $('.modal-wrap, .modal-close').off().click(function(){
      $(modal).fadeOut('slow');
      $('.modal-overlay').fadeOut('slow',function(){
        $('html, body').removeClass('lock');
        $('.modal-overlay').remove();
        $(modal).unwrap("<div class='modal-wrap'></div>");
     });

    });
  });
}
