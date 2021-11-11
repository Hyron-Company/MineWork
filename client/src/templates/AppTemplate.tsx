interface IProps {
  header: JSX.Element
  sidebar: JSX.Element
  page: JSX.Element
}

export const AppTemplate: React.FC<IProps> = ({ header, sidebar, page }) => {
  return (
    <div className="app">
      <nav className="app__sidebar">
        {sidebar}
      </nav>
      <div className="app__body">
        <header className="app__header">{header}</header>
        <main className="app__page">{page}</main>
      </div>
    </div>
  )
}
