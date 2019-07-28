var app = new Vue({
    el : "#app",
    data: {
        candidates : [],
        
        stats : {
     //At a glances
        "num_D": 0,
        "num_R": 0,
        "num_I": 0,
        "total_reps": 0,
        
        "average_vots_with_party_D": 0,
        "average_vots_with_party_R": 0,
        "average_vots_with_party_I": 0,
        "total_voted_with_party":0,
    
     //Party loyalty
        "least_loyal": [],
        "most_loyal": [],
    
     //Attendance
        "least_engaged": [],
        "most_engaged": [],
        },
    }   
})

//Num de miembros por partido:
function findParyPrc(){    
    var members = app.candidates;
    var cantD = 0,
    cantR = 0,
    cantI = 0;
    
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
        app.stats.num_D++;
        app.stats.average_vots_with_party_D += members[i].votes_with_party_pct;
    }
        if (members[i].party == "R") {
         app.stats.num_R++;
         app.stats.average_vots_with_party_R += members[i].votes_with_party_pct;
    }
        if (members[i].party == "I") {
         app.stats.num_I++;
         app.stats.average_vots_with_party_I += members[i].votes_with_party_pct;
    }
}
    app.stats.total_reps = members.length


//Promedio de "Votos con partido" para cada partido
app.stats.average_vots_with_party_D = app.stats.average_vots_with_party_D/ app.stats.num_D;
app.stats.average_vots_with_party_R = app.stats.average_vots_with_party_R/ app.stats.num_R;
app.stats.average_vots_with_party_I = app.stats.average_vots_with_party_I/ app.stats.num_I;


if (isNaN(app.stats.average_vots_with_party_I)){
    app.stats.average_vots_with_party_I = 0;
}
app.stats.total_voted_with_party = (((app.stats.average_vots_with_party_D + app.stats.average_vots_with_party_R + app.stats.average_vots_with_party_I) / 3) * 100) / 100
}
    
// Loyalty party //
//Least loyal (Miembros que menos votan con su partido)
function leastLoyal(){
    var members = app.candidates;
    var memberSorted = [...members].sort((a,b) => a.votes_with_party_pct - b.votes_with_party_pct);
    
    var pct = members.length / 10
    var i = 0
    
    while (i < pct){
        app.stats.least_loyal.push(memberSorted[i])
        if(i !=  0 && memberSorted[i].votes_with_party_pct == memberSorted[i - 1].votes_with_party_pct){
        pct ++
    }
    i++
    }
}
    
//Most loyal (Miembros que más votan con su partido)
function mostLoyal(){
    var members = app.candidates;
    var memberSorted = [...members].sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct);
    
    var pct = members.length / 10
    var i = 0
    
    while (i < pct){
        app.stats.most_loyal.push(memberSorted[i])
        if(i !=  0 && memberSorted[i].votes_with_party_pct == memberSorted[i - 1].votes_with_party_pct){
        pct ++
    }
    i++
    }
}

// Attendance //
//least engaged
function leastEngaged(){
    var members = app.candidates;
    var memberSorted = [...members].sort((a,b) => b.missed_votes_pct - a.missed_votes_pct);

    var pct = members.length / 10
    var i = 0
    
    while (i < pct){
        app.stats.least_engaged.push(memberSorted[i])
        if(i !=  0 && memberSorted[i].missed_votes_pct == memberSorted[i - 1].missed_votes_pct){
        pct ++
    }
    i++
    }
}

//most engaged
function mostEngaged(){
    var members = app.candidates;
    var memberSorted = [...members].sort((a,b) => a.missed_votes_pct - b.missed_votes_pct);

    var pct = members.length / 10
    var i = 0

    while (i < pct){
        app.stats.most_engaged.push(memberSorted[i])
        if(i !=  0 && memberSorted[i].missed_votes_pct == memberSorted[i - 1].missed_votes_pct){
        pct ++
    }
    i++
    }
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
  
        findParyPrc()
        leastLoyal()
        mostLoyal()
        leastEngaged()
        mostEngaged()
    })
        .catch(function(){
        if (app.candidates == undefined){
            alert("Fail");
        }
    })
});
