/* globals fetch */
require('isomorphic-fetch')

const { parse } = require('url')
const { send } = require('micro')

module.exports = async (req, res) => {
  const { query } = parse(req.url)
  /* set headers Access-Control-Allow-Origin
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  searchItunes(query)
    .then(data => { send(res, 200, data) })
    .catch(error => { send(res, 500, error) })
}

const searchItunes = (query) =>
  fetch(`https://itunes.apple.com/search?${query}`)
    .then(resp => resp.json())
