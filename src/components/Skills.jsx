function Skills({ skillList }) {
  return (
    <section className="skills-card glass-panel">
      <h2>My Skills</h2>
      <div className="skills-grid">
        {skillList && skillList.map((s) => (
          <div className="skill-pill" key={s}>
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;