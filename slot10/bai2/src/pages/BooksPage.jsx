import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

const books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Lập trình' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas, Andrew Hunt', category: 'Phát triển phần mềm' },
  { id: 3, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen và cộng sự', category: 'Thuật toán' },
]

const BooksPage = () => (
  <Card className="content-card">
    <Card.Body className="p-4">
      <p className="page-eyebrow">Tài nguyên</p>
      <h1 className="h2 mb-4">Danh sách sách</h1>
      <div className="table-responsive">
        <Table striped hover className="align-middle mb-0">
          <thead>
            <tr><th>#</th><th>Tên sách</th><th>Tác giả</th><th>Thể loại</th></tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td className="fw-semibold">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card.Body>
  </Card>
)

export default BooksPage
