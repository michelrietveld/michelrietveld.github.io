define(['dojo/_base/declare', 'jimu/BaseWidget',
'jimu/utils','dojo/_base/lang', 'dojo/on','dojo/query', 'dojo/_base/html'],
function(declare, BaseWidget, utils,lang, on, query, html) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API

    // TygronWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-Tygron',

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      
      var hittestressURL = utils.processUrlInWidgetConfig("images/Hittestress.jpg", this.folderUrl);
      console.log(hittestressURL);
      var figure = "<figure><img src="+hittestressURL+" ></figure>";
      this.figureNode.innerHTML = figure;


      this.own(on(this.btnHittestressNode, "click", lang.hitch(this, this.Hittestress)));

    },
    startup: function() {
      this.inherited(arguments);
      console.log('startup');
    },
    Hittestress: function(){
      data = '0=4388&1=HEAT_EFFECT&2='+this.inputNode.value;

      //data = {"0":4388, "1": "HEAT_EFFECT", "2":-10}
      this.postData('https://test.tygron.com/api/session/event/editorbuilding/set_function_value/?CRS=EPSG:3857&f=JSON&token=48272742RBX3NhwenoNmVloIxNnvNZ5Z', data)
      .then(() => console.log("Hittestress")) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
    },
    postData: function(url = '', data = {}) {
        return fetch(url, {
            method: 'post',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                //'Content-Type': 'application/json',
                //'Accept': 'application/json, text/plain, */*',
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer',
            body: data,
            //body: JSON.stringify(data),
        })
        .then();
    },
    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    }
  });
});