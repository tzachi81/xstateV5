# xstate Version 5 implementation in a react app
This is a react project that implements some of the [xstate V5 capabilities](https://stately.ai/blog/2023-12-01-xstate-v5)
## component
- toggle </Button> - turns the system on/off
- add task <Button/> and input - adds a task (string)
- tasks list - ul component showing the tasks list
## Machines
- root.machine - this parent machine is capable to toggle on/off the entire machines system.
- tasks.machine - child machine that is capable of handling add/remove tasks in the app.
