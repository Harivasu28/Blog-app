import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';

import { Status } from '../components/PostUI.jsx';

export default function Posts({ posts, setPosts }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = [
        'All',
        ...new Set(posts.map(post => post.category))
    ];

    const filtered = posts.filter(post =>
        (
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            (post.author || '').toLowerCase().includes(query.toLowerCase())
        ) &&
        (category === 'All' || post.category === category)
    );

    const remove = id => {
        if (window.confirm('Delete this post? This action cannot be undone.')) {
            setPosts(prev => prev.filter(post => post.id !== id));
        }
    };

    return (
        <>
            <div className="page-heading">
                <div>
                    <div className="eyebrow">CONTENT LIBRARY</div>
                    <h1>
                        All <em>posts.</em>
                    </h1>
                    <p className="subheading">
                        Manage every story in your collection.
                    </p>
                </div>
                <button
                    className="primary-btn"
                    onClick={() => navigate('/new')}
                >
                    <Plus size={17} />
                    Create post
                </button>
            </div>

            <section className="content-panel">
                <div className="toolbar">
                    <div className="search-box">
                        <Search size={17} />
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search posts or authors..."
                        />
                    </div>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {categories.map(item => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                    <span className="result-count">
                        {filtered.length} posts
                    </span>
                </div>

                {filtered.length ? (
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>POST</th>
                                    <th>CATEGORY</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th className="right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(post => (
                                    <tr key={post.id}>
                                        <td>
                                            <div className="post-cell">
                                                <img
                                                    src={
                                                        post.image ||
                                                        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&q=80'
                                                    }
                                                    alt=""
                                                    onError={e => {
                                                        e.currentTarget.style.visibility = 'hidden';
                                                    }}
                                                />
                                                <div>
                                                    <b>{post.title}</b>
                                                    <small>
                                                        By {post.author || 'Admin'}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="category-tag">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td>{post.date}</td>
                                        <td>
                                            <Status value={post.status} />
                                        </td>
                                        <td>
                                            <div className="row-actions">
                                                <button
                                                    className="icon-btn"
                                                    title="Preview"
                                                    onClick={() => navigate(`/view/${post.id}`)}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="icon-btn"
                                                    title="Edit"
                                                    onClick={() => navigate(`/edit/${post.id}`)}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    className="icon-btn danger"
                                                    title="Delete"
                                                    onClick={() => remove(post.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty compact">
                        <h3>No matching posts</h3>
                        <p>Try another search or category.</p>
                    </div>
                )}
            </section>
        </>
    );
}
