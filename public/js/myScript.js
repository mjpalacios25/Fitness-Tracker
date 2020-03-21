$(document).ready(function(){

let alertTimeout = 0;

//create function to display workouts
function writeExercises(id){
  $("#exerciseList").html("");
  $.ajax({
    url: `/populatedWorkout/${id}`,
    method: "GET",
    success: result => {
      for (exercise of result[0].exercises) {
        $("#exerciseList").append(`<li class="col-6">${exercise.name} (Reps: ${exercise.reps})</li>`)
      }
    }
  })
}



//create function to list workouts
function writeExerciseForm(buttonTarget) {
  $("#targetContainer").append(`
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
  </form>
  `);
}

function writeAllWorkouts(response) {
  $("#targetContainer").html(`<h2>Choose a workout routine</h2>`)
  for (routine of response) {
      $("#targetContainer").append(`
          <button class="btn btn-success workoutBtn" value="${routine._id}">${routine.name}</button>
      `)
  }
  $(".workoutBtn").click(event => {
      let workoutID = $(event.currentTarget).val();
      $("#targetContainer").html(`
      <h2>Current Routine</h2>
      <ul id="exerciseList" class="row"></ul>
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
          }
          $.ajax({
              url: "/add",
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
  })
}

    
    $("#newWorkout").on("click", function(event1){
      event1.preventDefault()
      //add html for a form to create a new workout, then fetch to post/create new workout, then html to display workout
      $("#targetContainer").html(`
    <form action="/submit" method="post">
        <div class="form-group">
            <label for="workoutName">Name of Workout Routine</label>
            <input class="form-control" type="text" name="workoutName" value="" placeholder="Workout Title">
        </div>
        <button class="btn btn-primary" id="createWorkout">Submit</button>
    </form>
    `);
    $("#createWorkout").click((event) => {
        event.preventDefault();
        $.ajax({
            url: "/submit",
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
    })
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