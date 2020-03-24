$(document).ready(function(){

let alertTimeout = 0;

//create function to display workouts
function writeExercises(id){
  $("#exerciseList").html("");
  $.ajax({
    url: `/populatedWorkout/${id}`,
    method: "GET",
    success: result => {
      console.log(result[0])
      for (exercise of result[0].exercises) {
        $("#exerciseList").append(`<li>${exercise.name} (Reps: ${exercise.reps})</li>`)
      }
    }
  })
}



//create function to list workouts
function writeExerciseForm(buttonTarget) {
  $("#exerciseForm").append(`
  <h2>Add Exercise to ${$(buttonTarget).text()}</h2>
  <form action="/add" method="post">
      <div class="form-group>
          <label for="exerciseName">Name of Exercise</label>
          <input class="form-control" type="text" name="exerciseName" value="" placeholder="Exercise">
      </div>
      <div class="form-group">
          <label for="exerciseReps">Number of Reps</label>
          <input class="form-control" type="number" name="exerciseReps" value="" placeholder="# of Reps">
      </div>
      <button class="btn btn-primary" id="addExercise">Add to Workout</button>
      <a href="" class="btn btn-primary" id="home">Home</a>
  </form>
  `);
}

function writeAllWorkouts(response) {
  $("#targetContainer").html(`
    <div class = "col-md-12 text-center" id = "workouts">
      <h2>Choose a workout routine</h2>
    </div>`)
  for (routine of response) {
      $("#workouts").append(`
          <button class="btn btn-success workoutBtn" value="${routine._id}">${routine.name}</button>
      `)
  }
  $(".workoutBtn").click(event => {
      let workoutID = $(event.currentTarget).val();
      console.log(workoutID)
      $("#targetContainer").html(`
      <div class = "col-md-4">
        <h2>Current Routine</h2>
        <ul id="exerciseList"></ul>
      </div>
      <div class= "col-md-8" id = "exerciseForm"></div>
      `)
      writeExercises(workoutID)
      writeExerciseForm(event.currentTarget)
      $("#addExercise").click((event) => {
          event.preventDefault();
          let numReps = $("input[name*='exerciseReps']").val()
          let newExercise = {
              workout: workoutID,
              name: $("input[name*='exerciseName']").val().trim(),
              reps: (numReps > 0) ? numReps : undefined
          };
          console.log(workoutID)
          $.ajax({
              url: "/submit",
              data: newExercise,
              method: "POST",
              success: result => {
                  clearTimeout(alertTimeout);
                  if (result.errors != undefined) {
                      if (result.errors.name) {
                          $(".alert-warning").text("Please enter the exercise you want to add.").attr('style', 'display:block;')
                      } else if (result.errors.reps) {
                          $(".alert-warning").text("Please enter the number of reps.").attr('style', 'display:block;')
                      }
                      alertTimeout = setTimeout(() => {
                          $(".alert-warning").attr('style', 'display:none;')
                      }, 4000)
                  } else {
                      writeExercises(result._id);
                  }
              }
          })
      })

      $("#home").click((event) => {
        location.reload(event)
      } )
  })
}

    
    $("#newWorkout").on("click", function(event1){
      event1.preventDefault()
      //add html for a form to create a new workout, then fetch to post/create new workout, then html to display workout
      $("#targetContainer").html(`
    <div class = "col-md-12 mx-auto" >  
    <form class= "text-center" action="/submit" method="post">
        <div class="form-group">
            <label for="workoutName">Name of Workout Routine</label>
            <input class="form-control text-center" type="text" name="workoutName" value="" placeholder="Workout Title">
        </div>
        <button class="btn btn-primary" id="createWorkout">Submit</button>
        <a href="" class="btn btn-primary" id="home" style = "color, white">Home</a>
    </form>
    </div>
    `);
    $("#createWorkout").click((event) => {
        event.preventDefault();
        $.ajax({
            url: "/api/workouts",
            data: { name: $("input[name*='workoutName']").val().trim() },
            method: "POST",
            success: (result) => {
                clearTimeout(alertTimeout);
                if (result != 'Workout validation failed') {
                    location.reload();
                } else {
                    $(".alert-warning").text("Please enter the name of your new workout routine.").attr('style', 'display:block;')
                    alertTimeout = setTimeout(() => {
                        $(".alert-warning").attr('style', 'display:none;')
                    }, 4000)
                }
            }
        })
    });

    $("#home").click((event) => {
      location.reload()
    });

    });

    $("#seeWorkouts").on("click", function(event){
        //alert("Show me the workouts.");
        event.preventDefault();
        //add fetch to get all the workouts, then select one, then see the exercises within the workout
        
      $.ajax({
        url: "/api/workouts", 
        method: "GET"
      }).then(function(data){
        writeAllWorkouts(data)
      })
      });

  });