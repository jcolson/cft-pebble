/**
 * Welcome to Crossfit Threefold Pebble Timeline App!
 */

var UI = require('ui');
//var Vector2 = require('vector2');
var bodyText = 'Welcome athletes! WOD posts will be on your timeline as soon as they are posted, which is around 8pm!';

Pebble.getTimelineToken(
  function (token) {
    console.log('My timeline token is ' + token);
  },
  function (error) { 
    console.log('Error getting timeline token: ' + error);
  }
);

Pebble.timelineSubscribe('WOD', 
  function () {
    console.log('Subscribed to WOD: '+ bodyText);
  }, 
  function (errorString) { 
    bodyText = 'Error subscribing to topic: ' + errorString;
    console.log(bodyText);
  }
);

var main = new UI.Card({
  title: 'Crossfit 3 Fold',
  icon: 'images/3f-logo-new-50px.png',
  //subtitle: 'Welcome',
  body: bodyText,
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

/**
main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/