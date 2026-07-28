// netlify/functions/ocr-proxy.js (除錯版)
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 除錯：列出所有以 QWEN 開頭嘅環境變數名
    const allKeys = Object.keys(process.env);
    const qwenKeys = allKeys.filter(k => k.toUpperCase().includes('QWEN'));

    const apiKey = process.env.QWEN_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          error: 'Missing QWEN_API_KEY environment variable',
          debug: {
            qwenKeys: qwenKeys,                // 列出所有類似 QWEN 嘅變數名
            totalEnvKeys: allKeys.length,      // 環境變數總數
            hasExact: allKeys.includes('QWEN_API_KEY') // 是否剛好有呢個名
          }
        })
      };
    }

    // --- 正常 OCR 流程（如果 Key 存在）---
    const { imageBase64, prompt, model } = JSON.parse(event.body);
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
