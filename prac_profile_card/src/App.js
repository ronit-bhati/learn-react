import "./App.css";

function App() {
  return (
    <main className="card">
      <Avatar avSrc="/dev.jpg" />
      <div className="data">
        <Intro
          name="John Jacobs"
          intro="I'm a full stack developer, skilled in both frontend and backend. I work with technologies like React, Node.js, and databases to build complete, scalable web applications."
        />
        <SkillList />
      </div>
    </main>
  );
}

function Avatar(props) {
  return (
    <img src={props.avSrc} alt="developer profile pic" className="avatar" />
  );
}

function Intro(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.intro}</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="HTML+CSS" color="blue" />
      <Skill skill="JavaScript" color="yellow" />
      <Skill skill="Web Design" color="peachpuff" />
      <Skill skill="Git and Github" color="orange" />
      <Skill skill="React" color="cyan" />
      <Skill skill="Swelte" color="red" />
    </div>
  );
}

function Skill(props) {
  return (
    <span className="skill" style={{ backgroundColor: props.color }}>
      {props.skill}
    </span>
  );
}

export default App;
