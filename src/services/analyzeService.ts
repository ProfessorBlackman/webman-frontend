import axios from 'axios';

const API_URL = 'https://webman.onrender.com';

export const analyzeWebsite = async (url: string, analysisType: string): Promise<unknown> => {
    const data = {
        url: url,
        analysis_type: analysisType
    }
    let endpoint: string;
    switch (analysisType) {
        case 'Responsiveness':
            endpoint = "analyze_responsiveness";
            break;
        case 'Accessibility':
            endpoint = "analyze_accessibility";
            break;
        default:
            endpoint = "analyze_performance";
    }
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data);
        console.log('response:', response);
        return response.data;
    } catch (error) {
        console.error('Error analyzing website:', error);
        throw error;
    }
};

export const isValidUrl = (url: string): boolean => {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}