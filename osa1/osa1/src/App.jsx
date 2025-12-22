const Header = (props) => {
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

const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0].title} exercises={props.content[0].exercises} />
      <Part part={props.content[1].title} exercises={props.content[1].exercises} />
      <Part part={props.content[2].title} exercises={props.content[2].exercises} />  
    </div>
  )
}

const Total = (props) => {

  return (
    <p>Number of exercises {props.content.reduce((sum, part) => sum + part.exercises, 0)}</p>
  )
}

const App = () => {
  const content = [{
    title: 'Fundamentals of React',
    exercises: 10
  }, {
    title: 'Using props to pass data',
    exercises: 7
  }, {
    title: 'State of a component',
    exercises: 14
  }]

  return(
    <div>
      <Header course = "Half Stack application development"/>
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}

export default App