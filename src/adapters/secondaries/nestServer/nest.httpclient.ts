export class NestServerHttpClient {
  private readonly baseUrl: string = 'http://localhost:3000';
  constructor(private readonly authToken: string | null) {}
  async get(route: string): Promise<NestHttpResponse> {
    const response = await fetch(`${this.baseUrl}/${route}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const jsonResponse = await response.json();
    const finalResponse = {...jsonResponse, ...{statusCode: response.status}};

    return finalResponse;
  }
  async post(route: string, body: any): Promise<NestHttpResponse> {
    console.log({body});
    const response = await fetch(`${this.baseUrl}/${route}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    });
    const jsonResponse = await response.json();
    const finalResponse = {...jsonResponse, ...{statusCode: response.status}};
    console.log('post', {route}, {body}, {finalResponse});
    return finalResponse;
  }
  async patch(route: string, body: any): Promise<NestHttpResponse> {
    console.log({body});
    const response = await fetch(`${this.baseUrl}/${route}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    });
    const jsonResponse = await response.json();
    const finalResponse = {...jsonResponse, ...{statusCode: response.status}};
    console.log('patch', {route}, {body}, {finalResponse});
    return finalResponse;
  }

  private getHeaders(): {[key: string]: string} {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (this.authToken) {
      headers = {...headers, ...{Authorization: `Bearer ${this.authToken}`}};
    }

    return headers;
  }
}

export interface NestHttpResponse {
  statusCode: number;
  data?: any;
  message?: string;
}
