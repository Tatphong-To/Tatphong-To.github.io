import { useRef, useState } from 'react'
import { projects, projectsMoreUrl, hasUrl } from '../data.js'
import { ArrowLeftIcon, ArrowRightIcon, GithubIcon } from './Icons.jsx'
import './Projects.css'

const SWIPE_MIN = 50 // ระยะปัดขั้นต่ำ (px)

// ระยะห่างแบบวนรอบ เช่น 5 การ์ด -> -2, -1, 0, 1, 2
function circularOffset(index, active, total) {
  let o = (((index - active) % total) + total) % total
  if (o > total / 2) o -= total
  return o
}

export default function Projects() {
  const total = projects.length
  const [active, setActive] = useState(0)
  const drag = useRef(null)

  const go = (step) => setActive((i) => (((i + step) % total) + total) % total)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  // ปัดซ้าย/ขวา (นิ้วหรือเมาส์)
  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, swiped: false }
  }
  const onPointerUp = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      d.swiped = true
      go(dx < 0 ? 1 : -1)
    }
  }
  // กันไม่ให้การปัดไปนับเป็นการคลิกการ์ด/ลิงก์
  const onClickCapture = (e) => {
    if (drag.current?.swiped) {
      e.preventDefault()
      e.stopPropagation()
    }
    drag.current = null
  }

  if (!total) return null

  return (
    <section className="projects" id="projects">
      <div className="container">
        <header className="projects__head">
          <h2 className="section-title projects__title">Projects</h2>

          {hasUrl(projectsMoreUrl) && (
            <a href={projectsMoreUrl} className="projects__more">
              All repositories on GitHub
            </a>
          )}
        </header>
      </div>

      <div
        className="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="โปรเจกต์ (ใช้ปุ่มลูกศรซ้าย/ขวาเพื่อเลื่อน)"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="carousel__stage"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
          onClickCapture={onClickCapture}
        >
          {projects.map((p, i) => {
            const o = circularOffset(i, active, total)
            const isActive = o === 0
            const hidden = Math.abs(o) > 1
            const tab = isActive ? 0 : -1

            return (
              <article
                key={p.title}
                className={`slide${isActive ? ' is-active' : ''}${hidden ? ' is-hidden' : ''}`}
                style={{ '--o': o }}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${i + 1} จาก ${total}: ${p.title}`}
                onClick={isActive ? undefined : () => go(o)}
              >
                <img src={p.image} alt="" loading="lazy" draggable="false" />
                <div className="slide__shade" />

                <div className="slide__content">
                  <h3 className="slide__title">{p.title}</h3>
                  <p className="slide__desc">{p.description}</p>

                  {p.tags?.length > 0 && (
                    <ul className="slide__tags">
                      {p.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}

                  <div className="slide__actions">
                    {hasUrl(p.link) && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="slide__more"
                        tabIndex={tab}
                      >
                        Open live demo
                      </a>
                    )}
                    {hasUrl(p.repo) && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="slide__repo"
                        aria-label={`${p.title} บน GitHub`}
                        tabIndex={tab}
                      >
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {total > 1 && (
          <div className="carousel__bar">
            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              onClick={() => go(-1)}
              aria-label="โปรเจกต์ก่อนหน้า"
            >
              <ArrowLeftIcon />
            </button>

            <div className="carousel__dots">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  className={i === active ? 'is-active' : undefined}
                  aria-label={`ไปที่ ${p.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              onClick={() => go(1)}
              aria-label="โปรเจกต์ถัดไป"
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
