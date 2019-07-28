var app = new Vue({
    el : "#app",
    data: {
        candidates : [],
        checkedStates: "All",
        checkedParty: ["R", "D", "I"],
        states: []
    },
    methods: {
        filterData: function(){
             var members = this.candidates;
             var checkedParty = this.checkedParty;
             var checkedStates = this.checkedStates;
            
             var filtrosactivos = []
            filtrosactivos = members.filter(function(member){
                return checkedParty.indexOf(member.party) >= 0 && (checkedStates == member.state || checkedStates == "All");
             });
            return filtrosactivos
        }
    }
    });

//Filter by State
function buildStates(members){
var states = []

members.forEach(function(member){
    if(states.indexOf(member.state)==-1){
        states.push(member.state)
    }
})
    states.sort();
    return states;
}

// Fetch
var url = '';
var chamber = document.getElementById ("senate")
if(chamber){
    url = "https://api.propublica.org/congress/v1/113/senate/members.json";
   } else {
       url = "https://api.propublica.org/congress/v1/113/house/members.json";
   }

 $(function() {
    fetch(url,{
    method: 'GET',
    headers: new Headers({
    "X-API-Key": "byrDfuy9vO5o2WlvTgqvMwq9F657Tj0KiCPLn5wp"
    })       
  })
        .then(function(response){
        return response.json();
  })
        .then (function(json){
        app.candidates = json.results[0].members;    
        app.states = buildStates(app.candidates);
  })
        .catch(function(){
        if (app.candidates == undefined){
            alert("Fail");
        }
    })
});

