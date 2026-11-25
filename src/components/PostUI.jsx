import { FileText, Plus } from 'lucide-react';

export function Stat({ icon, label, value, note, tone }) {
    return (
        <div className="stat-card">
            <div className={`stat-icon ${tone}`}>{icon}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-note">{note}</div>
        </div>
    );
}

export function Status({ value }) {
    return (
        <span className={`status ${value === 'Published' ? 'published' : 'draft'}`}>
            <i />
            {value}
        </span>
    );
}

export function Empty({ onAdd }) {
    return (
        <div className="empty">
            <div className="empty-icon">
                <FileText />
            </div>
            <h3>No posts yet</h3>
            <p>Your next great story starts here.</p>
            <button className="primary-btn" onClick={onAdd}>
                <Plus size={16} />
                Create your first post
            </button>
        </div>
    );
}
