var app = {
  server: 'http://localhost:3000',

  init: function() {
    app.$text = $('#urlSearch');
    $('#send').on('submit', app.handleSubmit);
  },

  sendRequest: function(url) {
    $.ajax{
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(json) {
        console.log('send request success');
      },
      error: function(){
        console.error('error from send request');
      }
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    app.sendRequest($text);
    app.$text.val('');
    console.log('handle submit ran');
  }

};