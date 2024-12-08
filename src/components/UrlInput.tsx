import React from 'react';

interface UrlInputProps {
    url: string;
    setUrl: (url: string) => void;
    handleAnalyze: () => void;
    loading: boolean;
    error: string | null;
}

const UrlInput: React.FC<UrlInputProps> = ({url, setUrl, handleAnalyze, loading, error}) => {
    return (
        <div className="url-content">
            <div className="url-div">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL to analyze"
                    className="url-input"
                    required={true}
                />
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="analyze-btn"
                >
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>

            {error && (
                <div className="error-msg" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

export default UrlInput;