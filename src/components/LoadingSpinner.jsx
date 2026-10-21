function LoadingSpinner({ message = 'Loading component chunk...' }) {
  return (
    <div className="spinner-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '320px',
      gap: '1.25rem',
      padding: '2rem'
    }}>
      <div className="spinner" style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(147, 51, 234, 0.15)',
        borderTop: '4px solid var(--accent, #a855f7)',
        borderRadius: '50%',
        animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite'
      }} />
      <p style={{
        color: 'var(--text-secondary, #94a3b8)',
        fontSize: '0.95rem',
        fontWeight: '500',
        letterSpacing: '0.02em'
      }}>
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner;
