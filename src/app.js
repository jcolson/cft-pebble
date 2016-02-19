/**
 * Welcome to Crossfit Threefold Pebble Timeline App!
 */

var UI = require('ui');
var ajax = require('ajax');
/**
if(launch_reason() == APP_LAUNCH_TIMELINE_ACTION) {
  uint32_t arg = launch_get_args();

  switch(arg) {
  case LAUNCH_ARG_CANCEL:
    // Cancel table UI...

    break;
  case LAUNCH_ARG_REVIEW:
    // Leave a review UI...

    break;
  }
} else {*/
//var Vector2 = require('vector2');
var bodyText = 'Welcome athletes! WOD posts will be on your timeline as soon as they are posted, which is around 8pm!';
var timelineTokenKey = 1;
var timelineTokenValue = localStorage.getItem(timelineTokenKey);
var topicKey = 2;
var topicValue = localStorage.getItem(topicKey);

// Write a key with associated value
if (topicValue === null) {
  console.log('topic value: '+topicValue);
  Pebble.getTimelineToken(
    function (token) {
      console.log('My timeline token is ' + token);
      timelineTokenValue = token;
      localStorage.setItem(timelineTokenKey, timelineTokenValue);
    },
    function (error) { 
      console.log('Error getting timeline token: ' + error);
    }
  );

  Pebble.timelineSubscribe('WOD', 
    function () {
      console.log('Subscribed to WOD: '+ bodyText);
      topicValue = 'WOD';
      localStorage.setItem(topicKey, topicValue);
    }, 
    function (errorString) { 
      bodyText = 'Error subscribing to topic WOD: ' + errorString;
      console.log(bodyText);
    }
  );
} else {
  console.log('retreived topic from storage!');
}

var main = new UI.Card({
  title: 'Crossfit 3 Fold 1.1',
  icon: 'images/3f-logo-new-50px.png',
  //subtitle: 'Welcome',
  body: bodyText,
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});
main.show();
//}



main.on('click', 'select', function(e) {
  console.log('clicked');
  var theDate = new Date();
  var month = getMonthName(theDate.getMonth());
  var date = pad(theDate.getDate(),2);
  var URL='http://beyondthewhiteboard.com/gyms/4860-crossfit-threefold/'+theDate.getFullYear()+'/'+month+'/'+date+'.atom';
  // Show splash
  var splashCard = new UI.Card({
    title: "Please Wait",
    body: "Downloading..."
  });
  splashCard.show();
  // Download data
  ajax({url: URL},//, type: 'string'},
    function(document) {
      var result = '', i;
      var resultArray = document.match(/<\/btwb:assigned>([^]*?)<summary>([^]*?)<\/summary>/mg);
      console.log("array size: "+resultArray.length);
      for (i = 0 ; i < resultArray.length; i++) {
        var wod = resultArray[i].substr(31);
        console.log(i+': '+ wod);
        wod = wod.substr(0,wod.length-10);
        result = result + wod;
        if (i < resultArray.length-1) {
          result = result + '\nAND THEN:\n';
        }
      }	

      // Use data to show a Card
      var resultsCard = new UI.Card({
        title: theDate.getFullYear()+'/'+theDate.getMonth()+'/'+theDate.getDate(),
        body: result,
        scrollable: true
      });
      
      // Show results, remove splash card
      resultsCard.show();
      splashCard.hide();
    },
    function(error) {
      console.log('Ajax failed: ' + error);
    }
  );
});

// pad number
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

// get month name
function getMonthName(monthInt) {
  var month = [];
  month[0] = "jan";
  month[1] = "feb";
  month[2] = "mar";
  month[3] = "apr";
  month[4] = "may";
  month[5] = "jun";
  month[6] = "jul";
  month[7] = "aug";
  month[8] = "sep";
  month[9] = "oct";
  month[10] = "nov";
  month[11] = "dec";
  return month[monthInt];
}

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

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/