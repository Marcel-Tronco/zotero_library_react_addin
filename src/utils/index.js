export const cleanISBN = (isbn) => {
  return isbn.replace("-", "")
}

export const getCoverUrl = (isbn, size) => {
  return `https://covers.openlibrary.org/b/isbn/${cleanISBN(isbn)}-${size}.jpg?default=false`
}
