# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)


### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- Firebase 

### Notes
Estimated Time: 4 hours | Actual Time: 6hrs 15m

Took two and a half hours to figure out drag and drop function but I did it! Resources used: 
- https://dndkit.com/
- https://www.youtube.com/watch?v=Z8RoA_YSGDQ | really it was Abdullo Abdumamadov's comment and looking up how to get index of object in array that allowed me to figure out I needed findIndex() instead of indexOf()
- https://kotomi-noguchi.medium.com/javascript-preventing-parent-event-when-child-event-is-triggered-cfc3569f002f | helped lead me in direction that I needed event.stopPropagation() . took me awhile to figure out that I needed to add own onPointerDown event to my checkbox and delete elements and use stopPropagation there so the onClick would not be affected. 