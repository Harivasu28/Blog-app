import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    BookOpen,
    FileText,
    LayoutDashboard,
    Menu,
    Plus,
    X
} from 'lucide-react';

export default function Shell({ children, posts }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="app-shell">
            <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
                <div className="brand">
                    <span className="brand-mark">
                        <BookOpen size={19} />
                    </span>
                    <span>
                        inkspace<span className="brand-dot">.</span>
                    </span>
                    <button
                        className="mobile-close"
                        onClick={() => setOpen(false)}
                    >
                        <X />
                    </button>
                </div>

                <div className="side-label">WORKSPACE</div>

                <nav>
                    <NavLink to="/" end onClick={() => setOpen(false)}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/posts" onClick={() => setOpen(false)}>
                        <FileText size={18} />
                        All posts
                        <span className="nav-count">{posts.length}</span>
                    </NavLink>
                    <NavLink to="/new" onClick={() => setOpen(false)}>
                        <Plus size={18} />
                        Create post
                    </NavLink>
                </nav>

                <div className="sidebar-bottom">
                    <div className="tip-card">
                        <div className="tip-icon">✦</div>
                        <b>Keep creating.</b>
                        <p>
                            Good ideas deserve to be shared with the world.
                        </p>
                    </div>
                    <div className="profile">
                        <div className="avatar">A</div>
                        <div>
                            <b>Admin User</b>
                            <small>Workspace owner</small>
                        </div>
                        <span className="online-dot" />
                    </div>
                </div>
            </aside>

            {open && (
                <div
                    className="backdrop"
                    onClick={() => setOpen(false)}
                />
            )}

            <main className="main-area">
                <header className="topbar">
                    <button
                        className="menu-btn"
                        onClick={() => setOpen(true)}
                    >
                        <Menu />
                    </button>
                    <div className="crumb">
                        Workspace <span>/</span> <b>Blog management</b>
                    </div>
                    <div className="top-actions">
                        <span className="top-date">
                            {new Date().toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <div className="avatar small-avatar">A</div>
                    </div>
                </header>

                <div className="page-wrap">{children}</div>
            </main>
        </div>
    );
}
