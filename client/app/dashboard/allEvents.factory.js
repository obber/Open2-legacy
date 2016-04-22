(function() { 

angular
  .module('myApp')
  // dashboard controller
  .factory('allEvents', allEventsFactory);

  function allEventsFactory($http) {

    var hostedEvents = []; // events the person is hosting
    var myEvents = []; // events the person is attending
    var otherEvents = []; // events the person is not involved with.

    init();

    return {
      getHostedEvents: getHostedEvents,
      getMyEvents: getMyEvents,
      getOtherEvents: getOtherEvents,
      removeFrom: removeFrom,
      addTo: addTo
    }

    // -----------------------------------

    function init() {
      getAllEvents();
    }

    /**
     *  Getters
     *
     */
    function getHostedEvents() {
      return hostedEvents;
    }

    function getMyEvents() {
      return myEvents;
    }

    function getOtherEvents() {
      return otherEvents;
    }

    /**
     *  Setters
     *
     */
    function removeFrom(index, collection) {
      return collection.splice(index, 1);
    }

    function addTo(event, collection) {
      collection.push(event);
    }

    /**
     *  Get State from Server and filter accordingly
     *
     */
    function getAllEvents() {

      var request = {
        
      }

      $http(request)
    }
  }

})();
