import { useNavigate } from 'react-router-dom';
import {
    ArrowUpRight,
    Clock3,
    FileText,
    Pencil,
    Plus,
    Send,
    TrendingUp
} from 'lucide-react';

import { Empty, Stat, Status } from '../components/PostUI.jsx';

export default function Dashboard({ posts }) {
    const navigate = useNavigate();
    const published = posts.filter(p => p.status === 'Published').length;
    const drafts = posts.filter(p => p.status === 'Draft').length;

    return (
        <>
            <div className="page-heading">
                <div>
                    <div className="eyebrow">OVERVIEW</div>
                    <h1>
                        Your stories, <em>in one place.</em>
                    </h1>
                    <p className="subheading">
                        A little space to create, manage, and share your ideas.
                    </p>
                </div>
                <button
                    className="primary-btn"
                    onClick={() => navigate('/new')}
                >
                    <Plus size={17} />
                    New post
                </button>
            </div>

            <section className="stats-grid">
                <Stat
                    icon={<FileText />}
                    label="Total posts"
                    value={posts.length}
                    note="All your stories"
                    tone="lavender"
                />
                <Stat
                    icon={<Send />}
                    label="Published"
                    value={published}
                    note="Live for readers"
                    tone="mint"
                />
                <Stat
                    icon={<Clock3 />}
                    label="Drafts"
                    value={drafts}
                    note="Waiting to be shared"
                    tone="peach"
                />
                <Stat
                    icon={<TrendingUp />}
                    label="Categories"
                    value={new Set(posts.map(p => p.category)).size}
                    note="Topics you write about"
                    tone="blue"
                />
            </section>

            <section className="content-panel">
                <div className="panel-heading">
                    <div>
                        <h2>Recent posts</h2>
                        <p>Your latest writing activity</p>
                    </div>
                    <button
                        className="text-btn"
                        onClick={() => navigate('/posts')}
                    >
                        View all <ArrowUpRight size={16} />
                    </button>
                </div>

                {posts.length ? (
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>POST</th>
                                    <th>CATEGORY</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...posts]
                                    .sort((a, b) => b.id - a.id)
                                    .slice(0, 5)
                                    .map(post => (
                                        <tr key={post.id}>
                                            <td>
                                                <div className="post-cell">
                                                    <img
                                                        src={
                                                            post.image ||
                                                            'https://images.unsplash.com/photo-1455390582262-044c?auto=format&fit=crop&w=100&q=80'
                                                        }
                                                        onError={e => {
                                                            e.currentTarget.style.visibility = 'hidden';
                                                        }}
                                                        alt=""
                                                    />
                                                    <div>
                                                        <b>{post.title}</b>
                                                        <small>
                                                            By {post.author || 'Admin'}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{post.category}</td>
                                            <td>{post.date}</td>
                                            <td>
                                                <Status value={post.status} />
                                            </td>
                                            <td>
                                                <button
                                                    className="icon-btn"
                                                    title="Edit"
                                                    onClick={() => navigate(`/edit/${post.id}`)}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <Empty onAdd={() => navigate('/new')} />
                )}
            </section>
        </>
    );
}
