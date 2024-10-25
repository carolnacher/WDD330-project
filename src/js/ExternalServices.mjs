//This code will make a GET request to the API to obtain the categories. Then
//It will check if the response was successful.
//It will try to parse the response as JSON, if it is correct it will return the JSON with the categories. If not, it will show an error.



export default class ExternalServices {
    
  constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://house-plants2.p.rapidapi.com"; // URL base de la API
  }

  async getCategories() {
      const response = await fetch(`${this.baseUrl}/categories`, {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': this.apiKey,
              'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
          }
      });
      
      
      const text = await response.text(); 
      if (!response.ok) {
          console.error(`Error ${response.status}: ${text}`); 
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      try {
          return JSON.parse(text); 
      } catch (e) {
          console.error("Error parsing JSON:", e);
          console.error("Response body:", text); 
          throw new Error("Response is not valid JSON");
      }
  }
}

  