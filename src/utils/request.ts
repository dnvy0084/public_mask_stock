export default function request(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.onreadystatechange = (e) => {
            if(req.readyState === 4) {
                resolve(req.response);
            }
        }

        req.onerror = (e) => {
            reject(e);
        }

        req.open('GET', url);
        req.withCredentials = false;
        (req as any).crossorigin = 'anonymous';
        req.send();
    })
}
