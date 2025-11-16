from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os

app = Flask(__name__)
CORS(app)

# Use 3-class sentiment model (Positive, Neutral, Negative)
print("Loading 3-class sentiment analysis model...")
sentiment_pipeline = pipeline(
    "sentiment-analysis", 
    model="cardiffnlp/twitter-roberta-base-sentiment-latest"
)
print("✅ Model loaded!")

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Customer Sentiment Analysis API",
        "status": "running",
        "model": "cardiffnlp/twitter-roberta-base-sentiment-latest (3-class)",
        "classes": ["Positive", "Neutral", "Negative"]
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400
        
        text = data['text']
        
        if len(text.strip()) < 10:
            return jsonify({"error": "Text too short. Minimum 10 characters required."}), 400
        
        # Get prediction
        result = sentiment_pipeline(text[:512])[0]
        
        # Map labels
        label_map = {
            "positive": "Positive",
            "negative": "Negative",
            "neutral": "Neutral"
        }
        sentiment = label_map.get(result['label'].lower(), result['label'])
        
        # Assign numeric label
        label_numeric = {"Positive": 2, "Neutral": 1, "Negative": 0}[sentiment]
        
        return jsonify({
            "success": True,
            "text": text,
            "result": {
                "sentiment": sentiment,
                "confidence": round(result['score'] * 100, 2),
                "label": label_numeric
            }
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model": "3-class sentiment"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
