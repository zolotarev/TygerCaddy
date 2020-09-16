export default (context, inject) => {

  // Before each request is made, update the axios baseUrl with the env variable
  context.app.$axios.interceptors.request.use(function (config) {

    const apiUrl = context.app.$env.BASE_API_URL;

    config.baseURL = apiUrl;

    return config;
  });

}
