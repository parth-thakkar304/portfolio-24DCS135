import Header from "./Header";
import About from "./About";
import Skills from "./Skills";

function Home({ name, subtitle, themeColor, skills }) {
  return (
    <div className="home-container">
      <Header name={name} subtitle={subtitle} themeColor={themeColor} />
      <About />
      <Skills skillList={skills} />
    </div>
  );
}

export default Home;
