const Header = (props) => {
  console.log(props)

  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({ content }) => {
  return (
    <div>
      {content.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {

  return (
    <p>Number of exercises {props.content.reduce((sum, part) => sum + part.exercises, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, {
        name: 'Using props to pass data',
        exercises: 7
      }, {
        name: 'State of a component',
        exercises: 14
    }]
  }

  return(
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  )
}

export default App