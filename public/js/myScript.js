$(document).ready(function(){

    
//create function to display workouts

//create function to list workouts

    
    $("#createWorkout").on("click", function(){
      alert("Make a new workout.");
      //add html for a form to create a new workout, then fetch to post/create new workout, then html to display workout
    });

    $("#seeWorkouts").on("click", function(){
        alert("Show me the workouts.");
        //add fetch to get all the workouts, then select one, then see the exercises within the workout
      });

  });