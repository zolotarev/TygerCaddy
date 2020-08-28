export default function({ $axios }) {
    if (process.client) {
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      const port = 8080
      const url = `${protocol}//${hostname}:${port}/api`
      $axios.defaults.baseURL = url
    }
}