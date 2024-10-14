function Navbar() {
  return (
    <div className="flex-column">
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <li>
            <details>
              <summary>ARG</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>ARG</a></li>
                <li><a>USD</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Español</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>Español</a></li>
                <li><a>Inglés</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}

export default Navbar;