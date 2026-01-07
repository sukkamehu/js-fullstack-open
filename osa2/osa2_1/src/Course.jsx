const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content content={course.parts} />
        <Total content={course.parts} />
    </div>
)

const Header = (props) => (<h1>{props.course}</h1>)
const Part = (props) => (<p>{props.part} {props.exercises}</p>)
const Content = ({ content }) => (
    <div>
        {content.map(part => (
            <Part key={part.name} part={part.name} exercises={part.exercises} />
        ))}
    </div>
)
const Total = (props) => (
    <b>Number of exercises {props.content.reduce((sum, part) => sum + part.exercises, 0)}</b>
)

export default Course