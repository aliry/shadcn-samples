import { useState } from 'react'

const modules = import.meta.glob('./pages/*.tsx', { eager: true })

const pages = Object.entries(modules).map(([path, mod]) => {
  const Component = (mod as any).default as React.ComponentType
  const name = path.replace('./pages/', '').replace(/\.tsx$/, '')
  return { name, Component }
})

function App() {
  const [current, setCurrent] = useState<React.ComponentType | null>(null)

  if (current) {
    const Page = current
    return (
      <div className="p-4">
        <button className="mb-4 underline" onClick={() => setCurrent(null)}>
          Back to gallery
        </button>
        <Page />
      </div>
    )
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pages.map(({ name, Component }) => (
        <div
          key={name}
          className="border rounded p-4 cursor-pointer hover:shadow"
          onClick={() => setCurrent(Component)}
        >
          <div className="mb-2 font-semibold text-center">{name}</div>
          <Component />
        </div>
      ))}
    </div>
  )
}

export default App
