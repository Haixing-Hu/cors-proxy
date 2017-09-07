# cors-proxy

A proxy server bypassing the CORS limitation.

Sometimes our web pages hosted on a server want to make AJAX requests to another server. This is called the CORS request, and is very hard to overcome, especially when the AJAX server was not controlled by ourselves.

This script serves as a transparent proxy server, which simply redirects every request to another destination server.

This proxy server **does not** obey the CORS rule, since we do not care about the security problems. We want our web client send AJAX request to the proxy server and get exactly the same result as it was sent to the destination server.

For example, suppose our web pages are hosted on the server A (say, `www.foo.com`), and the web client will make requests to another API server B (say, `api.bar.com`). Since we cannot modify the configuration of server B, the standard CORS approaches do not work. Now we could run this script on server A (say, `www.foo.com:8090`), and configure the destination server of the script to server B (i.e., `api.bar.com`). 

If our web page want to make a request to server B (say, `GET http://api.bar.com/user/0`), it just make the request to our proxy server (the server A) and port, with exactly the same path (i.e., `GET http://www.foo.com:8090/user/0`). 

**Everything will be the same as if the web page make the request directly to the server B, including the servlet sessions and client cookies.**

### Usage

```bash
node ./src/cors-proxy.js 8090 api.bar.com 80
```

where the `8090` is the listening port of the proxy, and `api.bar.com` is the destination server, and `80` is the destination port. Ever HTTP request to the `8090` port of the proxy host will be redirected to the `api.bar.com:80`.

Currently only the HTTP protocol is supported. The HTTPS protocol may be supported in the future.

