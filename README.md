# Flashcards

THe purpose of this application is that teachers will use this application to create decks of flash cards for 
the subjects that they teach, and students will study the decks. 

![alt text](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/8ad6e17b7d849280a619e4bb69c26baa-home.png)

This project is designed to test your ability to work with rendering and state management using React. Before taking on this project, 
you should be comfortable with the learning objectives listed below:

    Installing packages via NPM
    Running tests from the command line
    Writing React function components
    Creating routes, including nested routes, using React Router
    Using hooks like useState(), useParams(), and useHistory()
    Debugging React code through console output and using the VS Code debugger
 
 Make sure that for this project:
-All the props are treated as read-only.
-State is never directly mutated; it's only updated via setState().
-The Edit Card and Create Card screens share the same form component.
-The useEffect() hooks have the appropriate dependencies listed in the dependency array.
-State is "lifted up" to the parent component where appropriate.
-All inputs are controlled. Generally, there is a warning on the console when you type into the input box and it
changes from uncontrolled to controlled. The warning looks like this: "Warning: Input is changing an uncontrolled
input of type <text|number|etc.> to be controlled." This is often the result of initializing the state to null or undefined. 
