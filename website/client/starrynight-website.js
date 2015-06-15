
Session.set("resize", null);
Session.setDefault('counter', 0);

Session.setDefault('transparencyDivHeight', 100);
Session.setDefault('transparencyDivLeft', 0);

Session.setDefault('appHeight', $(window).height());
Session.setDefault('appWidth', $(window).width());

Meteor.startup(function () {
  window.addEventListener('resize', function(){
    Session.set("resize", new Date());
    Session.set("appHeight", $(window).height());
    Session.set("appWidth", $(window).width());
  });
  Template.hello.layout();
});


//==================================================================================================

var backgroundImages = [
  "IMG_4641.PNG",
  "IMG_4650.PNG",
  "IMG_4654.PNG",
  "IMG_4656.PNG",
  "IMG_4665.PNG",
  "IMG_4669.PNG",
  "IMG_4671.PNG",
  "IMG_4673.PNG"
];

Template.body.helpers({
  getRandomImage: function(){
    return Random.choice(backgroundImages);
  }
});

//==================================================================================================

Template.hello.onRendered(function(){
  Template.hello.layout();
});


Template.hello.helpers({
  resized: function () {
    Template.hello.layout();
  },
  getStyle: function () {
    return parseStyle({
      "left": Session.get('transparencyDivLeft') + "px;",
      "height": Session.get('transparencyDivHeight') + "px;"
    });
  },
  getLeft: function () {
    return "left: " + Session.get('transparencyDivLeft') + "px;";
  },
  getHeight: function () {
    return "height: " + Session.get('transparencyDivHeight') + "px;";
  },
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});


Template.hello.layout = function(){
  Session.set('transparencyDivHeight', $('#innerPanel').height() + 80);
  console.log('appWidth', Session.get('appWidth'));
  if(Session.get('appWidth') > 1636){
    Session.set('transparencyDivLeft', (Session.get('appWidth') - 1536) * 0.5);
  }else if(Session.get('appWidth') > 768){
    Session.set('transparencyDivLeft', (Session.get('appWidth') - 768) * 0.5);
  }else{
    Session.set('transparencyDivLeft', 0);
  }
}


//==================================================================================================




parseStyle = function(json){
  var result = "";
  $.each(json, function(i, val){
    result = result + i + ":" + val + " ";
  });
  return result;
}
