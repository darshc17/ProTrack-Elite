import { Link, useLocation } from "react-router-dom";

function Sidebar({ setIsLoggedIn }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:scale-110">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:scale-110">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:scale-110">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 bg-slate-900/60 backdrop-blur-md border-r border-white/5 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-8">
        {/* Brand */}
        <Link to="/" className="flex flex-col group">
          <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
            PROTRACK
          </h1>
          <span className="mt-1 text-[9px] font-black tracking-[0.2em] text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20 w-fit">
            ELITE
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent text-cyan-400 border-l-4 border-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-white transition-colors"}>
                  {item.icon}
                </span>
                <span className="text-base tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout pinned to bottom */}
      <div className="pt-6 border-t border-white/5">
        <button
          className="group flex items-center gap-4 w-full px-4 py-3.5 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl font-semibold transition-all duration-200"
          onClick={() => {
            localStorage.removeItem("token");
            if (setIsLoggedIn) setIsLoggedIn(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 transition-transform duration-200 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="text-base tracking-wide">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;