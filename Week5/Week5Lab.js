const router = require("express").Router();
const Task = require("./class.js");


let taskDB = new Task.List();

router.get("/", function(req, res){
    res.render("index.html");
});

router.get("/newTask", function(req, res){
    res.render("addTask.html");
});

router.post("/newTaskData", function(req, res){
    let taskItem = new Task.Item(req.body.taskName, req.body.taskDueDate, req.body.taskDescription);
    taskDB.addTask(taskItem);
    res.render("listTask.html", {
        taskList: taskDB.list
    });
});

router.get("/listTasks", function(req, res){
    res.render("listTask.html", {
        taskList: taskDB.list
    });
});

module.exports = router;