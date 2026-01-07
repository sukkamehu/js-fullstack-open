
import Course from './Course'

const App = () => {
  const courses = [{
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        id: 3,
        exercises: 10
      }, {
        name: 'Using props to pass data',
        id: 4,
        exercises: 7
      }, {
        name: 'State of a component',
        exercises: 14
      }, {
        name: 'Keijo Haataja',
        id: 5,
        exercises: 3
      }, {
        name: 'Seppo Sepponen',
        id: 6,
        exercises: 5
      }, {
        name: 'Kari Karila',
        id: 7,
        exercises: 4
      }]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }]

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id ?? course.name} course={course} />
      ))}
    </div>
  )
}

export default App