import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AboutCard from './components/AboutCard.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutCard />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
