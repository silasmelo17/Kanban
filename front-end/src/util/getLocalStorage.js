
export default key => ({
  getString: () => localStorage.getItem(key), 
  getItem: () => JSON.parse( localStorage.getItem(key) ),
  setItem: value =>
    localStorage.setItem( key, JSON.stringify(value) )
})
