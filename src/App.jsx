import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AboutCard from './components/AboutCard.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import SectionDivider from './components/SectionDivider.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutCard />
        <SectionDivider variant="scroll" />
        <Skills />
        <SectionDivider variant="meander" />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
