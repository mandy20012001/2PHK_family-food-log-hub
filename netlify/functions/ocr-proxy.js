// netlify/functions/ocr-proxy.js
exports.handler = async (event) => {
  // 只接受 POST 請求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 從前端接收圖片 Base64 同 Prompt
    const { imageBase64, prompt, model } = JSON.parse(event.body);

    // 從 Netlify 環境變數讀取 API Key（安全，唔會暴露俾前端）
    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      throw new Error('Missing QWEN_API_KEY environment variable');
    }

    const aliyunUrl = 'https://ws-h7nywvwpakoov2in.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/chat/completions';

    const response = await fetch(aliyunUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'qwen-vl-ocr',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt || 'Extract balance, amount, store, date, items. Return JSON only.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};