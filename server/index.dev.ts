import { createProxyMiddleware } from "http-proxy-middleware";
import app from "./src";

app.get('/*', createProxyMiddleware({
    target: `http://localhost:${process.env.DEV_FRONT_PORT}`,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/': '/', // Переписываем путь, если необходимо
    }
}));