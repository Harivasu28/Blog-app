import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Pencil } from 'lucide-react';

import { Empty, Status } from '../components/PostUI.jsx';

export default function Preview({ posts }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(item => item.id === Number(id));

    if (!post) {
        return <Empty onAdd={() => navigate('/new')} />;
    }

    return (
        <article className="preview-page">
            <button
                className="back-link"
                onClick={() => navigate('/posts')}
            >
                <ChevronLeft size={16} />
                Back to posts
            </button>

            <div className="preview-meta">
                <span className="category-tag">{post.category}</span>
                <Status value={post.status} />
                <span>{post.date}</span>
            </div>

            <h1>{post.title}</h1>
            <p className="preview-author">
                Written by {post.author}
            </p>

            {post.image && (
                <img
                    className="preview-image"
                    src={post.image}
                    alt=""
                />
            )}

            <p className="preview-excerpt">{post.excerpt}</p>
            <div className="preview-content">{post.content}</div>

            <button
                className="secondary-btn"
                onClick={() => navigate(`/edit/${post.id}`)}
            >
                <Pencil size={16} />
                Edit post
            </button>
        </article>
    );
}
