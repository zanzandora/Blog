import ngrok from 'ngrok';
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

(async () => {
  try {
    const url = await ngrok.connect({
      addr: 3000, // Port của bạn
      authtoken: process.env.NGROK_AUTH_TOKEN, // Lấy từ .env
      region: 'ap', // Chọn region gần (us, eu, au, ap)
      onStatusChange: (status) => console.log('Ngrok status:', status),
    });
    console.log('✅ Ngrok URL:', url);
  } catch (error) {
    console.error('❌ Ngrok error:', error);
    process.exit(1);
  }
})();
