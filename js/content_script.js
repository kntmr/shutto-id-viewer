$(function() {
  init();
});

function init() {
  var outer = $('<div>').attr('id', 'pvOuter'),
    overlay = $('<div>').attr('id', 'pvOverlay'),
    open = $('<a>').attr('id', 'pvOpen').text('shutto-id'),
    close = $('<a>').attr('id', 'pvClose').text('Close'),
    table = $('<table>').attr('id', 'pvTable');

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

  $('#pages header').append(open);

  var imgUrl = chrome.extension.getURL("images/close.gif");
  close.css('background', 'url(' + imgUrl + ') no-repeat 0');

  overlay.append($('#pages header h1').clone());
  overlay.append(table);
  overlay.append(close);
  outer.append(overlay);

  $("body").append(outer);

  $("#pvOpen").on('click', function() {
    $("#pvOverlay").fadeIn();
  });

  $("#pvClose").on('click', function() {
    $("#pvOverlay").fadeOut();
  });
}
