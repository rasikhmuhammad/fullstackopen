const Header = ({ courseName }) => <h1>{courseName}</h1>


const Total = ({course}) => {

  const sum = course.parts.reduce( (sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (<p><strong>Total of {sum} exercises </strong></p>
  );
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>
  

const Content = ({ parts }) => {
  return (
<>
      {parts.map( (part) => 
        <Part key = {part.id} part = {part} />
      )}
</>
  )
}


const Course = ({course}) => {
  return (
    <>
        <Header  courseName = {course.name}/>
        <Content parts = {course.parts} />
        <Total course = {course}/>
    </>
  );
}

export default Course;